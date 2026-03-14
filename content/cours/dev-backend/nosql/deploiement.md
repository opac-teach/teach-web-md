# Déploiement de bases de données MongoDB

## Développement

Dans la phase de developpement d'une application, la manière la plus simple de faire tourner une base de données est d'utiliser docker.

[Image officielle docker](https://hub.docker.com/_/mongo)

Exemple de `docker-compose.yaml`:
```
services:
  mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - data:/data/db
volumes:
  data:
```

:::info
Attention, cette configuration suffit pour du developpement mais pas pour une base de production !
::: 

## Production

En production, il est recommandé d'utiliser un orchestrateur de conteneurs comme Kubernetes pour déployer et gérer les bases de données, mais cela demande une maintenance assez consequente pour maintenir un service fiable (disponibilité, backups, performances...).

La solution la plus simple est d'utilser les services dits **managed** proposés par les clouds qui garantissent fiabilité, performance et disponibilité sans efforts. 

Pour Mongo, la solution la plus simple est d'utiliser [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), qui propose une offre gratuite pour les petites applications et qui est integré dans la plupart des clouds (Vercel, Google Cloud...)

## Configuration du client

Afin de configurer le serveur et le client, n'hesitez pas a utiliser les variables d'environnement, typiquement pour l'url de connection au serveur.

```
# .env
MONGODB_URI=mongodb://localhost:27017
```

```js
const client = new MongoClient(process.env.MONGODB_URI);
```

Attention, pour que les variables d'environnement soient disponibles dans `process.env`,  il faut qu'elles soient d'abord lues. C'est souvent le cas avec des packagers comme Next ou Vite.
Sans eux, on peut utiliser le paquet NPM `dotenv` pour lire les variables d'environnement.

`npm i -D dotenv`

```js
import dotenv from 'dotenv';
dotenv.config();
```

## GUI 

Il existe differentes applications pour inspecter une base de données MongoDB.
La solution officielle est [MongoDB Compass](https://www.mongodb.com/products/compass)

Parmis les autres solution, on retrouvera Prisma Studio, l'inspecteur de Intellij, 