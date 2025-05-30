# NextJS

https://nextjs.org/

::: info 
Il est necessaire de bien comprendre les concepts de base de React pour pouvoir utiliser correctement NextJS. 

[Consulter d'abord le cours sur React](../react/index)
:::

NextJS est un framework frontend pour React. Il permet de créer des applications web performantes avec rendu coté serveur, optimisées pour les utilisateurs et le SEO.

Il est aujourd'hui largement répandu et [les plus grandes entreprises](https://nextjs.org/showcase) utilisent NextJS pour leurs sites web (stripe, OpenAI, Nike, etc).

Créé par la même équipe que [Vercel](https://vercel.com/), il y est très bien integré et il est très facile d'y déployer des applications.


## Fonctionnalités

- Routeur integré, basé sur la structure des dossiers
- Differentes méthodes de rendu (SSR, SSG, ISR, RSC, CSR, ...)
- API serverless
- Optimisation des resources
- Optimisation du SEO

### Evolution de NextJS

NextJS a beaucoup évolué depuis sa création, notamment avec la migration depuis le "page router" vers le "app router", où la façon de s'en servir a beaucoup changé. Il est important de bien comprendre la difference entre ces méthodes et d'exploiter l'"app router" de la meilleure façon possible. 

> Attention quand on lit la documentation NextJS à la version sur laquelle on travaille.

## Structure du projet

Un projet NextJS est composé dans une structure bien définie qui determine le comportement de l'application.

https://nextjs.org/docs/app/getting-started/project-structure

### Dossiers

- app: dossier contenant les pages et les composants (app router)
- ~~pages: dossier contenant les pages et les composants (page router)~~
- public: fichiers statiques



Tous les dossiers définis dans le dossier `app` sont considérés comme des routes. L'url `monsite.com/a/b/c` sera rendue par le composant `/app/a/b/c/page.tsx`

Les routes dynamiques sont définies par des dossiers avec des crochets tel que `[id]`. Par exemple, `monsite.com/user/2134` sera rendue par le composant `/app/user/[id]/page.tsx`

- https://nextjs.org/docs/app/getting-started/layouts-and-pages
- https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

### Route files (.tsx)

Certains noms de fichiers provoquent des comportements speciaux. 

- layout.tsx: composant englobant la page
- page.tsx: page de la route définie par l'arborescende de fichiers
- route.ts: route handler (API)
- loading.tsx: composant de chargement (rendu serveur)
- not-found.tsx: composant de page non trouvée (dynamiques)
- error.tsx: composant d'erreur
- sitemap.ts: fichier de sitemap
- opengraph-image.tsx: fichier de génération d'image [OpenGraph](https://opengraph.dev/)
- favicon.ico
- ...

Sauf pour `page` et `route`, ils ont une consequence sur toutes leur sous-routes. (`layout`, `error`, `not-found`, ...)

### Variables d'environnement

https://nextjs.org/docs/app/guides/environment-variables

Les données sensibles ne doivent pas être stockées dans le code source de l'application mais dans des variables d'environnement.

Elles peuvent être définies dans le fichier `.env`, qui ne doit pas être versionné. Lors du déploiement, les variables d'environnement sont modifiables sur le dashboard de configuration de la plateforme. 

Seules les variables prefixées par `NEXT_PUBLIC_` sont accessibles côté client.

```
DATABASE_PASSWORD=abcd // Uniquement accessible côté serveur
NEXT_PUBLIC_API_URL=https://api.example.com // Accessible côté client
```

### Hydration

Lorsque NextJS est utilisé en mode server side rendering, toute la page sera generée côté serveur, pas seulement les Server Components (RSC).

Cela signifie que les composants avec la directive `use client` seront d'abord generés côté serveur, puis hydratés côté client.

L'hydration est le processus par lequel le client va prendre le contenu generé côté serveur, le transformer en composants React et les reconnecter au DOM. 

Il est très important de faire attention au rendu initial d'un composant, et de faire en sorte qu'il soit exactement le même des deux côtés, sinon une erreur d'hydration apparaitra et l'application ne fonctionnera pas correctement.

```tsx
'use client'

function MyComponent() {
    // 🚨 La valeur initiale sera differente côté serveur et côté client
    const [value, setValue] = useState(Math.random()); 
    return <div>{value}</div>
}
```

## Rendering

NextJS propose plusieurs méthodes de rendu, qui déterminent le moment où les données sont récupérés. Ces méthodes peuvent être choisies independemment au niveau des composants. 

Un rendu peut etre fait:
- Une fois au moment du build (static)
- A chaque requête, côté serveur (server side rendering)
- A chaque requête, côté client (client side rendering, static)
- A intervalle ou à la demande (incremental static regeneration)

A lire:
- https://nextjs.org/docs/app/getting-started/partial-prerendering
- https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration
- https://nextjs.org/docs/app/guides/static-exports



## A lire
Articles importants à lire sur la documentation officielle:


- [Data fetching](https://nextjs.org/docs/app/building-your-application/data-fetching/fetching)
- [Caching](https://nextjs.org/docs/app/deep-dive/caching)
- [Server actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

### En complément

- [MDX](https://nextjs.org/docs/app/guides/mdx)



