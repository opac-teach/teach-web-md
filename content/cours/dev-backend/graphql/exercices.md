# Exercices GraphQL

Ces exercices seront à faire par dessus le code existant de démonstration.

Vous devrez forker le repo de répart et créer une pull request sur celui ci une fois votre travail fini.

https://github.com/opac-teach/graphql

> Si vous le souhaitez, vous pouvez commencer par suivre le [guide d'introduction officiel](https://www.apollographql.com/tutorials/intro-typescript/01-course-overview-and-setup) pour vous familiariser avec le framework.

##

# Backend

Ces exercices sont à faire dans le dossier `server-apollo`.

## Queries

Pour tester les requêtes, vous pouvez utiliser le playground que vous trouverez sur l'url: http://localhost:4000/

- Creer une query qui renvoie tous les utilisateurs
- Creer une query qui renvoie tous les utilisateurs avec leurs chansons
- Creer une query qui renvoie un utilisateur par son id et les chansons qu'il a créé
- Creer une mutation qui crée un utilisateur

## Songs

### Song User

- Ajouter un champ user dans le schema Song qui renverra l'utilisateur lié à la chanson et modifier le resolver.

### Song by ID

- Rajouter un resolver `song(id)` qui renverra une chanson par son id.

## Genre

- Ajouter un modèle `Genre` qui regroupera les chansons du meme genre.
- Creer le schema, les données mockées, les resolvers, mutations, les relations, ...
- Ajouter un argument optionnel à la query `songs` pour filtrer par genre

## Songs Count

- Ajouter un champ `songsCount` dans les schema `User` et `Genre` qui renverra le nombre de chansons liées à l'utilisateur ou au genre.

## Mutations

- Creer une mutation pour créer une chanson. N'autoriser que les utilisateurs connectés à effectuer cette action
- Creer des mutation qui permettront de modifier ou supprimer un utilisateur ou une chanson. Prendre en compte l'utilisateur qui effecture l'action et ne l'autoriser à modifier ou supprimer que ses propres données.

## Pagination

- Ajouter un système de pagination sur la liste des utilisateurs et des chansons, qui permettra de limiter le nombre de données renvoyées par la requête.

- Ajouter également la pagination sur les chaines de resolvers.

## Loaders

- Creer une query qui recuperera toutes les chansons, et l'utilisateur associé à chacune d'elle.
- Observer les messages de log dans la console et repérer les appels à la base de données qui sont dupliqués.
- Utiliser les loaders pour optimiser les requêtes et régler le probleme N+1.

## [Bonus]

### Rôles

Ajouter un système de rôles, et n'autoriser que les utilisateurs avec le role "ADMIN" à utiliser les mutations sur les genres.

> Vous pourrez au choix utiliser un header "role" dans la requete HTTP pour simuler un utilisateur avec un rôle spécifique ou bien passer sur une vraie authentification avec du JWT par exemple.

### Subscription

Modifier le serveur pour qu'il supporte les subscriptions et signaler aux client lors de l'ajout de nouvelles chansons.

https://www.apollographql.com/docs/apollo-server/data/subscriptions

### Pagination

Remplacer la pagination limit/offset par une pagination par curseur. Vous devrez certainement modifier le FakeORM ou bien utiliser une vraie base de données.

### Tests

Creer des tests d'integration pour les resolvers.

### Validation des données

Utiliser `zod` pour valider les entrées des mutations.

##

# Frontend

Ces exercices sont à faire dans le dossier `client-next` qui contient une application Next.js.

## Songs

- Ajouter la page `/song/[id]` qui affichera les détails d'une chanson
- Afficher les utilisateur qui ont créé les chansons sur les pages `/songs` et `/songs/[id]` avec des liens vers ceux-ci

## Genres

- Afficher les données sur les genres

  - Creer les pages `/genre` et `/genre/[id]`
  - Sur les autres pages, ajouter les infos de genre quand on affiche des chansons

##

- Afficher les nombre de chansons pour chaque genre et chaque utilisateur sur les pages concernées

## Formulaires

Ajouter des formulaires pour:

- Ajouter une chanson
- Ajouter un genre
- Au choix: modifier/supprimer des chansons, utilisateurs ou un genres ...

## [Bonus]

- Utiliser des fragments dans le frontend pour factoriser les requêtes
- Utiliser la pagination
- Mettre a jour le cache lors des mutations pour éviter les refetch
- Utiliser les subscriptions pour recevoir en temps réel les nouvelles chansons

### Next

- Passer sur du rendu côté serveur (SSR) pour toutes les pages
- Integrer le serveur GraphQL directement dans l'application Next.js

# NestJS

Creer un nouveau projet NestJS dans le dossier `server-nestjs` et transferer le travail effectué precedement dedans.

Ce nouveau serveur devra:

- Implementer l'API GraphQL à la manière "code-first"
- Stocker les données dans une base de données avec TypeORM
- Valider les entrées des mutations
- Avoir un système d'authentification et proteger les routes qui en ont besoin(par ex. un utilisateur ne doit pouvoir editer que ses propres chansons)
- Implementer la pagination par curseur
- Supporter les subscriptions

> Si vous le souhaitez, au lieu de recréer un nouveau projet, vous pouvez reprendre le [projet NestJS](../nestjs/project-example) créé précedement et rajouter une API GraphQL qui propose les mêmes fonctionnalités que les endpoints REST existants.

##

# [Projet] Bibliothèque musicale

Développer une application qui permettra à ses utilisateurs de consulter leur bibliothèque musicale sur les plateformes de streaming existantes (Spotify, Deezer)

L'application servira de "proxy" aux differentes plateformes et proposera une API GraphQL commune pour l'ensemble des plateformes.

## Fonctionnalités

### En mode public (utilisateur anonyme)

- Recherche de chansons, artistes, albums
- Détails sur une chanson, artiste, album

### En mode privé (utilisateur connecté)

- Connexion des utilisateurs en OAuth sur les plateformes existantes
- Récupération des playlists de l'utilsateur connecté et des chansons qu'elles contiennent
- Ajout/supression de chansons à une playlist
- Creation/modification/suppression de playlists
- Synchronisation de la bibliothèque musicale des utilisateurs entre les plateformes

## Implémentation

- Backend: Serveur Apollo+Express ou NestJS (recommandé). Base de données Redis ou PostgreSQL selon les besoins.
- Frontend: NextJS (optionnel)
