# Connexion à MongoDB depuis un serveur

Il existe plusieurs niveaux d'abstraction pour interagir avec MongoDB depuis une application : du driver officiel bas niveau jusqu'aux ODM (Object Document Mapper) qui ajoutent schémas, validation et helpers.

## Le driver officiel MongoDB

Le driver officiel est la couche la plus proche de MongoDB. Tous les autres outils s'appuient dessus.

### Installation

```bash
npm install mongodb
```

### Connexion et utilisation

```javascript
import { MongoClient } from 'mongodb'

const client = new MongoClient('mongodb://localhost:27017')

await client.connect()

const db = client.db('maBase')
const films = db.collection('films')

// Insérer
await films.insertOne({ titre: 'Inception', note: 8.8 })

// Lire
const film = await films.findOne({ titre: 'Inception' })

// Mettre à jour
await films.updateOne({ titre: 'Inception' }, { $set: { note: 9.0 } })

// Supprimer
await films.deleteOne({ titre: 'Inception' })

await client.close()
```

### Gestion de la connexion en production

Ouvrir et fermer une connexion à chaque requête est coûteux. En production, on utilise un **pool de connexions** et on partage l'instance `MongoClient` dans toute l'application.

```javascript
// db.js — module singleton
import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.MONGO_URI)
await client.connect()

export const db = client.db('maBase')
```

```javascript
// Dans une route Express
import { db } from './db.js'

app.get('/films', async (req, res) => {
  const films = await db.collection('films').find().toArray()
  res.json(films)
})
```

### Avantages et limites du driver

| Avantages | Limites |
|-----------|---------|
| Accès complet à toutes les fonctionnalités MongoDB | Pas de validation de schéma intégrée |
| Performances maximales | Code verbeux pour les cas complexes |
| Aucune couche d'abstraction superflue | Pas de gestion des relations |
| Idéal pour les pipelines d'agrégation complexes | Typage manuel des documents |

---

## Solutions JavaScript

### Mongoose — ODM de référence

[Mongoose](https://mongoosejs.com/) est l'ODM (Object Document Mapper) le plus utilisé dans l'écosystème Node.js. Il ajoute une couche de **schémas**, de **validation** et de **middleware** au-dessus du driver officiel.

```bash
npm install mongoose
```

#### Définir un schéma et un modèle

```javascript
import mongoose from 'mongoose'

const filmSchema = new mongoose.Schema({
  titre: { type: String, required: true },
  realisateur: { type: String, required: true },
  annee: { type: Number, min: 1888 },
  note: { type: Number, min: 0, max: 10 },
  genres: [String]
})

const Film = mongoose.model('Film', filmSchema)
```

#### Connexion

```javascript
await mongoose.connect('mongodb://localhost:27017/maBase')
```

#### Opérations CRUD

```javascript
// Créer
const film = await Film.create({ titre: 'Parasite', realisateur: 'Bong Joon-ho', note: 8.6 })

// Lire
const films = await Film.find({ note: { $gte: 8.0 } }).sort({ note: -1 })
const film = await Film.findById(id)

// Mettre à jour
await Film.findByIdAndUpdate(id, { $set: { note: 8.7 } }, { new: true })

// Supprimer
await Film.findByIdAndDelete(id)
```

#### Fonctionnalités clés de Mongoose

**Validation intégrée**

```javascript
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email requis'],
    match: [/\S+@\S+\.\S+/, 'Email invalide'],
    unique: true
  },
  age: { type: Number, min: [0, 'Age invalide'], max: 120 }
})
```

**Middleware (hooks)**

```javascript
// Avant la sauvegarde : hacher le mot de passe
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})
```

**Méthodes et virtuals**

```javascript
// Méthode d'instance
userSchema.methods.verifyPassword = function (password) {
  return bcrypt.compare(password, this.password)
}

// Virtual (champ calculé, non stocké en base)
filmSchema.virtual('dureeFormatee').get(function () {
  return `${Math.floor(this.duree / 60)}h${this.duree % 60}min`
})
```

**Population (jointures)**

```javascript
const commentaireSchema = new mongoose.Schema({
  texte: String,
  auteur: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

// Résoudre la référence automatiquement
const commentaires = await Commentaire.find().populate('auteur', 'nom email')
```

---

### Prisma — ORM moderne avec support MongoDB

[Prisma](https://www.prisma.io/) est un ORM TypeScript-first qui supporte plusieurs bases de données dont MongoDB. Il génère un client typé à partir d'un fichier de schéma déclaratif.

```bash
npm install prisma @prisma/client
npx prisma init --datasource-provider mongodb
```

#### Schéma Prisma

```prisma
// prisma/schema.prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model Film {
  id          String   @id @default(auto()) @map("_id") @db.ObjectId
  titre       String
  realisateur String
  note        Float?
  genres      String[]
}
```

#### Utilisation

```typescript
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Créer
const film = await prisma.film.create({
  data: { titre: 'Inception', realisateur: 'Christopher Nolan', note: 8.8 }
})

// Lire avec filtre
const films = await prisma.film.findMany({
  where: { note: { gte: 8.0 } },
  orderBy: { note: 'desc' }
})

// Mettre à jour
await prisma.film.update({
  where: { id: '...' },
  data: { note: 9.0 }
})
```

#### Avantages de Prisma

- Typage TypeScript complet généré automatiquement
- Studio visuel intégré (`prisma studio`)
- Support multi-bases (PostgreSQL, MySQL, MongoDB…)

> **Limite avec MongoDB** : Prisma est avant tout un ORM destiné aux bases relationnelles. Il est possible de l'utiliser avec MongoDB mais avec quelques restrictions. Consulter la [documentation officielle](https://www.prisma.io/docs/orm/core-concepts/supported-databases/mongodb) pour savoir ce qu'il est possible ou non de faire.

---

### Comparaison des approches JavaScript

| | Driver officiel | Mongoose | Prisma |
|---|---|---|---|
| **Niveau d'abstraction** | Bas | Moyen | Élevé |
| **Schéma** | Aucun | Défini en JS | Défini en DSL |
| **TypeScript** | Générics manuels | Types partiels | Génération automatique |
| **Validation** | Manuelle | Intégrée | Intégrée |
| **Aggregation** | Complète | Complète | Limitée |
| **Idéal pour** | Contrôle total, perf | Apps Node.js classiques | Apps TypeScript, multi-BDD |

---

## Clients dans d'autres langages

MongoDB fournit des drivers officiels pour tous les langages majeurs.

| Langage | Driver officiel | ODM populaire |
|---------|----------------|---------------|
| **Python** | `pymongo` | `mongoengine`, `beanie` (async) |
| **Java** | `mongodb-driver-sync` / `mongodb-driver-reactivestreams` | `Spring Data MongoDB` |
| **Go** | `mongo-driver` | `qmgo` |
| **PHP** | `mongodb` (extension PECL) | `Doctrine ODM` |
| **C#/.NET** | `MongoDB.Driver` | intégré au driver |
| **Ruby** | `mongo` | `Mongoid` |
| **Rust** | `mongodb` (crate) | — |

### Exemple Python avec PyMongo

```python
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client["maBase"]
films = db["films"]

# Insérer
films.insert_one({"titre": "Parasite", "note": 8.6})

# Lire
for film in films.find({"note": {"$gte": 8.0}}):
    print(film["titre"])
```

### Exemple Python avec Beanie (async / FastAPI)

```python
from beanie import Document, init_beanie
from motor.motor_asyncio import AsyncIOMotorClient

class Film(Document):
    titre: str
    note: float

    class Settings:
        name = "films"

# Initialisation
client = AsyncIOMotorClient("mongodb://localhost:27017")
await init_beanie(database=client.maBase, document_models=[Film])

# Utilisation
film = await Film.find_one(Film.note >= 8.0)
```