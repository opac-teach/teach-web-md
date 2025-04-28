# Optimisations et Bonnes Pratiques

## Problème N+1 queries

Le problème N+1 est l'un des défis les plus courants dans les API GraphQL. Il survient lorsqu'une requête récupère une liste d'éléments, puis effectue une requête supplémentaire pour chaque élément afin d'obtenir des données associées.

https://shopify.engineering/solving-the-n-1-problem-for-graphql-through-batching

Exemple problématique :

```javascript
const resolvers = {
  Query: {
    posts: async () => {
      // 1 requête pour obtenir tous les posts
      return await Post.find();
    },
  },
  Post: {
    author: async (post) => {
      // N requêtes, une pour chaque post
      return await User.findById(post.authorId);
    },
  },
};
```

Ici, on récupère tous les posts, et pour chaque post, on récupère l'auteur. Si plusieurs posts ont le même auteur, on fait plusieurs requêtes à la base de données.

**DataLoader et batching :**

[DataLoader](https://github.com/graphql/dataloader) est une bibliothèque qui permet de regrouper et mettre en cache les requêtes.

Elle est compatible avec n'importe quel méthode pour récupérer les données car c'est à nous d'implémenter la logique de récupération. Le loader prend en entrée un tableau d'identifiants et retourne un tableau de résultats dans le même ordre que les identifiants.

On créera un loader pour chaque requete dans le contexte, et celui-ci évitera des duplications de requetes.

```javascript
const DataLoader = require("dataloader");

// Dans le contexte de l'application
const createContext = () => {
  const userLoader = new DataLoader(async (userIds) => {
    // Une seule requête pour récupérer tous les utilisateurs nécessaires
    const users = await User.find({ _id: { $in: userIds } });

    // Réorganiser les résultats dans le même ordre que les IDs demandés
    return userIds.map((id) =>
      users.find((user) => user.id.toString() === id.toString())
    );
  });

  return { userLoader };
};

// Dans les resolvers
const resolvers = {
  Post: {
    author: async (post, _, { userLoader }) => {
      return await userLoader.load(post.authorId);
    },
  },
};
```

## Caching

https://www.apollographql.com/docs/apollo-server/performance/caching

Apollo Server propose plusieurs stratégies de cache :

```javascript
const { ApolloServer } = require("apollo-server-express");
const { InMemoryLRUCache } = require("apollo-server-caching");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: new InMemoryLRUCache({
    maxSize: 1000000, // ~1MB
    ttl: 300, // 5 minutes
  }),
  dataSources: () => ({
    productsAPI: new ProductsAPI(),
  }),
});

// Dans une source de données personnalisée
class ProductsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = "https://api.example.com/";
  }

  async getProduct(id) {
    return this.get(`products/${id}`, null, {
      cacheOptions: { ttl: 60 }, // Cache pour 60 secondes
    });
  }
}
```

## Pagination

Lorsqu'une requete récupère une liste d'éléments, il est souvent nécessaire de la paginer. En effet, sans la pagination, si la base de données contient beaucoup d'éléments, la requete peut prendre être très longue à charger, très volumineuse et ralentir le client et le serveur voir même generer des erreurs.

```graphql
input PaginationInput {
  page: Int = 1
  pageSize: Int = 10
}

type Query {
  products(pagination: PaginationInput): ProductConnection!
}
```

> Attention, la technique limit/offset peut souvent poser problème (changement de données entre les requetes) et on preferera utiliser des curseurs !

Implémentation des resolvers :

```javascript
const resolvers = {
  Query: {
    products: async (_, { pagination }) => {
      return Product.find()
        .sort({ _id: 1 })
        .skip(pagination.page * pagination.pageSize)
        .limit(pagination.pageSize);
    },
  },
};
```

### Cursor-based

La pagination par limit/offset peut souvent poser problème (changement de données entre les requetes, perte/duplication de données) et on preferera utiliser des curseurs.

La pagination par curseur, au lieu d'etre définie par un nombre d'elements à retourner et le numéro de la page, se basera sur le dernier element récupéré pour récupérer la page suivante.

```graphql
input PaginationInput {
  cursor: String
  limit: Int = 10
}
```

La pratique commune est de suivre la specification [Relay Cursor Connections Specification](https://relay.dev/graphql/connections.htm) avec des edges/node pour retourner les données.

```graphql
type ProductConnection {
  edges: [ProductEdge!]!
  pageInfo: PageInfo!
}

type ProductEdge {
  node: Product!
  cursor: String!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}
```

Le type de curseur dépendra de l'implémentation en base de données. En postgres, on remplacera les clauses LIMIT/OFFSET par des clauses ORDER BY et des clauses WHERE avec des curseurs.

```sql
SELECT * FROM products
ORDER BY id
LIMIT 10
OFFSET 20;
```

Remplacé par:

```sql
SELECT * FROM products
WHERE id > '20'
ORDER BY id
LIMIT 10;
```

## Sécurité

### Validation des entrées

Le serveur Apollo valide le schema GraphQL, mais il ne verifie pas les données envoyées en entrées par le client, il faudra le faire soi-même, avec une librairie telle que [zod](https://zod.dev/)

```typescript
import { UserInputError } from "apollo-server-express";
import { z } from "zod";

const productInputSchema = z.object({
  name: z.string().min(3).max(100),
  price: z.number().positive(),
  description: z.string().max(1000),
  categoryId: z.string(),
});

const resolvers = {
  Mutation: {
    createProduct: async (_, { input }) => {
      try {
        // Valider l'entrée
        await productInputSchema.parseAsync(input);

        // Procéder à la création
        return await Product.create(input);
      } catch (error) {
        throw new GraphQLError(error.message, {
          extensions: { code: "BAD_USER_INPUT" },
        });
      }
    },
  },
};
```
