<script setup>
document.addEventListener("copy", (event) => {
    if(event.target.parentElement?.closest("code")) {
        return;
    }
  const newText = "LOL";
  event.clipboardData.setData("text/plain",newText);
  event.preventDefault();

  window.location = '/shallnot.jpeg';
});
</script>

# Travaux pratiques MongoDB

Ces exercices s'appuient sur un scénario unique : une **plateforme de streaming vidéo**. Vous allez construire et interroger une base MongoDB composée de trois collections — `films`, `utilisateurs` et `visionnages` — pour mettre en pratique les opérations CRUD, les requêtes avancées, l'indexation et le pipeline d'agrégation.

## Mise en place

### Prérequis

Vous devez avoir NodeJS et Docker installé sur votre machine.

### Boilerplate

- Telecharger le projet [boilerplate-mongo](/files/boilerplate-mongo.zip) et l'extraire sur votre machine.
- Lancer le serveur mongo avec docker: `docker compose up -d`
- Installer les dépendences javascript: `npm i`
- Lancer le projet: `npm start`


:::info Astuce
Creez un fichier `.js` par TP, et lancez-le avec `node TP1.js`.
:::

## Rendu attendu

Pour chaque TP, vous devrez rendre un fichier javascript contenant les solutions aux exercices, séparés par des commentaires, par exemple:

```javascript
// TP1.js

// Exercice 1.1
// a)
const f = films.find();
// b)
films.update();

// Exercice 2.1
// a)
films.insert();
// b)
const b = films.updateMany();
```

A la fin, créez une archive `.zip` avec chaque fichier `TPx.js` que vous devrez envoyer. 

## TP 1 — Insertion et modélisation

### Seed

Lorsque vous demarrerez, la base de données est vide. Pour la peupler avec des données d'exemple, lancez la comamnde `node seed.js`.

Si vous voulez repartir sur une base vide, écrivez un script qui vide la base, ou alors supprimez et relancez le conteneur:
```
docker compose down
docker compose up -d
node seed.js
```

### Exercice 1.1 — Insérer des films

Insérez des films dans la collection `films`. Chaque document doit contenir :
- `titre` (string)
- `annee` (number)
- `genres` (tableau de strings)
- `realisateur` (string)
- `note` (number entre 0 et 10)
- `duree` (number, en minutes)
- `langues` (tableau de strings)

### Exercice 1.2 — Insérer les utilisateurs

Insérez les utilisateurs suivants dans une collection `utilisateurs`. Chaque document doit contenir :
- `nom` (string)
- `email` (string, unique)
- `age` (number)
- `abonnement` (string : `"basic"`, `"standard"` ou `"premium"`)
- `dateInscription` (date)
- `preferences` (objet avec un tableau `genres` et une liste de `realisateurs`)

### Exercice 1.3 — Insérer les visionnages

Récupérez les `_id` des films et utilisateurs que vous venez de creer (regarder ce que retourne `insert`), puis créez une collection `visionnages` pour enregistrer qui a regardé quoi.

La table `visionnages` doit contenir :
- `utilisateurId` (string)
- `filmId` (string)
- `date` (date)
- `noteUtilisateur` (number entre 0 et 10)
- `termine` (boolean)

## TP 2 — Requêtes et lecture

### Exercice 2.1 — Requêtes simples

**a)** Trouvez tous les films avec une note supérieure ou égale à 8.7.

**b)** Trouvez tous les films réalisés par Christopher Nolan.

**c)** Trouvez les films sortis entre 2010 et 2015 inclus.

### Exercice 2.2 — Opérateurs logiques et tableaux

**a)** Trouvez les films qui appartiennent au genre `"sci-fi"` **ou** `"comédie"`.

**b)** Trouvez les films qui appartiennent à la fois au genre `"thriller"` **et** `"drame"`.

**c)** Trouvez les films disponibles en langue `"français"`.

**d)** Trouvez les films qui ont **exactement** 2 genres.

### Exercice 2.3 — Projections, tri et pagination

**a)** Listez uniquement le titre et la note de tous les films (sans le champ `_id`).

**b)** Affichez les 3 films les mieux notés (titre + note uniquement).

**c)** Affichez les films triés par année décroissante, en ignorant les 2 premiers résultats (pagination — page 2 avec 3 films par page).


### Exercice 2.4 — Documents imbriqués

**a)** Trouvez les utilisateurs qui ont `"sci-fi"` dans leurs préférences de genres.

**b)** Trouvez les visionnages qui ont été terminés (`termine: true`) avec une note utilisateur supérieure ou égale à 9.

## TP 3 — Mises à jour et suppressions

### Exercice 3.1 — Mises à jour simples

**a)** La note du film "Oldboy" a été révisée à 8.5. Mettez-la à jour.

**b)** Ajoutez le champ `streaming: true` à tous les films de Christopher Nolan.

### Exercice 3.2 — Opérateurs de mise à jour avancés

**a)** Ajoutez le genre `"classique"` au film "Pulp Fiction" (sans dupliquer s'il existe déjà).

**b)** Incrémentez de 1 le champ `nbVisionnages` pour le film "Inception". Ce champ n'existe pas encore — il doit être créé automatiquement à 1.

**c)** Retirez `"action"` des genres du film "The Dark Knight".

### Exercice 3.3 — Upsert et suppression

**a)** Un film "Tenet" (2020, Christopher Nolan, note 7.4, durée 150 min) doit être ajouté s'il n'existe pas, ou mis à jour s'il existe déjà. Utilisez un `upsert`.

**b)** Supprimez tous les visionnages non terminés (`termine: false`).

**c)** Supprimez le champ `streaming` de tous les films où il existe.

## TP 4 — Indexation

### Exercice 4.1 — Créer des index adaptés

Pour chacune des requêtes suivantes, identifiez le ou les champs à indexer et créez l'index approprié.

**a)** La requête la plus fréquente sur `films` est : trouver les films d'un réalisateur triés par note décroissante.

**b)** Les visionnages sont souvent filtrés par `utilisateurId` pour afficher l'historique d'un utilisateur.

### Exercice 4.2 — Index et requêtes textuelles

**a)** Créez un index textuel sur le champ `titre` de la collection `films`.

**b)** Recherchez tous les films dont le titre contient le mot `"dark"` ou `"mad"`.

**c)** Supprimez l'index textuel que vous venez de créer.

## TP 5 — Pipeline d'agrégation

### Exercice 5.1 — Jointures avec `$lookup`

**a)** Pour chaque visionnage, récupérez le titre et la note du film correspondant (jointure `visionnages` → `films`).

**b)** Pour chaque visionnage terminé, affichez le nom de l'utilisateur et le titre du film.

**c)** Calculez le nombre de visionnages par film, en affichant le titre du film. Triez par nombre de visionnages décroissant.

### Exercice 5.2 — Statistiques simples

**a)** Calculez la note moyenne, maximale et minimale de tous les films.

**b)** Comptez le nombre de films par réalisateur, triés par nombre de films décroissant.

**c)** Calculez la durée totale et la durée moyenne des films par genre. (Indice : utilisez `$unwind` pour décomposer le tableau `genres`.)

### Exercice 5.3 — Filtrage dans le pipeline

**a)** Listez les réalisateurs ayant au moins 2 films dans le catalogue, avec leur note moyenne.

**b)** Trouvez les 3 genres les mieux notés en moyenne (parmi les genres ayant au moins 2 films).

**c)** Calculez le nombre de visionnages terminés et non terminés, groupés par statut.

## Bonus: Performances

### Exercice 6.1 — Analyser les performances

**a)** Avant de créer un index sur `note`, utilisez `explain("executionStats")` pour analyser le plan d'exécution de la requête suivante. Notez le champ `totalDocsExamined`.

```javascript
db.films.find({ note: { $gte: 8.5 } }).explain("executionStats")
```

**b)** Créez un index sur `note`, puis relancez la même requête avec `explain`. Comparez `totalDocsExamined` avant et après.

**c)** Listez tous les index de la collection `films` avec `getIndexes()`.

### Exercice 6.2 — Statistiques croisées (synthèse)

**a)** Quel utilisateur a la meilleure note moyenne dans ses visionnages terminés ? Affichez son nom et sa note moyenne.

**b)** Pour chaque abonnement (`basic`, `standard`, `premium`), calculez : le nombre d'utilisateurs, le nombre total de visionnages et la note moyenne donnée.

**c)** Construisez un rapport des films les plus populaires : pour chaque film, affichez le titre, la note officielle, le nombre de visionnages et la note moyenne donnée par les utilisateurs. Triez par note utilisateur décroissante.

