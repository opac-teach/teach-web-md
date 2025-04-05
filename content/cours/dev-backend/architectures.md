# Architectures Backend

## Monolithique

Une architecture monolithique est une approche "tout-en-un" du développement d'applications.

Elle se caractérise par un seul serveur, un seul processus et une seule base de données. Cette architecture est idéale pour les applications de petite taille, car elle simplifie considérablement la gestion et la maintenance. Cependant, lorsque l'application prend de l'ampleur, ses besoins en matière de scalabilité et de résilience augmentent, rendant une architecture monolithique moins adaptée.

Un inconvénient majeur est le point unique de défaillance : si le serveur tombe en panne, l'application entière devient indisponible.

Par ailleurs, avec l'accroissement du code et de l'équipe de développement, les temps de déploiement et de mise à jour s'allongent. Il devient nécessaire de tester l'application dans son intégralité à chaque modification, ce qui augmente les risques de régression. L'ajout de nouvelles fonctionnalités ou l'adoption de technologies plus modernes deviennent également plus complexes.

## Microservices

L'approche microservices, contrairement à l'approche monolithique, consiste à diviser l'application en plusieurs services autonomes pouvant être déployés indépendamment. Ces services peuvent fonctionner sur différents serveurs et être développés dans des langages de programmation variés. Cette architecture améliore la scalabilité et la résilience, tout en permettant de sélectionner les technologies les plus appropriées pour chaque service.

Cette approche introduit néanmoins une complexité supplémentaire : il faut gérer plusieurs serveurs, organiser leurs déploiements et leurs mises à jour, et surtout établir une communication efficace entre ces différents services.

Exemples de séparation en services distincts :

- Un service de gestion des utilisateurs
- Un service de gestion des commandes
- Un service d'authentification
- Un service d'accès à la base de données
- Un service de cache

### La communication entre services

Ces services interconnectés doivent pouvoir partager des données et échanger des messages. Cette communication s'effectue généralement de manière asynchrone via un message broker.

Ce message broker (ou système de file d'attente) est habituellement un composant distinct qui doit être constamment disponible pour tous les services. Il est chargé de stocker les messages et de les transmettre aux services concernés. Ces systèmes permettent également de gérer les erreurs et de retenter la transmission des messages en cas d'échec.

Parmi les message brokers les plus utilisés, on trouve :

- Redis
- Kafka
- RabbitMQ

## Serverless

L'approche serverless vise à éliminer la gestion des serveurs pour les développeurs.

Contrairement aux deux approches précédentes, le serverless n'utilise pas de processus fonctionnant en continu, mais des fonctions exécutées à la demande, uniquement lorsqu'une requête est effectuée.

Il s'agit d'une approche cloud où la facturation repose sur le temps d'exécution des fonctions plutôt que sur la location de serveurs.

Cette approche a été popularisée par AWS avec son service Lambda, et s'est depuis développée avec des frameworks web modernes comme NextJS ou les Cloudflare Workers.
