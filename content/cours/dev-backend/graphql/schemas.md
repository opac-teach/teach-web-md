# Le Schéma GraphQL

https://www.apollographql.com/docs/apollo-server/schema/schema

## Système de types

Le système de types de GraphQL est la pierre angulaire de son architecture. Il définit un contrat clair entre le client et le serveur.

**Types scalaires intégrés :**

Les types scalaires sont utilisés pour définir les types de données primaires.

- `Int` : Entier 32 bits signé
- `Float` : Nombre à virgule flottante
- `String` : Chaîne de caractères UTF-8
- `Boolean` : Valeur booléenne (true/false)
- `ID` : Identifiant unique, souvent utilisé comme clé primaire

**Types objets :**

Les types objets sont utilisés pour définir les entités de l'API.

```graphql
type Product {
  id: ID!
  name: String!
  price: Float!
  description: String
  category: Category
}
```

**Interfaces :**

Les interfaces sont utilisées pour définir un contrat commun entre différents types objets.

```graphql
interface Node {
  id: ID!
}

type User implements Node {
  id: ID!
  name: String!
}

type Product implements Node {
  id: ID!
  name: String!
  price: Float!
}
```

**Types énumération :**

Les types énumération sont utilisés pour définir des ensembles de valeurs possibles d'un type.

```graphql
enum OrderStatus {
  PENDING
  PROCESSING
  SHIPPED
  DELIVERED
  CANCELLED
}
```

**Types union :**

Les types union sont utilisés pour définir un ensemble de types possibles.

```graphql
union SearchResult = User | Product | Article
```

**Types d'entrée :**

```graphql
input ProductInput {
  name: String!
  price: Float!
  description: String
  categoryId: ID!
}
```

**Modificateurs de types :**

- `Type!` : Non-nullable (valeur obligatoire)
- `[Type]` : Liste
- `[Type!]!` : Liste non-nullable contenant des éléments non-nullables

## Définition d'un schéma

Un schéma GraphQL définit les capacités de l'API à travers trois types d'opérations principales :

**Type Query :**
Point d'entrée pour les opérations de lecture.

```graphql
type Query {
  product(id: ID!): Product
  products(category: ID, limit: Int = 10): [Product!]!
  categories: [Category!]!
}
```

**Type Mutation :**
Point d'entrée pour les opérations de modification.

```graphql
type Mutation {
  createProduct(input: ProductInput!): Product!
  updateProduct(id: ID!, input: ProductInput!): Product!
  deleteProduct(id: ID!): Boolean!
}
```

**Type Subscription :**
Point d'entrée pour les opérations en temps réel.

```graphql
type Subscription {
  productUpdated: Product!
  newOrder: Order!
}
```

**Documentation intégrée :**

```graphql
"""
Représente un utilisateur du système.
"""
type User {
  """
  Identifiant unique de l'utilisateur.
  """
  id: ID!

  "Nom complet de l'utilisateur."
  name: String!
}
```
