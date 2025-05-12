# NextJS

https://nextjs.org/

::: info 
Il est necessaire de bien comprendre les concepts de base de React pour pouvoir utiliser correctement NextJS. 

[Consulter d'abord le cours sur React](../react)
:::

NextJS est un framework frontend pour React. Il permet de créer des applications web performantes avec rendu coté serveur, optimisées pour les utilisateurs et le SEO.

Il est aujourd'hui largement répandu et [les plus grandes entreprises](https://nextjs.org/showcase) utilisent NextJS pour leurs sites web (stripe, OpenAI, Nike, etc).

Créé par la même équipe que [Vercel](https://vercel.com/), il y est très bien integré et il est très facile d'y déployer des applications.


## Fonctionnalités

- Routeur integré, basé sur la structure des dossiers
- Rendu coté serveur (SSR)
- Rendu statique (SSG)
- Incremental Static Regeneration (ISR)
- Rendu côté client (CSR)
- API serverless
- Server actions
- Optimisation des resources
- Optimisation du SEO

### Evolution de NextJS

NextJS a beaucoup évolué depuis sa création, notamment avec la migration depuis le "page router" vers le "app router", où la façon de s'en servir a beaucoup changé. Il est important de bien comprendre la difference entre ces méthodes et d'exploiter l'"app router" de la meilleure façon possible. 

> Attention quand on lit la documentation NextJS à la version sur laquelle on travaille.

https://nextjs.org/docs/app/building-your-application/rendering
https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

https://nextjs.org/docs/app/building-your-application/data-fetching/fetching
https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations
https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration

https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming

https://nextjs.org/docs/app/guides/mdx

finalité de react: render
https://github.com/facebook/create-react-app/blob/main/packages/cra-template/template/src/index.js

# MISC


### Variables d'environnement

https://nextjs.org/docs/app/guides/environment-variables

Les données sensibles ne doivent pas être stockées dans le code source de l'application. Elles doivent être stockées dans des variables d'environnement.

Elles peuvent être définies dans le fichier `.env`, qui ne doit pas être versionné. Lors du déploiement, les variables d'environnement sont modifiables sur le dashboard de configuration. 

Seules les variables prefixées par `NEXT_PUBLIC_` sont accessibles côté client.

```
DATABASE_PASSWORD=abcd // Uniquement accessible côté serveur
NEXT_PUBLIC_API_URL=https://api.example.com // Accessible côté client
```

### Exports statiques

https://nextjs.org/docs/app/guides/static-exports

Il est possible de générer une version statique de l'application, qui ne necessite donc pas de serveur pour être hebergée et peut être placée simplement sur un CDN. Dans ce cas, les server component seront generés au moment du build, et ne seront pas mis à jour

### Auth

https://nextjs.org/docs/app/getting-started/project-structure

https://nextjs.org/docs/app/getting-started/layouts-and-pages

https://nextjs.org/docs/app/guides/authentication


OpenGraph
https://opengraph.dev/

## Structure du projet

https://nextjs.org/docs/app/getting-started/project-structure

### Dossiers

- app: dossier contenant les pages et les composants (app router)
- ~~pages: dossier contenant les pages et les composants (page router)~~
- public: fichiers statiques

Tous les dossiers définis dans le dossier `app` sont considérés comme des routes. L'url `monsite.com/a/b/c` sera rendue par le composant `/app/a/b/c/page.tsx`

les routes dynamiques sont définies par des dossiers avec des crochets tel que `[id]`. Par exemple, `monsite.com/user/2134` sera rendue par le composant `/app/user/[id]/page.tsx`

### Route files (.tsx)

Certains noms de fichiers provoquent des comportements speciaux. Sauf pour `page`, ils ont une consequence sur toutes leur sous-routes.

- layout: composant englobant la page
- page: page de la route définie par l'arborescende de fichiers
- loading: composant de chargement (rendu serveur)
- not-found: composant de page non trouvée (dynamiques)
- error
- sitemap
- opengraph-image
- favicon
- ...