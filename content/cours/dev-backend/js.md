# Le JavaScript pour le developpement backend

Le JavaScript est un langage de programmation qui est très utilisé dans le développement web. Originellement créé pour les navigateurs web pour rendre les pages web dynamiques, il a beaucoup évolué et s'est modernisé pour devenir un langage puissant et complet.

Alors que les applications frontend sont principalement écrites en JavaScript, il s'est vite popularisé pour le développement backend grâce à l'utilisation de Node.js, afin de pouvoir ecrire du code commun à l'ensemble des environnements, ce qui aide à la normalisation du code et à la productivité des développeurs.

## Node.js

https://nodejs.org/en

Node.js est une plateforme logicielle libre et multiplateforme, orientée vers les applications réseau écrites en JavaScript.

Un programme en NodeJS se distingue d'un programme qui tourne dans un navigateur par son contexte d'execution:

Dans un navigateur, le JavaScript est exécuté par le moteur JavaScript du navigateur, et qui est "sandboxé" dans une page web. Celui-ci tournera dans un perimètre restreint et n'aura accès qu'au DOM et fonctionnalités offerte par le navigateur, qui sont limités pour des raisons de sécurité.

En NodeJS, notre programme n'aura plus accès aux API du navigateur, car ne tournera pas dans une page web, mais dans le système d'exploitation, et aura donc accès à des fonctionnalités de ce dernier, tel que le systeme de fichier, les processus, les réseaux, etc.

## NPM

https://www.npmjs.com/

NPM est le **gestionnaire de paquets** de NodeJS. Il permet de gérer les dépendances de nos projets NodeJS, de les installer, de les mettre à jour, de les supprimer, ainsi que de fournir des outils de build, de test, de documentation, etc.

Il est installé par défaut avec NodeJS.

De nombreuses alternatives existent, comme [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/), qui tentent de résoudre certains problèmes liés à NPM, mais NPM est toujours la référence de facto et reste très fonctionnelle.

## TypeScript

https://www.typescriptlang.org/

Typescript est un sur-ensemble de JavaScript qui ajoute des fonctionnalités de type statique, ce qui permet de détecter des erreurs en temps réel et de rendre le code plus robuste.

Il est très utilisé dans le développement backend, et est devenu un standard. Il est vivement conseillé d'utiliser TypeScript dans tout projet Javascript, car il permet de détecter des erreurs au moment de la compilation, ce qui évite des bugs de runtime.

Il nous permettra de taper du code plus **robuste** et de **prévenir des erreurs en amont**.

Il va également beaucoup aider l'IDE pour analyser le code et nous proposer des corrections, des suggestions, et aussi aider à la **refactorisation**.

> [!NOTE]
> Vous trouverez une liste d'exemples de [code TypeScript ici](https://cheatsheets.zip/typescript)

### Exemple de code TypeScript

```typescript
const name: string = "John";
const age: number = 30;
const isAdmin: boolean = true;

name = 32; // 🚨 Error: Type 'number' is not assignable to parameter of type 'string'.

interface User {
  name: string;
  age: number;
  isAdmin: boolean;
}

const user: User = {
  name: "John",
  age: 30,
  isAdmin: true,
};

// Function gets a User and returns a number
function greet(user: User): number {
  console.log(`Hello ${user.name}`);

  return user.age;
}

greet(user); // ✅ Works fine
greet({ name: "Jane" }); // 🚨 Error: Argument of type '{ name: string; }' is not assignable to parameter of type 'User'.

// Generic function
function getFirstItem<T>(items: T[]): T {
  return items[0];
}

const firstItem = getFirstItem<string>(["a", "b", "c"]); // FirstItem is of type 'string'
const firstItem2 = getFirstItem<number>([1, 2, 3]); // FirstItem2 is of type 'number'
```

## Linting

Le linting est un outil qui permet de vérifier la qualité du code. Il existe de nombreux outils de linting, mais le plus connu est ESLint.

https://eslint.org/

Le linter est un outil qui vient se rajouter au compilateur. Il viendra analyser des patterns dans le code qui peuvent potentiellement generer des problemes, meme si la syntaxe est valide et que le code compile.

### Note sur l'IA

L'IA etant devenue omnipresente et assez performante pour produire du code, il est important d'établir de hauts standards de qualité de code, afin qu'elle puisse comprendre et produire du code de la plus haute qualité possible. Utiliser typescript et des reglèes de linting strictes est une bonne façon de garantir une qualité de code élevée.
