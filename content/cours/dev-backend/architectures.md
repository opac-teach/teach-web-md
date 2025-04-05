# Architectures Backend

## Monolithique

Une architecture monolithique est une architecture de type "all-in-one".

Elle est composée d'un seul serveur, d'un seul processus, et d'une seule base de données. Ce sera souvent le cas pour des applications de petite taille, car il est beaucoup plus simple de gérer un seul serveur, et une seule base de code, cependant lorsqu'une application grandit, ses besoins de scalabilité et de résilience vont augmenter, et une architecture monolithique ne sera plus suffisante.

Avoir un seul serveur signifie que si celui-ci tombe en panne, l'application ne sera plus disponible.

De plus, plus la quantité de code et de l'équipe augmente, plus le temps de déploiement et de mise à jour de l'application va augmenter, car il faudra tester l'application dans son intégralité, et plus il y aura de risque de régression, et il deviendra difficile de rajouter de nouvelles fonctionnalités ou évoluer sur des technologies plus modernes.

## Microservices

L'approche microservices, contrairement à l'approche monolithique, propose quant à elle de découper l'application en plusieurs services, qui seront autonomes et pourront être déployés indépendamment. Ces services pourront potentiellement tourner sur des serveurs différents, et être écrites dans des langages différents. Cela permet de gagner en scalabilité et en résilience, mais également de pouvoir choisir les technologies les plus adaptées à chaque service.

Cela rajoutera evidemment de la complexité, car il faudra gérer plusieurs serveurs, les déployer, les mettre à jour, et surtout ces services devront pouvoir communiquer entre eux.

Exemples de séparation de services :

- Un service de gestion des utilisateurs
- Un service de gestion des commandes
- Un service d'authentification
- Un service d'acces à la base de données
- Un service de cache

### La communication entre services

Ces services devront êtres interconnectés et pourront avoir besoin de partager des données et s'échanger des messages. Cette communication se fera de manière asynchrone et generalement via un message broker.

Ce message broker (ou système de queue) sera généralement un composant séparé, aura la responsabilité d'être toujours disponible pour tous les services, et sera chargé de stocker les messages et de les transmettre aux services qui en ont besoin. Ils pourront également gérér les erreurs et recommencer la transmission des messages en cas d'échec.

Il existe plusieurs types de message brokers, mais les plus courants sont :

- Redis
- Kafka
- RabbitMQ

## Serverless

L'approche serverless est une approche qui vise à ne pas avoir de serveur, ou du moins, à ne pas se soucier de la gestion des serveurs.

Contrairement aux deux approches differentes, nous n'executerons plus de processus qui tourne en permanence, mais des fonctions qui seront executées à la demande, et qui ne tourneront que lorsqu'une requête sera faite.

C'est une approche cloud, où on ne va plus payer pour des serveurs, mais pour du temps de fonctions executées.

Cette approche a été démocratisée par AWS avec leur services Lambda, puis évoluée aujourd'hui jusqu'à des framework web modernes comme NextJS ou bien les Cloudflare Workers.
