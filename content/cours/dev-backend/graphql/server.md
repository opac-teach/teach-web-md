# Implémentation côté serveur

## Serveurs GraphQL

Plusieurs frameworks permettent d'implémenter un serveur GraphQL, chacun avec ses spécificités, mais ils sont tous basés sur le même principe.

La librairie la plus populaire est [Apollo](https://www.apollographql.com/), et c'est elle que l'on étudiera ici. Elle propose un serveur GraphQL complet et une librairie de client GraphQL.

https://www.apollographql.com/docs/apollo-server

```typescript
// Exemple de code pour un serveur Apollo Server avec express
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";

const app = express();
const database = new Database();

const server = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    user: req.user,
    dataSources: {
      database,
    },
  }),
});
await server.start();

app.use("/graphql", express.json(), expressMiddleware(server));
```

## Context

Le contexte est un objet partagé entre tous les resolvers pour la requête en cours. Il peut contenir des informations comme l'utilisateur authentifié, les données récupérées depuis les headers de la requête, les sources de données, etc.

https://www.apollographql.com/docs/apollo-server/data/context

Certains des éléments qui sont présents dans le contexte pourront être communs à toutes les requêtes (connection à la base de donnée) ou bien spécifiques à une requête (authentification, etc).

```typescript
type MyContext = {
  user: User;
  dataSources: {
    database: Database;
  };
};
```

## Typedefs

Les typedefs sont le schéma GraphQL compilé. Ils définissent les types de données, les champs, les relations entre les types, etc.

```typescript
import { gql } from "graphql-tag";

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    products: [Product!]
  }

  type User {
    id: ID!
    name: String!
  }
`;
```

En général on récupérera automatiquement tous les fichiers `*.graphql` dans le projet et on les assemblera en un seul `typeDefs` pour le serveur.

## Resolvers

Les resolvers sont des fonctions qui déterminent comment obtenir les données pour chaque champ du schéma.

https://www.apollographql.com/docs/apollo-server/data/resolvers

```typescript
const resolvers = {
  Query: {
    user: (parent, args, context, info) => {
      return context.dataSources.database.getUser(args.id);
    },
    products: (_, __, context, info) => {
      return context.dataSources.database.getProducts();
    },
  },

  User: {
    orders: (parent, args, context) => {
      // parent contient les données de l'utilisateur déjà résolues
      return context.dataSources.database.getOrdersByUser(parent.id);
    },
  },
  Mutation: {
    createOrder: (parent, args, context) => {
      if (!context.user) {
        throw new GraphQLError(
          "You must be logged in to perform this action.",
          {
            extensions: {
              code: "FORBIDDEN",
            },
          }
        );
      }
      return context.dataSources.database.createOrder(args);
    },
  },
};
```

**Paramètres des resolvers :**

- `parent` : Résultat du resolver parent (objet contenant)
- `args` : Arguments passés au champ dans la requête
- `context` : Objet partagé entre tous les resolvers (authentification, sources de données) pour la requête en cours
- `info` : Informations sur l'exécution de la requête (rarement utilisé directement)

Lorsque l'on n'utilise pas certains arguments, on peut les ignorer avec `_` :

## Sandbox

Les serveur GraphQL sont generalement fournis avec une sandbox pour tester les requetes, qui est une interface web permettant de consulter le schema et executer des requetes.

- [Apollo Sandbox](https://studio.apollographql.com/sandbox/explorer?referrer=docs-content)
- [GraphiQL](https://github.com/graphql/graphiql)

## Codegen

https://www.apollographql.com/docs/apollo-server/workflow/generate-types

Lorsque l'on développe en typescript, il est necessaire d'avoir accès aux types définis par le schema GraphQL.

Pour cela, il existe des librairies de codegen qui permettent de generer les types en typescript a partir du schema GraphQL.

```ts
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "./src/**/*.graphql",
  generates: {
    "./src/types.ts": {
      plugins: ["typescript", "typescript-resolvers"],
      config: {
        contextType: "./index#ResolversContext",
        mappers: {
          User: "./datasource#DBUser",
          Song: "./datasource#DBSong",
        },
      },
    },
  },
};

export default config;
```

## Integrations

Il est possible d'integrer le serveur GraphQL dans une application existante, comme une application Next.js.

https://www.apollographql.com/docs/apollo-server/integrations/integration-index
