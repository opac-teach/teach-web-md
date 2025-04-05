# Projet d'exemple

Un projet de démonstration illustrant les principales fonctionnalités de NestJS est disponible dans le dépôt GitHub [nest-demo](https://github.com/opac-teach/nest-demo).

## Structure du projet

Cette application de démonstration implémente un système de gestion de chats et de races félines, permettant de comprendre les concepts fondamentaux de NestJS dans un contexte concret.

### Technologies et concepts mis en œuvre

- API REST complète avec CRUD
- Persistance des données dans PostgreSQL via TypeORM
- Documentation interactive avec OpenAPI/Swagger
- Validation rigoureuse des données entrantes et sérialisation contrôlée des réponses
- Couverture de code par tests unitaires
- Validation fonctionnelle par tests d'intégration
- Communication en temps réel via WebSockets
- Démonstration des Guards avec un exemple de contrôle d'accès aléatoire
- Middleware de journalisation des requêtes
- Application séparée en mode microservice qui permet de calcul de la couleur des chats

### Fonctionnalités métier

- Gestion complète des chats (création, modification, suppression, consultation)
- Gestion complète des races félines (création, modification, suppression, consultation)
- Système de notifications en temps réel lors de l'ajout ou la modification d'entités
- Mécanisme avancé : les races possèdent une valeur seed (non exposée dans l'API) qui détermine la génération des couleurs des chats, assurant que les chats d'une même race présentent des caractéristiques chromatiques similaires
