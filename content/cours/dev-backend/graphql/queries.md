# Requêtes et Mutations

## Structure des requêtes

Les requêtes GraphQL permettent au client de spécifier précisément les données qu'il souhaite obtenir.

**Sélection de champs basique :**

```graphql
query GetUsers {
  users {
    id
    name
    email
    products {
      id
      name
      price
    }
  }
}
```

> Remarque le nom de la requête est arbitraire et n'a pas d'importance.

**Arguments :** Les arguments permettent de filtrer ou paramétrer les requêtes.

```graphql
query GetProducts {
  products(category: "electronics", limit: 5) {
    id
    name
    price
  }
}
```

Il est possible de demander plusieurs resources dans une seule requête GraphQL.

Les **alias** permettent de renommer les champs dans la réponse ou d'interroger le même champ plusieurs fois.

```graphql
{
  newProducts: products(limit: 5, sort: "createdAt_DESC") {
    id
    name
  }
  popularProducts: products(limit: 5, sort: "sales_DESC") {
    id
    name
  }
}
```

**Fragments :**
Les fragments sont des ensembles réutilisables de champs.

```graphql
{
  user(id: "123") {
    ...UserBasicInfo
    orders {
      id
      total
    }
  }
}

fragment UserBasicInfo on User {
  id
  name
  email
  avatarUrl
}
```

**Variables :**
Les variables permettent de paramétrer les requêtes de façon dynamique. Elles doivent être déclérées dans la requête.

```graphql
query GetUser($userId: ID!, $limit: Int) {
  user(id: $userId) {
    id
    name
    orders(limit: $limit) {
      id
      total
    }
  }
}

# Variables JSON
{
  "userId": "123",
  "limit": 10
}
```

**Directives :**
Les directives contrôlent l'inclusion conditionnelle de champs.

```graphql
query GetUser($withReviews: Boolean!) {
  user(id: "123") {
    name
     " include si $withReviews est true "
    reviews @include(if: $withReviews) {
      rating
      comment
    }
    " skip si $withReviews est true "
    address @skip(if: $withReviews) {
      street
      city
    }
  }
}
```

## Mutations

Les mutations permettent de modifier les données sur le serveur.

**Structure d'une mutation :**

```graphql
mutation CreateProduct($input: ProductInput!) {
  createProduct(input: $input) {
    id
    name
    price
  }
}

# Variables
{
  "input": {
    "name": "Smartphone XYZ",
    "price": 699.99,
    "categoryId": "electronics"
  }
}
```

**Mutations multiples :**

```graphql
mutation ManageCart($addId: ID!, $removeId: ID!) {
  addToCart(productId: $addId) {
    id
    items {
      product {
        name
      }
      quantity
    }
  }
  removeFromCart(productId: $removeId) {
    id
    totalItems
  }
}
```

**Bonnes pratiques pour les mutations :**

- Retourner l'objet modifié
- Utiliser des types d'entrée pour les arguments complexes
- Structurer les réponses pour inclure les statuts et erreurs
- Nommer les mutations avec des verbes (create, update, delete)
- Assurer l'atomicité des opérations

## Erreurs

Lors d'une mutation, si on souhaite retourner des erreurs (validation, permissions, ...) on évitera de rejeter la requete comme on le ferait en REST avec une erreur HTTP 400.

Au lieu de ça, on essaiera de toujours retourner des 200 et plutôt retourner des informations de succès ou d'erreur systematiquement dans la réponse.

```graphql
mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    success
    token
    errors {
      field
      message
    }
    user {
      id
      name
    }
  }
}
```
