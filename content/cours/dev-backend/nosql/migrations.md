# Migrations de schéma avec MongoDB

Dans une base relationnelle, toute modification de structure (ajouter une colonne, renommer un champ) nécessite une migration SQL exécutée sur la base. MongoDB, avec son schéma flexible, fonctionne différemment — mais les migrations restent nécessaires. Une modification de schema incoherente avec les données existante ne pourra pas être effectuée, ce qui garantiera la coherence en toute situation. 

## Le problème des migrations en NoSQL

Puisque MongoDB n'impose pas de schéma, rien n'empêche d'insérer un document `{ nom: "Alice" }` et un autre `{ name: "Bob" }` dans la même collection. Cette flexibilité est un avantage au démarrage, mais devient un problème à mesure que l'application évolue.

### Ce qui se passe sans migration

Imaginons qu'on renomme le champ `note` en `rating` dans le code :

```javascript
// Anciens documents en base :
{ titre: "Inception", note: 8.8 }

// Nouveaux documents insérés après le changement :
{ titre: "Parasite", rating: 8.6 }
```

La collection contient désormais deux formats. Les requêtes sur `rating` ne retournent pas les anciens documents, et inversement.

## Stratégies de migration

### 1. Migration eager (immédiate)

On met à jour **tous les documents existants** en une seule opération, avant ou après le déploiement du nouveau code.

```javascript
// Renommer le champ "note" en "rating" sur tous les documents
db.films.updateMany(
  { note: { $exists: true } },
  { $rename: { "note": "rating" } }
)
```

```javascript
// Ajouter un champ avec une valeur par défaut
db.films.updateMany(
  { disponible: { $exists: false } },
  { $set: { disponible: true } }
)
```

```javascript
// Supprimer un champ devenu obsolète
db.films.updateMany(
  {},
  { $unset: { ancienChamp: "" } }
)
```

**Avantage** : la base est cohérente immédiatement.
**Inconvénient** : peut être lent sur de grandes collections, et bloque potentiellement les opérations pendant la migration.

---

### 2. Migration lazy (progressive)

On ne modifie pas les documents existants. Le code gère les deux formats et migre chaque document **au moment où il est lu ou écrit**.

```javascript
// Dans le code applicatif
function normaliserFilm(doc) {
  // Compatibilité ascendante : accepter les deux noms de champ
  if (doc.note !== undefined && doc.rating === undefined) {
    doc.rating = doc.note
    delete doc.note
    // Persister la migration
    db.films.updateOne({ _id: doc._id }, {
      $set: { rating: doc.rating },
      $unset: { note: "" }
    })
  }
  return doc
}
```

**Avantage** : zéro downtime, migration transparente.
**Inconvénient** : le code doit gérer plusieurs versions du schéma pendant la période de transition.

---

### 3. Versionnement des documents

On ajoute un champ `schemaVersion` à chaque document pour savoir quel format il suit.

```javascript
// Document v1
{ _id: ..., schemaVersion: 1, note: 8.8, titre: "Inception" }

// Document v2 (après migration)
{ _id: ..., schemaVersion: 2, rating: 8.8, titre: "Inception" }
```

```javascript
function lireFilm(doc) {
  switch (doc.schemaVersion) {
    case 1:
      return migrerV1versV2(doc)
    case 2:
    default:
      return doc
  }
}
```

## Downtime

Toute migration de donnée implique un problème majeur: le programme déployé en production ne peut être que sur une version: l'ancienne et la nouvelle, donc le programme ne peut supporter que l'ancien ou le nouveau format de données.

Si une modification du schema doit entrainer une modification des donnéees, il y aura alors forcement une periode de temps (plus ou moins longue selon le volume des données) où les données seront incohérentes.
Entre le moment où le script de migration est démarré et où il est fini, les serveurs de production doivent être arrétés, ce qui crée une periode de downtime.

Pour éviter cette periode de downtime, on peut utiliser les techniques de mapping vues précédemment, ce qui exige de maintenir plus de code entre les versions.

## Migrations avec Prisma

Prisma adopte une approche différente : il génère et gère des **fichiers de migration** versionés, comme en SQL.

### Flux de travail

```
1. Modifier le schéma dans prisma/schema.prisma
2. Générer la migration
3. Appliquer la migration
```

### Exemple : renommer un champ

#### Avant

```prisma
model Film {
  id   String @id @default(auto()) @map("_id") @db.ObjectId
  note Float?
}
```

#### Après modification du schéma

```prisma
model Film {
  id     String @id @default(auto()) @map("_id") @db.ObjectId
  rating Float?
}
```

#### Générer et appliquer

```bash
npx prisma migrate dev --name rename_note_to_rating
```

Prisma génère un fichier de migration dans `prisma/migrations/` et met à jour le client TypeScript.

> **Limite importante** : avec MongoDB, Prisma ne génère **pas** de migration de données automatique. Il met à jour le schéma de validation et régénère le client, mais les documents existants en base ne sont pas modifiés. Il faut compléter avec un script de migration de données.

### Migration de données complémentaire

```typescript
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Script à exécuter une seule fois après la migration de schéma
const films = await prisma.$runCommandRaw({
  update: "Film",
  updates: [{
    q: { note: { $exists: true } },
    u: { $rename: { note: "rating" } },
    multi: true
  }]
})
```

## Bonnes pratiques

**Toujours écrire le rollback** (`down`) pour pouvoir revenir en arrière en cas de problème.

**Tester sur une copie des données** de production avant d'appliquer en production.

**Ne jamais modifier une migration déjà appliquée** — créer une nouvelle migration à la place.

**Découpler déploiement et migration** : pour les grandes collections, appliquer la migration avant le déploiement du nouveau code (ou après), jamais simultanément.

**Préférer les migrations additives** quand c'est possible : ajouter un nouveau champ plutôt que renommer l'ancien, supprimer l'ancien champ dans une migration ultérieure une fois que tout le code utilise le nouveau.

```
Étape 1 : ajouter "rating", conserver "note"     → déployer
Étape 2 : migrer les données note → rating        → déployer
Étape 3 : supprimer "note"                        → déployer
```

Cette approche en trois temps évite tout downtime et permet un rollback facile à chaque étape.
