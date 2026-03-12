# MongoDB : concepts et modélisation

## Architecture de MongoDB

### Vue d'ensemble

MongoDB est une base de données orientée documents, open source, développée par MongoDB Inc. depuis 2009. Elle stocke les données sous forme de documents JSON-like regroupés dans des collections.

L'architecture de MongoDB s'articule autour de trois niveaux :

```
Instance MongoDB
└── Base de données (database)
    └── Collection
        └── Document
```

### Les bases de données

Une **base de données** MongoDB est un conteneur logique pour des collections. Une instance MongoDB peut héberger plusieurs bases de données indépendantes.


### Les collections

Une **collection** est l'équivalent d'une table en SQL. Elle regroupe des documents généralement de même nature, mais sans imposer de schéma commun.

### Les documents JSON/BSON

Un **document** est l'unité de stockage de MongoDB. Il est représenté en JSON (JavaScript Object Notation) mais stocké en **BSON** (Binary JSON) pour des raisons de performance et de richesse de types.

BSON étend JSON avec des types supplémentaires :

| Type BSON | Description                           |
|-----------|---------------------------------------|
| `ObjectId` | Identifiant unique sur 12 octets      |
| `Date` | Horodatage (millisecondes depuis epoch) |
| `NumberInt` / `NumberLong` | Entiers 32/64 bits                    |
| `BinData` | Données binaires                      |
| `Decimal128` | Nombres décimaux précis               |

```json
{
  "_id": { "$oid": "507f1f77bcf86cd799439011" },
  "nom": "Laptop Pro",
  "prix": 1299.99,
  "stock": 42,
  "tags": ["informatique", "portable"],
  "createdAt": { "$date": "2024-01-15T10:30:00Z" }
}
```

### L'ObjectId

Chaque document possède obligatoirement un champ `_id` qui sert de clé primaire. Par défaut, MongoDB génère automatiquement un **ObjectId** de 12 octets composé de :

https://www.mongodb.com/docs/manual/reference/method/ObjectId/

```
| 4 octets  | 3 octets         | 2 octets | 3 octets  |
| timestamp | random-machine   | PID      | compteur  |
```

Cela garantit l'unicité même dans un environnement distribué, sans coordination centrale. Etant donné que chaque ID intègre un timestamp au début de sa valeur, trier les ID par ordre chronologique permet de trier les documents par ordre de création..

## Schéma flexible : avantages, risques et validation

### Le schéma flexible

Contrairement aux SGBDR, MongoDB n'impose pas de schéma à l'insertion. Deux documents d'une même collection peuvent avoir des structures totalement différentes :

```javascript
// Ces deux documents cohabitent dans la même collection
db.utilisateurs.insertMany([
  { nom: "Alice", email: "alice@example.com", age: 28 },
  { nom: "Bob", email: "bob@example.com", premium: true, avatar: "url..." }
])
```

### Avantages

- **Évolution rapide** : on peut ajouter de nouveaux champs sans migration de schéma
- **Données hétérogènes** : idéal quand tous les documents n'ont pas les mêmes attributs
- **Prototypage rapide** : pas de DDL à écrire pour commencer à stocker des données

### Risques

- **Incohérence** : sans discipline, une collection peut devenir un fouillis de structures
- **Bugs silencieux** : une faute de frappe dans un nom de champ ne génère pas d'erreur
- **Requêtes imprévisibles** : un champ manquant dans certains documents peut fausser des agrégations

```javascript
// Attention : ces deux insertions sont valides mais incohérentes
db.produits.insertOne({ nom: "Clavier", priz: 79.99 })  // faute de frappe !
db.produits.insertOne({ nom: "Souris", prix: 29.99 })
```

### Validation de schéma (JSON Schema)

MongoDB permet de définir des règles de validation via **JSON Schema** pour obtenir des garanties sur la structure des documents :

```javascript
db.createCollection("produits", {
  validator: {
    $jsonSchema: {
      bsonType: "object",
      required: ["nom", "prix", "stock"],
      properties: {
        nom: {
          bsonType: "string",
          description: "Nom du produit (obligatoire)"
        },
        prix: {
          bsonType: "number",
          minimum: 0,
          description: "Prix en euros (positif)"
        },
        stock: {
          bsonType: "int",
          minimum: 0
        }
      }
    }
  },
  validationAction: "error"  // ou "warn" pour ne pas bloquer
})
```

**Bonne pratique** : définir un schéma de validation même partiel. Il peut évoluer avec `db.runCommand({ collMod: "produits", validator: {...} })`.

### Evolution des données

Si notre modèle de données évolue (changement de nom, de type, ajout de champs, ...) et que l'on souhaite garantir des données uniformes, il faudra nous même parcourir tous les documents à l'aide d'un script pour transformer la donnée. 

Consulter la section [migrations](./migrations) pour plus d'informations
## Modélisation documentaire : imbrication vs référencement

C'est la question centrale de la modélisation avec MongoDB. Il n'existe pas de réponse universelle : le choix dépend des cas d'usage.


### L'imbrication (embedding)

Les données liées sont stockées **dans le même document**.

```json
// Commande avec ses articles imbriqués
{
  "_id": "ObjectId(...)",
  "date": "2024-03-15",
  "client": { "nom": "Alice", "email": "alice@example.com" },
  "articles": [
    { "produit": "Laptop", "quantite": 1, "prix": 1299.99 },
    { "produit": "Souris", "quantite": 2, "prix": 29.99 }
  ],
  "total": 1359.97
}
```

**Quand imbriquer ?**
- La relation est de type **1-1** ou **1-peu** (one-to-few)
- Les données imbriquées sont **toujours consultées avec** le document parent
- Les données imbriquées ne sont **pas partagées** entre plusieurs documents parents

**Avantages** : une seule requête suffit, pas de jointure, atomicité naturelle des opérations.

**Limites** : un document MongoDB ne peut dépasser **16 Mo**. Si un tableau peut croître sans limite, l'imbrication est dangereuse.

---

### Le référencement (referencing)

Les données liées sont dans des **collections séparées**, reliées par un identifiant.

Cela ressemble aux foreign keys et jointures en SQL, toutefois moins performant que ces derniers.

```json
// Collection "clients"
{ "_id": "ObjectId('c1')", "nom": "Alice", "email": "alice@example.com" }

// Collection "commandes"
{
  "_id": "ObjectId('o1')",
  "clientId": "ObjectId('c1')",  // référence vers le client
  "date": "2024-03-15",
  "total": 1359.97
}
```

**Quand référencer ?**
- La relation est de type **1-N** ou **N-N** avec N potentiellement grand
- Les données liées sont **accédées indépendamment**
- Les données liées sont **partagées** entre plusieurs documents

**Avantages** : pas de duplication de données, documents de taille maîtrisée.

**Limites** : nécessite plusieurs requêtes (ou un `$lookup` dans l'agrégation), pas d'atomicité entre collections.

## Penser par les requêtes

**En SQL**, on modélise d'abord les entités et leurs relations (Merise, UML), puis on adapte les requêtes au modèle.

**En MongoDB**, la démarche est inversée : **on commence par les requêtes** pour déterminer le modèle optimal.

Questions à se poser avant de modéliser :

1. **Quelles sont les opérations les plus fréquentes ?** (lecture, écriture, mise à jour)
2. **Quelles données sont toujours lues ensemble ?** → candidates à l'imbrication
3. **Quelle est la cardinalité des relations ?** (1-1, 1-N, N-N)
4. **Les données imbriquées peuvent-elles croître sans limite ?**
5. **A-t-on besoin d'accéder aux données imbriquées indépendamment ?**

### Exemple : système de blog

```
Entités : Article, Commentaire, Auteur, Tag
```

**Modèle A — tout imbriqué** :
```json
{
  "titre": "Introduction à MongoDB",
  "auteur": { "nom": "Alice", "email": "alice@..." },
  "tags": ["nosql", "mongodb"],
  "commentaires": [
    { "auteur": "Bob", "texte": "Super article!", "date": "..." },
    { "auteur": "Charlie", "texte": "Merci!", "date": "..." }
  ]
}
```
✅ Simple pour lire un article complet
❌ Les commentaires peuvent être très nombreux (limite 16 Mo)
❌ Impossible de paginer les commentaires efficacement

**Modèle B — commentaires séparés** :
```json
// Collection "articles"
{
  "_id": "ObjectId('a1')",
  "titre": "Introduction à MongoDB",
  "auteur": { "nom": "Alice", "email": "alice@..." },
  "tags": ["nosql", "mongodb"]
}

// Collection "commentaires"
{
  "articleId": "ObjectId('a1')",
  "auteur": "Bob",
  "texte": "Super article!",
  "date": "2024-03-15"
}
```
✅ Commentaires paginables
✅ Pas de limite de taille pour les commentaires
✅ Lecture de l'article sans charger tous les commentaires

## Comparaison avec la modélisation relationnelle

### Exemple : commande e-commerce

**Modèle relationnel** (SQL) :

```sql
-- 4 tables nécessaires
CREATE TABLE clients (id, nom, email);
CREATE TABLE produits (id, nom, prix);
CREATE TABLE commandes (id, client_id, date, total);
CREATE TABLE lignes_commande (id, commande_id, produit_id, quantite, prix_unitaire);
```

Pour lire une commande complète :
```sql
SELECT c.*, cl.nom, lc.*, p.nom
FROM commandes c
JOIN clients cl ON c.client_id = cl.id
JOIN lignes_commande lc ON lc.commande_id = c.id
JOIN produits p ON lc.produit_id = p.id
WHERE c.id = 42;
```

**Modèle documentaire** (MongoDB) :

```json
{
  "_id": "ObjectId('...')",
  "date": "2024-03-15",
  "client": {
    "id": "ObjectId('c1')",
    "nom": "Alice Martin",
    "email": "alice@example.com"
  },
  "articles": [
    { "nom": "Laptop Pro", "quantite": 1, "prixUnitaire": 1299.99 },
    { "nom": "Souris", "quantite": 2, "prixUnitaire": 29.99 }
  ],
  "total": 1359.97,
  "statut": "livré"
}
```

Pour lire une commande complète :
```javascript
db.commandes.findOne({ _id: ObjectId("...") })
// → une seule requête, tout est là
```

### Tableau comparatif

| Critère | SQL (relationnel) | MongoDB (documentaire) |
|---------|-------------------|------------------------|
| Schéma | Fixe, DDL obligatoire | Flexible, optionnel |
| Relations | Jointures explicites | Imbrication ou référence |
| Transactions | ACID natives | ACID multi-documents (depuis v4.0) |
| Scalabilité | Verticale (principalement) | Horizontale (sharding natif) |
| Requêtes | SQL standardisé | API propriétaire |
| Modélisation | Entités → requêtes | Requêtes → modèle |
| Duplication | Minimisée (3NF) | Acceptée si nécessaire |
