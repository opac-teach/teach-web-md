# Server Components

Depuis la version 18, React propose une nouvelle approche pour le rendu des composants : les Server Components (**RSC**).

https://react.dev/reference/rsc/server-components

Cette approche permet de rendre des composants directement sur le serveur, ce qui permet de gagner en performance et de réduire la quantité de code JavaScript à envoyer au client. Cette technique a initialement été portée par NextJS, mais qui a maintenant été integrée diretement dans React. 

## Comment ça marche ?

Désormais, tout composant React est **par défaut** un Server Component.

Cela signifie que le rendu (html) sera generé au moment du build de l'application, ou bien a chaque fois que l'utilisateur chargera la page, par le serveur, au choix. Ce que recevra le client sera quasiment uniquement du HTML et CSS, et n'aura pas besoin d'executer React pour afficher ce composant, ce qui augmente les performances significativement. 

### Data fetching

Avant les server component, il était habituel de récupérér les données côté client, via des appels API principalement. Cela signifie un temps de chargement plus long de la page, avec plusieurs allers retours entre le client et le serveur, des loaders, etc.

```tsx
'use client'
function Component({id}) {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`/api/data`).then(data => {
      setData(data);
    });
  }, [id]);
  
  return (
    <div>
      <p>{data ? data.message : "Loading..."}</p>
    </div>
  );
}
```

Désormais, les données peuvent être récupérée directement par le serveur lui-meme, qui est plus proche de la base de données, et donc plus rapide, et le client recevra la page déjà remplies des données:

```tsx
async function Component({id}) {
  const data = await fetch(`/api/data`);
  return (
    <div>
      <p>{data}</p>
    </div>
  );
}
```


La contrepartie est que les server component **ne sont pas interactifs**: Il n'est plus possible d'utiliser des hooks tels que useState pour rendre le composant dynamique. En effet, ils sont rendus côté serveur une fois, et ne peuvent pas être modifiés ensuite.

```tsx
export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false); // 🚨 pas possible
  return (
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
  )
}
```
## Client components

Il est evidemment encore possible de créer des composants interactifs, qui seront rendus côté client. Pour ce faire, il faut utiliser le mot-clé `use client` devant le composant. 

```tsx
'use client' // <----
export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false); // ✅ ok
  return (
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
  )
}
```

Pour obtenir le meilleur des deux mondes, on peut utiliser les `Client Components` dans les `Server Components`.

```tsx
async function Component({id}) {
  const data = await fetch(`/api/data`);
  return (
    <div>
      <Expandable>{data}</Expandable>
    </div>
  );
}
```


```tsx
'use client'
export default function Expandable({children}) {
  const [expanded, setExpanded] = useState(false);
  return (
      <button
        onClick={() => setExpanded(!expanded)}
      >
        Toggle
      </button>
      {expanded && children}
  )
}
```

::: warning

Attention: tous les composants héritant d'un `Client Component` deviennent automatiquement des client components eux même. Pour palier ce problème, [il faut passer les composants](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#interleaving-server-and-client-components) en tant que `children` ou en props. 

:::
