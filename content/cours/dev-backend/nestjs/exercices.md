# Exercices

### Preparation

Ces exercices seront à réaliser par dessus le projet d'exemple.

- Forker le [Projet NestJS](https://github.com/opac-teach/nest-demo) sur votre compte github,
- Cloner le fork sur votre machine
- Créer une nouvelle branche et faire vos modifications dessus.

Une fois le travail réalisé, vous pourrez creer une pull request sur le projet original.

### Exigences techniques

- Le code devra être propre et bien structuré.
- Le serveur devra exposer une specification OpenAPI exhaustive.
- Les données sensibles devront êtres securisées et masquées aux clients non-concernés.
- Chaque fonctionnalité devra être couverte par des tests.
- Des tests d'integration devront être réalisés sur des scenarions d'utilisations minimum

# Tâches

> Les taches proposées ici sont des idées, vous aurez le droit de dévier des specifications proposées à votre guise, tant que les fonctionnalités principales sont présentes, fonctionnelles et que le code est de qualité.

## 1. Utilisateurs

Modifier le projet pour ajouter une entité utilisateur.
Les utilisateurs pourront avoir des informations de profil de votre choix tel qu'un nom d'utilisateur ou une description.

- Creer une relation entre les chats et les utilisateurs. Chaque chat appartient à un seul utilisateur, et les utilisateurs peuvent posseder plusieurs chats.
- Creer les routes CRUD correspondantes.
- Creer des routes qui permettent de rechercher des chats par proprietaire et rajouter l'utilisateur lors de la recuperation des chats.

## 2. Authentification

Creer un système d'authentification pour l'application.

- Determiner les informations nécessaires pour chaque utilisateur et les ajouter à son entité.
- Creer le systeme d'authentification, les routes et toutes autres ressources nécessaires qui permettra de securiser l'application.
- Modifier les routes CRUD existantes pour qu'elles soient protégées par le système d'authentification, selon les besoins de chacune d'elles.
  - Par exemple, seuls les utilisateurs peuvent modifier ou supprimer leurs propre profil, et les routes pour la gestions des chats/races doivent être accessibles aux utilisateurs authentifiés uniquement.
  - Lorsqu'un chat est créé, il doit être associé à l'utilisateur qui crée le chat.

## 3.Commentaires

Ajouter la possibilité aux utilisateurs de poster des commentaires sur les chats.

- Creer les relations et les routes necessaires.
- Les commentaires doivent être associés à un utilisateur et un chat.
- Les utilisateurs ne peuvent modifier ou supprimer que leurs propres commentaires.

## 4. Croisement de chats

Creer une route pour faire croiser deux chats existants, qui créera un (ou plusieurs) nouveau(x) chaton(s).

- Les deux chats doivent appartenir à l'utilisateur connecté.
- Si les deux chats sont de la même race, le nouveau chat créé sera de cette race.
- Si les deux chats sont de races différentes, une nouvelle race sera créée avec une seed qui est une combinaison des seeds des deux parents.
- [OU] Si plusieurs chatons sont créés, on pourra attribuer aléatoirement une des deux races des parents à chaque chaton.

## 5. Croisement entre utilisateurs

Augmenter le systeme de croisement pour autoriser le croisement entre chats de differents proprietaires.

- Determiner le système d'acceptation des croisements (demande, approbation, refus, etc.)
- Creer les entités et les routes necessaires pour gerer les demandes de croisement et les executer.

## 6. Modèle conceptuel de données

Elaborer un modèle conceptuel de données pour l'application qui represente les entités et leur relations.

Réaliser le diagramme en langage UML et l'integrer dans le projet dans un fichier Markdown.

Vous pouvez vous aider de la [documentation de Mermaid](https://mermaid.js.org/syntax/entityRelationshipDiagram.html).

## 7. Rôles

Creer un système de rôles pour l'application.

- Creer les rôles et les routes necessaires pour gerer les rôles des utilisateurs.
- Modifier le système d'authentification pour qu'il utilise les rôles.
- Creer/modifier les routes qui ne sont accessibles qu'aux utilisateurs ayant un rôle donné.

Par exemple, creer un role administrateur qui aura accès à toutes les routes de modification de données, pourra gerer les autres administrateurs et modérateurs, et un role moderateur qui pourra modifier et supprimer les commentaires de n'importe quel utilisateur.
