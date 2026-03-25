# MongoDB : requêtes et manipulation de données

## Setup : jeu de données d'exemple

Pour illustrer cette partie, nous travaillons avec une collection `films` :


```javascript
const films = collection("films");
```
```javascript

films.insertMany([
  {
    titre: "Inception",
    annee: 2010,
    realisateur: "Christopher Nolan",
    genres: ["sci-fi", "thriller", "action"],
    note: 8.8,
    duree: 148,
    acteurs: [
      { nom: "Leonardo DiCaprio", role: "Cobb" },
      { nom: "Joseph Gordon-Levitt", role: "Arthur" }
    ]
  },
  {
    titre: "The Dark Knight",
    annee: 2008,
    realisateur: "Christopher Nolan",
    genres: ["action", "crime", "drame"],
    note: 9.0,
    duree: 152,
    acteurs: [
      { nom: "Christian Bale", role: "Batman" },
      { nom: "Heath Ledger", role: "Joker" }
    ]
  },
])
```

## Opérations CRUD

### Insertion

**`insertOne`** — insérer un seul document :

```javascript
films.insertOne({
  titre: "Dune",
  annee: 2021,
  realisateur: "Denis Villeneuve",
  genres: ["sci-fi", "aventure"],
  note: 8.0,
  duree: 155
})
// Retourne : { acknowledged: true, insertedId: ObjectId('...') }
```

**`insertMany`** — insérer plusieurs documents en une seule opération :

```javascript
films.insertMany([
  { titre: "Blade Runner 2049", annee: 2017, realisateur: "Denis Villeneuve", note: 8.0 },
  { titre: "Arrival", annee: 2016, realisateur: "Denis Villeneuve", note: 7.9 }
])
// Retourne : { acknowledged: true, insertedIds: { '0': ObjectId('...'), '1': ObjectId('...') } }
```

> Par défaut, `insertMany` s'arrête au premier document en erreur. Passer `{ ordered: false }` pour continuer malgré les erreurs.

---

### Lecture avec `find`

**`find`** — retourne un curseur sur les documents correspondants :

```javascript
// Tous les documents
films.find()

// Avec un filtre
films.find({ realisateur: "Christopher Nolan" })

// find retourne un curseur ; findOne retourne directement le premier document
films.findOne({ titre: "Inception" })
```

### Le curseur retourné par `find()`

`find()` ne retourne pas directement un tableau de documents : il retourne un **curseur**, c'est-à-dire un pointeur vers le jeu de résultats côté serveur. Les documents ne sont transférés au client qu'au fur et à mesure qu'on les consomme.

```javascript
const curseur = films.find({ note: { $gte: 8.5 } })

// Itérer manuellement
while (curseur.hasNext()) {
  console.log(await curseur.next())
}

// Ou consommer tous les résultats d'un coup en tableau
cosnt all = await curseur.toArray()
```

Les méthodes chaînables comme `.sort()`, `.skip()` et `.limit()` configurent le curseur **avant** l'exécution de la requête — elles ne déclenchent pas de communication avec le serveur :

```javascript
films.find().sort({ note: -1 }).skip(0).limit(10)
// La requête n'est exécutée que lorsque les résultats sont consommés
```

Un curseur se ferme automatiquement après 10 minutes d'inactivité côté serveur (timeout par défaut). Pour les traitements longs, utiliser `cursor.noCursorTimeout()` avec précaution.

---

### Mise à jour

**`updateOne`** — met à jour le premier document correspondant :

```javascript
films.updateOne(
  { titre: "Inception" },           // filtre
  { $set: { note: 8.9, vu: true } } // modification
)
// Retourne : { matchedCount: 1, modifiedCount: 1 }
```

**`updateMany`** — met à jour tous les documents correspondants :

```javascript
films.updateMany(
  { realisateur: "Christopher Nolan" },
  { $set: { labelQualite: "masterpiece" } }
)
```

---

### Suppression

**`deleteOne`** — supprime le premier document correspondant :

```javascript
films.deleteOne({ titre: "Arrival" })
// Retourne : { deletedCount: 1 }
```

**`deleteMany`** — supprime tous les documents correspondants :

```javascript
// Supprimer tous les films avant 2010
films.deleteMany({ annee: { $lt: 2010 } })
```

> **Attention** : `films.deleteMany({})` supprime **tous** les documents de la collection.

## Opérateurs de requête

### Opérateurs de comparaison

```javascript
// $eq : égal (équivalent à { note: 8.8 })
films.find({ note: { $eq: 8.8 } })

// $ne : différent
films.find({ realisateur: { $ne: "Christopher Nolan" } })

// $gt / $gte : supérieur / supérieur ou égal
films.find({ note: { $gt: 8.5 } })
films.find({ annee: { $gte: 2010 } })

// $lt / $lte : inférieur / inférieur ou égal
films.find({ duree: { $lt: 150 } })

// $in : dans une liste de valeurs
films.find({ annee: { $in: [2010, 2014, 2019] } })

// $nin : pas dans la liste
films.find({ realisateur: { $nin: ["Christopher Nolan"] } })
```

---

### Opérateurs logiques

```javascript
// $and : toutes les conditions (implicite avec plusieurs champs)
films.find({ $and: [{ note: { $gte: 8.5 } }, { annee: { $gt: 2010 } }] })
// Équivalent simplifié :
films.find({ note: { $gte: 8.5 }, annee: { $gt: 2010 } })

// $or : au moins une condition
films.find({ $or: [{ note: { $gte: 9.0 } }, { realisateur: "Bong Joon-ho" }] })

// $not : inverse une condition
films.find({ note: { $not: { $lt: 8.5 } } })

// $nor : aucune des conditions
films.find({ $nor: [{ genres: "action" }, { annee: { $lt: 2015 } }] })
```

---

### Opérateurs sur les tableaux

```javascript
// Chercher un tableau contenant une valeur
films.find({ genres: "sci-fi" })
// MongoDB cherche si "sci-fi" est présent dans le tableau genres

// $all : le tableau doit contenir toutes les valeurs
films.find({ genres: { $all: ["sci-fi", "thriller"] } })

// $size : le tableau a exactement N éléments
films.find({ genres: { $size: 3 } })

// $elemMatch : au moins un élément du tableau satisfait TOUTES les conditions
films.find({
  acteurs: { $elemMatch: { nom: "Leonardo DiCaprio", role: "Cobb" } }
})
```

> **Distinction importante** : `{ acteurs: { nom: "A", role: "B" } }` cherche un document où `acteurs.nom == "A"` ET `acteurs.role == "B"`, mais pas nécessairement sur le même élément du tableau. `$elemMatch` garantit que c'est le même élément.

## Requêtes sur documents imbriqués et notation pointée

Pour interroger des champs dans des sous-documents ou des tableaux, MongoDB utilise la **notation pointée** (dot notation).

```javascript
// Accès à un champ d'un sous-document
films.find({ "acteurs.nom": "Leonardo DiCaprio" })

// Plusieurs niveaux d'imbrication
// Si le document avait : { meta: { pays: { code: "FR" } } }
films.find({ "meta.pays.code": "FR" })

// Accès à un index précis dans un tableau (0-indexé)
films.find({ "acteurs.0.nom": "Christian Bale" })
// Trouve les films dont le PREMIER acteur est Christian Bale
```

## Projections, tri et pagination

### Projections

Une **projection** spécifie les champs à inclure ou exclure dans les résultats :

```javascript
// Inclure uniquement certains champs (1 = inclure)
films.find({}).project({ titre: 1, note: 1, _id: 0 })
// Retourne : { titre: "Inception", note: 8.8 }

// Exclure certains champs (0 = exclure)
films.find({}).project({ acteurs: 0, _id: 0 })
// Retourne tout sauf acteurs et _id

// Projection sur un tableau : $slice
films.find({}).project({ acteurs: { $slice: 1 } })
// Retourne uniquement le premier acteur du tableau
```

> On ne peut pas mélanger inclusions et exclusions dans la même projection (sauf pour `_id`).

---

### Tri avec `.sort()`

```javascript
// Tri croissant (1) par note
films.find().sort({ note: 1 })

// Tri décroissant (-1) par note
films.find().sort({ note: -1 })

// Tri multicritère : par realisateur puis par note décroissante
films.find().sort({ realisateur: 1, note: -1 })
```

---

### Pagination avec `.skip()` et `.limit()`

```javascript
// Limiter à 2 résultats
films.find().limit(2)

// Sauter les 2 premiers résultats (page 2 avec 2 éléments par page)
films.find().sort({ note: -1 }).skip(2).limit(2)
```

**Attention** : `.skip()` est performant seulement sur de petits volumes. Pour de grandes collections, il vaut mieux utiliser une pagination basée sur un champ indexé (cursor-based pagination) :

```javascript
// Page suivante basée sur la note du dernier document vu
films.find({ note: { $lt: 8.8 } }).sort({ note: -1 }).limit(2)
```

## Mises à jour partielles

MongoDB offre de nombreux opérateurs pour modifier des documents sans les réécrire entièrement.

### Remplacement vs mise à jour partielle

**Sans opérateur**, `updateOne` et `updateMany` **remplacent entièrement** le document (seul `_id` est conservé) :

```javascript
// DANGER : remplace le document, tous les autres champs sont perdus !
films.updateOne(
  { titre: "Inception" },
  { note: 9.0 }  // pas d'opérateur comme $set
)
// Le document devient : { _id: ObjectId('...'), note: 9.0 }
// Le titre, l'année, les acteurs... tout a disparu.
```

Pour modifier uniquement certains champs, il faut utiliser des **opérateurs de mise à jour** (`$set`, `$inc`, etc.) :

```javascript
// CORRECT : seul le champ "note" est modifié
films.updateOne(
  { titre: "Inception" },
  { $set: { note: 9.0 } }
)
```

> Pour remplacer volontairement un document entier, préférer `replaceOne()` qui rend l'intention explicite.

---

### Opérateurs de base

```javascript
// $set : définir ou modifier un champ
films.updateOne({ titre: "Inception" }, { $set: { note: 9.0, vu: true } })

// $unset : supprimer un champ
films.updateOne({ titre: "Inception" }, { $unset: { vu: "" } })

// $inc : incrémenter (ou décrémenter avec une valeur négative)
films.updateOne({ titre: "Inception" }, { $inc: { vues: 1 } })
// Si "vues" n'existe pas, il est créé avec la valeur 1

// $rename : renommer un champ
films.updateMany({}, { $rename: { "note": "rating" } })
```

---

### Opérateurs sur les tableaux

```javascript
// $push : ajouter un élément à un tableau
films.updateOne(
  { titre: "Inception" },
  { $push: { genres: "science-fiction" } }
)

// $push avec $each : ajouter plusieurs éléments
films.updateOne(
  { titre: "Inception" },
  { $push: { tags: { $each: ["top250", "culte"] } } }
)

// $pull : retirer un élément correspondant à une condition
films.updateOne(
  { titre: "Inception" },
  { $pull: { genres: "science-fiction" } }
)

// $addToSet : ajouter un élément seulement s'il n'existe pas déjà
films.updateOne(
  { titre: "Inception" },
  { $addToSet: { genres: "sci-fi" } }
)
// Si "sci-fi" est déjà dans genres, rien ne se passe
```

---

### L'option `upsert`

`upsert: true` crée le document s'il n'existe pas, ou le met à jour s'il existe :

```javascript
films.updateOne(
  { titre: "Oppenheimer" },             // filtre
  { $set: { realisateur: "Nolan", annee: 2023 } }, // modification
  { upsert: true }                      // crée si absent
)
// Si "Oppenheimer" n'existe pas → insertion
// Si "Oppenheimer" existe → mise à jour
```

---

### Tableau récapitulatif des opérateurs

| Opérateur | Effet |
|-----------|-------|
| `$set` | Définir/modifier un champ |
| `$unset` | Supprimer un champ |
| `$inc` | Incrémenter un nombre |
| `$rename` | Renommer un champ |
| `$push` | Ajouter au tableau |
| `$pull` | Retirer du tableau (par valeur/condition) |
| `$pop` | Retirer le premier ou dernier élément |
| `$addToSet` | Ajouter au tableau (sans doublon) |
| `$mul` | Multiplier un nombre |
| `$min` / `$max` | Mettre à jour si plus petit/grand |
