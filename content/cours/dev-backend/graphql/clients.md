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

Apollo client propose des **hooks** pour react et permet de faire des requêtes avec `useQuery`.

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

La librairie codegen sera également très utile dans le client, car elle permettra de connaitre les types des données renvoyées par le serveur. Elle permettra également de vérifier que les requêtes utilisées sont correctes et correspondent bien au schema sur serveur.

Côté client, il lui faudra se connecter au serveur GraphQL pour analyser son schema et générer les types.

- https://www.apollographql.com/docs/react/development-testing/static-typing

## Server-side rendering

Afin d'améliorer les performances des frontend, il est recommandé de faire du SSR (Server-side rendering) côté serveur, avec l'aide de frameworks comme Next.js. Cela permettra aux utilisateurs de recevoir des pages entièrement chargées des données dès leur arrivée sur leur navigateur. Avec juste du CSR (Client-side rendering), le navigateur devra attendre que l'application soit chargé et que les données soient récupérées avant de pouvoir afficher la page.

- https://www.apollographql.com/docs/react/performance/server-side-rendering
- https://nearform.com/open-source/urql/docs/advanced/server-side-rendering/

## Caching

Les clients GraphQL possèdent généralement un cache integré, qui permet de dédupliquer les requêtes, qui peuvent être lancées par differents composants en même temps. Celui-ci aggregera differentes requetes du meme type et effectura des requetes groupées, puis redistribuera les données aux composants qui en ont besoin. Si les données sont déjà presentes dans le cache, elles ne seront pas récupérées sur le serveur.

Pour avoir des données affichées à jour, il faudra alors bien configurer ce cache et lui indiquer quand il doit être invalidé. Lors de mutations, il est possible de mettre à jour les données en cache directement en utilisant la réponse de la mutation, sans avoir besoin d'effectuer une nouvelle requete pour récupérer les données à jour.

- https://www.apollographql.com/docs/react/caching/overview

## Optimistic UI

- https://www.apollographql.com/docs/react/performance/optimistic-ui
