# Exercices

## Préparation

Ces exercices doivent être réalisés en se basant sur le projet d'exemple fourni.

Pour commencer :

1. Forker le [Projet NestJS](https://github.com/opac-teach/nest-demo) sur votre compte GitHub
2. Cloner votre fork sur votre machine locale
3. Créer une nouvelle branche pour vos modifications

Une fois votre travail terminé, vous pourrez créer une pull request vers le projet original.

## Exigences techniques

- Le code doit être propre, bien structuré et respecter les conventions de NestJS
- L'API doit exposer une spécification OpenAPI complète et précise
- Les données sensibles doivent être sécurisées et masquées aux utilisateurs non autorisés
- Chaque fonctionnalité doit être couverte par des tests unitaires appropriés
- Des tests d'intégration doivent valider les principaux scénarios d'utilisation

# Tâches

> Les tâches proposées ci-dessous sont des suggestions. Vous pouvez adapter les spécifications selon votre vision, tant que les fonctionnalités principales sont implémentées correctement et que la qualité du code est maintenue.

## 1. Gestion des utilisateurs

Étendre le projet pour intégrer une entité utilisateur complète.

**Objectifs :**

- Créer une entité utilisateur avec des informations de profil pertinentes (nom d'utilisateur, description, etc.)
- Établir une relation entre les chats et les utilisateurs : chaque chat appartient à un seul utilisateur, et un utilisateur peut posséder plusieurs chats
- Développer les routes CRUD pour la gestion des utilisateurs
- Implémenter des fonctionnalités de recherche permettant de filtrer les chats par propriétaire et d'inclure les données utilisateur lors de la récupération des informations sur les chats

## 2. Système d'authentification

Mettre en place un système d'authentification sécurisé pour l'application.

**Objectifs :**

- Définir et implémenter les attributs nécessaires dans l'entité utilisateur (email, mot de passe hashé, etc.)
- Développer le système d'authentification complet avec inscription, connexion, et gestion des jetons
- Sécuriser les routes existantes en fonction des besoins d'authentification :
  - Restreindre la modification ou suppression des profils aux propriétaires respectifs
  - Limiter l'accès aux fonctionnalités de gestion des chats/races aux utilisateurs authentifiés
  - Associer automatiquement un chat nouvellement créé à l'utilisateur authentifié qui effectue la création

## 3. Système de commentaires

Permettre aux utilisateurs d'interagir via des commentaires sur les profils de chats.

**Objectifs :**

- Concevoir l'entité commentaire avec les relations appropriées
- Créer les routes nécessaires pour gérer les commentaires (création, lecture, modification, suppression)
- Établir les relations entre commentaires, utilisateurs et chats
- Implémenter les règles de sécurité pour que les utilisateurs ne puissent modifier ou supprimer que leurs propres commentaires

> Penser à supprimer les commentaires de l'utilisateur lors de sa suppression via une transaction.

## 4. Croisements entre chats

Développer un système permettant le croisement de chats pour créer de nouveaux chatons.

**Objectifs :**

- Créer une route dédiée au croisement de deux chats existants
- Vérifier que les deux chats appartiennent à l'utilisateur connecté
- Gérer l'hérédité des races :
  - Si les parents sont de même race, le chaton hérite de cette race
  - Si les parents sont de races différentes, créer une nouvelle race avec une seed dérivée des races parentales
  - Alternativement, permettre la création de plusieurs chatons avec attribution aléatoire des races parentales

## 5. Croisement inter-propriétaires

Enrichir le système de croisement pour permettre des croisements entre chats de différents propriétaires.

**Objectifs :**

- Concevoir un système de demande et d'approbation pour les croisements (requête, acceptation, refus)
- Développer les entités et routes nécessaires à la gestion des demandes de croisement
- Implémenter la logique d'exécution des croisements approuvés et la gestion de la propriété des chatons résultants

## 6. Modélisation des données

Élaborer une représentation visuelle de l'architecture de données de l'application.

**Objectifs :**

- Créer un diagramme UML présentant les entités et leurs relations
- Intégrer ce diagramme dans un fichier Markdown au sein du projet
- Utiliser la syntaxe [Mermaid](https://mermaid.js.org/syntax/entityRelationshipDiagram.html) pour une visualisation claire et interactive

## 7. Système de rôles et permissions

Implémenter un système de contrôle d'accès basé sur les rôles.

**Objectifs :**

- Définir différents rôles utilisateur avec leurs permissions respectives
- Adapter le système d'authentification pour intégrer la gestion des rôles
- Créer ou modifier les routes pour restreindre l'accès en fonction des rôles

**Exemple de hiérarchie de rôles :**

- **Administrateur** : accès complet à toutes les fonctionnalités, gestion des rôles utilisateur
- **Modérateur** : capacité à modérer les commentaires de tous les utilisateurs
- **Utilisateur standard** : accès limité aux fonctionnalités de base
