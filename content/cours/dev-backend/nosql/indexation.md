# MongoDB : indexation

## Indexation

### Pourquoi indexer ?

Sans index, MongoDB effectue un **collection scan** : il parcourt chaque document pour trouver les correspondances. Sur une collection de millions de documents, c'est prohibitif.

Un **index** est une structure de données (B-tree) qui permet de trouver rapidement les documents correspondant à un critère, sans parcourir toute la collection.

Analogie : l'index d'un livre permet de trouver la page d'un sujet sans lire le livre entier.

**Compromis** : les index accélèrent les lectures mais ralentissent les écritures (chaque insertion/mise à jour doit maintenir les index). Il ne faut pas indexer tous les champs.

---

### Index simples

```javascript
// Créer un index croissant sur le champ "note"
db.films.createIndex({ note: 1 })

// Index décroissant (utile pour les tris fréquents)
db.films.createIndex({ annee: -1 })

// Lister les index d'une collection
db.films.getIndexes()

// Supprimer un index
db.films.dropIndex({ note: 1 })
```

> L'index `_id` est créé automatiquement et ne peut pas être supprimé.

---

### Index composés

Un index sur plusieurs champs, utile pour les requêtes multi-critères et les tris.

```javascript
// Index sur realisateur + note
db.films.createIndex({ realisateur: 1, note: -1 })

// Cet index optimise :
db.films.find({ realisateur: "Christopher Nolan" }).sort({ note: -1 })
// Et aussi :
db.films.find({ realisateur: "Christopher Nolan", note: { $gte: 8.5 } })
// Mais PAS :
db.films.find({ note: { $gte: 8.5 } })
// (la règle du préfixe : l'index commence par "realisateur")
```

**Règle du préfixe** : un index composé `{ a: 1, b: 1, c: 1 }` sert pour les requêtes sur `a`, `a+b` ou `a+b+c`, mais pas sur `b` ou `c` seuls.

---

### Index textuels

Pour les recherches en texte libre sur des champs de type chaîne :

```javascript
// Créer un index textuel sur titre et synopsis
db.films.createIndex({ titre: "text", synopsis: "text" })

// Recherche plein texte
db.films.find({ $text: { $search: "batman gotham nuit" } })

// Avec un score de pertinence
db.films.find(
  { $text: { $search: "batman" } },
  { score: { $meta: "textScore" } }
).sort({ score: { $meta: "textScore" } })
```

---

### Index multiclés

MongoDB indexe automatiquement les tableaux. Si le champ indexé est un tableau, un index **multiclé** est créé pour chaque valeur du tableau.

```javascript
// Index sur le tableau "genres"
db.films.createIndex({ genres: 1 })

// Cet index optimise :
db.films.find({ genres: "sci-fi" })
db.films.find({ genres: { $in: ["sci-fi", "thriller"] } })
```

---

### Index avec options

```javascript
// Index unique : interdit les doublons
db.utilisateurs.createIndex({ email: 1 }, { unique: true })

// Index partiel : n'indexe que les documents correspondant au filtre
db.films.createIndex(
  { note: -1 },
  { partialFilterExpression: { note: { $gte: 8.0 } } }
)
// Plus léger : seuls les films bien notés sont indexés

// Index TTL : suppression automatique du document après expiration
db.sessions.createIndex(
  { createdAt: 1 },
  { expireAfterSeconds: 3600 }  // supprime les sessions après 1 heure
)
```

## Analyser les performances avec `explain()`

### Utilisation

`explain()` permet de comprendre comment MongoDB exécute une requête : quel index est utilisé, combien de documents sont examinés, etc.

```javascript
db.films.find({ note: { $gte: 8.5 } }).explain("executionStats")
```

### Interpréter le résultat

Les champs clés à examiner :

```javascript
{
  "executionStats": {
    "nReturned": 3,           // documents retournés
    "totalDocsExamined": 4,   // documents examinés
    "totalKeysExamined": 3,   // entrées d'index parcourues
    "executionTimeMillis": 0  // temps d'exécution
  },
  "winningPlan": {
    "stage": "FETCH",         // ou "COLLSCAN" si pas d'index
    "inputStage": {
      "stage": "IXSCAN",      // Index Scan = index utilisé ✅
      "indexName": "note_-1"
    }
  }
}
```

### Signaux d'alarme

| Indicateur | Signification | Action |
|------------|---------------|--------|
| `"stage": "COLLSCAN"` | Parcours complet de la collection | Créer un index |
| `totalDocsExamined >> nReturned` | L'index est peu sélectif | Revoir l'index |
| `executionTimeMillis` élevé | Requête lente | Profiler et optimiser |

### Le profiler de MongoDB

Pour identifier automatiquement les requêtes lentes :

```javascript
// Activer le profiler pour les requêtes > 100ms
db.setProfilingLevel(1, { slowms: 100 })

// Consulter les requêtes lentes enregistrées
db.system.profile.find().sort({ ts: -1 }).limit(5)
```