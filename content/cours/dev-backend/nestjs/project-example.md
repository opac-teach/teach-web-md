# Projet d'example

Vous retrouverez un projet d'exemple montrant la plupart des fonctionnalités de NestJS dans le depot github [nest-demo](https://github.com/opac-teach/nest-demo).

## Structure du projet

Cette application basique gère une base de données de chats et de races de chats.

### Techniques utilisées

- API REST
- Données stockées dans PostgreSQL via TypeORM
- Specification OpenAPI
- Validation des données entrantes et serialisation des sortantes
- Tests unitaires
- Tests d'intégration
- Un serveur WebSocket
- Un Guard d'exemple qui renvoie aléatoirement une erreur
- Un Middleware de logging

### Fonctionnalités

- Creer/modifier/supprimer des chats
- Creer/modifier/supprimer des races de chats
- Notification en temps réél de l'ajout ou modification de chats ou de races
- Les races possèdent une seed (secrète) qui permet de generer la couleur du chat lors de sa création, les chats de la même race ayant des couleurs similaires
