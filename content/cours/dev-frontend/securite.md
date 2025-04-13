# La sécurité sur le frontend

Bien que les données doivent principalement être sécurisé coté backend, le frontend a lui aussi un rôle a jouer en matière de sécurité.

Le risque principal pour une application frontend est qu'un acteur malveillant puisse injecter du code JavaScript dans la page web pour modifier son comportement et en extraire des données notamment d'authentification.

> Ces informations sont très sommaires et données à titre d'exemple.
> Il est recommandé de lire des articles plus complets sur le sujet pour bien proteger une application.

## XSS

Les attaques de cross-site scripting (XSS) sont des attaques de type injection de code. Elles permettent d'injecter du code JavaScript dans une page web et d'executer du code malveillant.

Pour s'en proteger, l'application doit filtrer les entrées des utilisateurs et ne pas executer du code HTML/JavaScript provenant d'une origine non fiable.

Le serveur web doit aussi définir les origines des resources externes autorisées.

## CORS

Le CORS est un mécanisme de sécurité qui permet de limiter les risques de XSS, en limitant les origines qui peuvent accéder à une ressource.

### Fonctionnement

Le serveur doit définir quelles origines sont autorisées à accéder à ses ressources.

Lorsqu'une page web essaie d'acceder à une ressource (appel API par exemple), le navigateur verifiera si l'origine de la page est autorisée à accéder à la ressource.

```
Access-Control-Allow-Origin: my-app.com
```

Le CORS n'empeche pas d'acceder à la ressource en soi, mais les règles du navigateur vont interdire l'accès à la ressource si l'origine n'est pas autorisée.

### En developpement

Lorsqu'on développe localement une application, on aura souvent le frontend et le backend sur des origines (port) différentes, il est fastidieux de définir correctement les origines autorisées, et on activera souvent le CORS pour toutes les origines.

```
Access-Control-Allow-Origin: *
```

```js
// express.js
app.use(
  cors({
    origin: "*",
  })
);
```

### Exemple d'attaque

#### Scenario 1

Imaginons une application web avec authentification par cookie.

- Les utilisateurs peuvent commenter des articles
- Le contenu des commentaires est directement affiché sur la page web comme du HTML et peut donc contenir du code JavaScript
- Un utilisateur malveillant peut injecter du code dans un commentaire qui va:
  - Récupérer les cookies de l'utilisateur
  - Les envoyer à un serveur malveillant

S'être protegé de ce genre d'attaque signifie:

- Ne pas interpreter les entrées des utilisateurs en tant que code potentiellement executable
- Avoir défini sur le serveur web les origines des resources externes autorisées

#### Scenario 2

Imaginons une application web malveillante qu'un utilisateur ouvre par mégarde

- L'application fait appel à une application tierce non protegée sur lequel l'utilisateur est authentifié personnellement, et va récuperer des données de cet utilisateur sur cette application

S'être protegé de ce genre d'attaque signifie:

- Le serveur tiers défini les origines autorisées dans ses headers CORS
- Le navigateur détéctera que le site malveillant n'est pas autorisé à acceder à la ressource et refusera l'accès
