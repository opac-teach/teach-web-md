# Clients GraphQL

Il existe plusieurs clients GraphQL pour différents langages de programmation.

Le plus populaire est Apollo Client, qui permet de faire des requêtes et des mutations, et possède une integration native avec React.

https://www.apollographql.com/docs/react

Autre clients:

- [Relay](https://relay.dev/)
- [URQL](https://nearform.com/open-source/urql/)

## Apollo Client

Apollo Client est une bibliothèque complète de gestion d'état côté client qui simplifie l'interaction avec un serveur GraphQL.

**Configuration de base :**

```javascript
import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://api.example.com/graphql",
    headers: {
      authorization: localStorage.getItem("token")
        ? `Bearer ${localStorage.getItem("token")}`
        : "",
    },
  }),
  cache: new InMemoryCache(),
});

// Dans une application React
import { ApolloProvider } from "@apollo/client";

function App({ children }) {
  return (
    <ApolloProvider client={client}>
      <div className="App">{children}</div>
    </ApolloProvider>
  );
}
```

## Queries

https://www.apollographql.com/docs/react/data/queries

Apollo client permet de faire des requêtes avec `useQuery`.

```javascript
import { useQuery, gql } from "@apollo/client";

const GET_PRODUCTS = gql`
  query GetProducts($category: ID) {
    products(category: $category) {
      id
      name
      price
      imageUrl
    }
  }
`;

function ProductList({ categoryId }) {
  const { loading, error, data, refetch } = useQuery(GET_PRODUCTS, {
    variables: { category: categoryId },
    skip: !categoryId, // Ne pas exécuter si categoryId est absent
    pollInterval: 60000, // Rafraîchir toutes les 60 secondes
  });

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div>
      <div className="product-grid">
        {data.products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.price}€</p>
          </div>
        ))}
      </div>
      <div>
        <button onClick={() => refetch()}>Rafraîchir</button>
      </div>
    </div>
  );
}
```

## Mutations

https://www.apollographql.com/docs/react/data/mutations

Apollo client permet de faire des mutations avec `useMutation`.

```javascript
import { useMutation, gql } from "@apollo/client";

const CREATE_PRODUCT = gql`
  mutation CreateProduct($product: CreateProductInput!) {
    createProduct(input: $product) {
      id
    }
  }
`;

function AddToCartButton({ productId }) {
  const [createProduct, { loading, error }] = useMutation(CREATE_PRODUCT);

  return (
    <div>
      <button
        onClick={() =>
          createProduct({ variables: { product: { name: "Produit 1" } } })
        }
        disabled={loading}
      >
        {loading ? "Creation en cours..." : "Créer un produit"}
      </button>
      {error && <p className="error">Erreur: {error.message}</p>}
    </div>
  );
}
```

## Codegen

- https://www.apollographql.com/docs/react/development-testing/static-typing

## Server-side rendering

- https://www.apollographql.com/docs/react/performance/server-side-rendering
- https://nearform.com/open-source/urql/docs/advanced/server-side-rendering/

## Caching

- https://www.apollographql.com/docs/react/caching/overview

## Optimistic UI

- https://www.apollographql.com/docs/react/performance/optimistic-ui
