# MongoDB : agrégation

## Pipeline d'agrégation

### Principe

Le **pipeline d'agrégation** est le mécanisme de MongoDB pour transformer et analyser des données. Contrairement à `find()` qui filtre et retourne des documents, l'agrégation permet de :

- Regrouper des documents
- Calculer des statistiques
- Transformer la structure des données
- Joindre plusieurs collections

Un pipeline est une **séquence d'étapes** (stages) : chaque étape reçoit les documents de l'étape précédente, les transforme, et les transmet à l'étape suivante.

```javascript
db.collection.aggregate([
  { $stage1: { ... } },
  { $stage2: { ... } },
  { $stage3: { ... } }
])
```

---

### Les étapes principales

#### `$match` — filtrer les documents

Équivalent d'un `WHERE` en SQL. **Placer `$match` le plus tôt possible** dans le pipeline pour réduire le nombre de documents à traiter.

```javascript
db.films.aggregate([
  { $match: { realisateur: "Christopher Nolan", note: { $gte: 8.5 } } }
])
```

---

#### `$group` — regrouper et calculer

Équivalent d'un `GROUP BY` en SQL. Le champ `_id` définit la clé de regroupement.

```javascript
// Nombre de films par réalisateur
db.films.aggregate([
  {
    $group: {
      _id: "$realisateur",         // clé de regroupement
      nbFilms: { $sum: 1 },        // compter les documents
      noteMoyenne: { $avg: "$note" },
      noteMax: { $max: "$note" },
      noteMin: { $min: "$note" }
    }
  }
])
// Résultat :
// { _id: "Christopher Nolan", nbFilms: 3, noteMoyenne: 8.83, ... }
// { _id: "Bong Joon-ho", nbFilms: 1, noteMoyenne: 8.6, ... }
```

Opérateurs d'accumulation disponibles dans `$group` :

| Opérateur | Description |
|-----------|-------------|
| `$sum` | Somme (ou compte avec `$sum: 1`) |
| `$avg` | Moyenne |
| `$min` / `$max` | Minimum / Maximum |
| `$first` / `$last` | Premier / dernier document |
| `$push` | Construire un tableau avec les valeurs |
| `$addToSet` | Tableau sans doublons |

---

#### `$sort` — trier les résultats

```javascript
db.films.aggregate([
  { $group: { _id: "$realisateur", noteMoyenne: { $avg: "$note" } } },
  { $sort: { noteMoyenne: -1 } }  // tri décroissant
])
```

---

#### `$project` — transformer la structure des documents

Équivalent d'un `SELECT` en SQL. Permet d'inclure, exclure, renommer ou calculer des champs.

```javascript
db.films.aggregate([
  {
    $project: {
      _id: 0,
      titre: 1,
      annee: 1,
      // Ajouter un champ calculé
      dureeEnHeures: { $divide: ["$duree", 60] },
      // Renommer un champ
      notationImdb: "$note"
    }
  }
])
```

---

#### `$unwind` — décomposer un tableau

`$unwind` transforme chaque élément d'un tableau en un document séparé.

```javascript
// Avant $unwind, un document :
// { titre: "Inception", genres: ["sci-fi", "thriller", "action"] }

db.films.aggregate([
  { $unwind: "$genres" }
])

// Après $unwind, trois documents :
// { titre: "Inception", genres: "sci-fi" }
// { titre: "Inception", genres: "thriller" }
// { titre: "Inception", genres: "action" }
```

Utilisation typique : compter le nombre de films par genre.

```javascript
db.films.aggregate([
  { $unwind: "$genres" },
  { $group: { _id: "$genres", count: { $sum: 1 } } },
  { $sort: { count: -1 } }
])
// { _id: "sci-fi", count: 2 }
// { _id: "thriller", count: 2 }
// { _id: "drame", count: 2 }
// ...
```

---

#### `$lookup` — jointure entre collections

`$lookup` permet de faire une jointure gauche (LEFT JOIN) avec une autre collection.

```javascript
// Collection "commandes" : { clientId: ObjectId('c1'), total: 150 }
// Collection "clients"   : { _id: ObjectId('c1'), nom: "Alice" }

db.commandes.aggregate([
  {
    $lookup: {
      from: "clients",          // collection cible
      localField: "clientId",   // champ dans la collection source
      foreignField: "_id",      // champ dans la collection cible
      as: "clientInfo"          // nom du champ résultat (tableau)
    }
  }
])
// Résultat :
// {
//   total: 150,
//   clientId: ObjectId('c1'),
//   clientInfo: [{ _id: ObjectId('c1'), nom: "Alice" }]
// }
```

> `$lookup` retourne toujours un **tableau**. Utiliser `$unwind` pour obtenir un objet unique si la relation est 1-1.

## Exemples concrets

### Statistiques : top des réalisateurs

```javascript
db.films.aggregate([
  // Filtrer les films bien notés
  { $match: { note: { $gte: 8.0 } } },
  // Regrouper par réalisateur
  {
    $group: {
      _id: "$realisateur",
      nbFilms: { $sum: 1 },
      noteMoyenne: { $avg: "$note" },
      titres: { $push: "$titre" }
    }
  },
  // Garder seulement ceux avec au moins 2 films
  { $match: { nbFilms: { $gte: 2 } } },
  // Trier par note moyenne décroissante
  { $sort: { noteMoyenne: -1 } },
  // Arrondir la note moyenne
  {
    $project: {
      _id: 0,
      realisateur: "$_id",
      nbFilms: 1,
      noteMoyenne: { $round: ["$noteMoyenne", 2] },
      titres: 1
    }
  }
])
```

---

### Jointure entre collections : commandes avec détails clients

```javascript
db.commandes.aggregate([
  { $match: { statut: "livré" } },
  {
    $lookup: {
      from: "clients",
      localField: "clientId",
      foreignField: "_id",
      as: "client"
    }
  },
  { $unwind: "$client" },
  {
    $project: {
      _id: 0,
      "client.nom": 1,
      "client.email": 1,
      total: 1,
      date: 1
    }
  },
  { $sort: { date: -1 } },
  { $limit: 10 }
])
```

---

### Transformation : rapport mensuel des ventes

```javascript
db.commandes.aggregate([
  {
    $group: {
      _id: {
        annee: { $year: "$date" },
        mois: { $month: "$date" }
      },
      totalVentes: { $sum: "$total" },
      nbCommandes: { $sum: 1 },
      panierMoyen: { $avg: "$total" }
    }
  },
  { $sort: { "_id.annee": 1, "_id.mois": 1 } },
  {
    $project: {
      _id: 0,
      periode: {
        $concat: [
          { $toString: "$_id.annee" }, "-",
          { $toString: "$_id.mois" }
        ]
      },
      totalVentes: { $round: ["$totalVentes", 2] },
      nbCommandes: 1,
      panierMoyen: { $round: ["$panierMoyen", 2] }
    }
  }
])
```
