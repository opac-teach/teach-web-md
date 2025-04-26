# Projet d'exemple

Un projet de démonstration illustrant les principales fonctionnalités de GraphQL est disponible dans le dépôt GitHub [graphql](https://github.com/opac-teach/graphql).

Celui-ci servira de base pour les exercices.

## Structure du projet

Cette application de démonstration implémente une bibliothèque de musique avec des utilisateurs et les chansons qu'ils ont publiés.

### Serveur

Le serveur est construit avec Apollo Server.

Il propose un schema GraphQL basique avec generation automatique des types avec codegen.

Afin de simplifier le projet, aucune base de données n'est utilisée, et les données sont stockées en mémoire et accessibles depuis la classe `FakeORM` qui simule un ORM basique d'une base de données.

### Client

Le client est construit avec Next.js et shadcn/ui.

Il propose des pages pour afficher les utilisateurs et les chansons.

## Developpement

L'application complete est lançable avec Docker depuis la racine du projet avec la commande `docker compose up`.

> Attention, lancé avec Docker, l'application sera lancée en mode "production" et ne sera pas mise à jour avec les derniers changements du code.

Le frontend sera accessible à l'adresse `http://localhost:3000`.

La sandbox Apollo sera accessible à l'adresse `http://localhost:4000/graphql`.

### Lancement en mode developpement

Pour lancer l'application en mode developpement, installer les dépendances de chaque projet avec `npm install` et lancer les chacun d'eux avec `npm run dev`.
