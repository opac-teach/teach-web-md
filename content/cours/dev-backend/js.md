# Le JavaScript pour le développement backend

Le JavaScript est un langage de programmation largement adopté dans le développement web. Initialement créé pour rendre les pages web interactives dans les navigateurs, il a considérablement évolué pour devenir un langage puissant et polyvalent.

Bien que le JavaScript soit principalement associé aux applications frontend, il s'est rapidement imposé dans le développement backend grâce à Node.js. Cette évolution permet aux développeurs d'utiliser un langage commun entre le frontend et le backend, favorisant ainsi la standardisation du code et augmentant la productivité des équipes.

## Node.js

https://nodejs.org/en

Node.js est une plateforme logicielle libre et multiplateforme conçue pour développer des applications réseau en JavaScript.

Un programme Node.js se distingue fondamentalement d'un programme exécuté dans un navigateur par son contexte d'exécution :

Dans un navigateur, le JavaScript est interprété par le moteur JavaScript intégré et s'exécute dans un environnement isolé (sandbox) au sein d'une page web. Ce contexte restreint limite l'accès au DOM et aux fonctionnalités proposées par le navigateur pour des raisons de sécurité.

Avec Node.js, le programme s'exécute directement dans le système d'exploitation et non dans une page web. Il peut donc accéder aux fonctionnalités du système comme le système de fichiers, les processus, les réseaux et d'autres ressources système.

## NPM

https://www.npmjs.com/

NPM (Node Package Manager) est le **gestionnaire de paquets** officiel de Node.js. Il permet de gérer efficacement les dépendances des projets, notamment leur installation, mise à jour et suppression. NPM offre également des outils pour la compilation, les tests et la documentation.

Il est automatiquement installé avec Node.js.

Plusieurs alternatives existent, comme [Yarn](https://yarnpkg.com/) ou [pnpm](https://pnpm.io/), qui visent à résoudre certaines limitations de NPM. Néanmoins, NPM reste la référence dans l'écosystème Node.js et continue d'être parfaitement fonctionnel.

## TypeScript

https://www.typescriptlang.org/

TypeScript est un sur-ensemble de JavaScript qui introduit le typage statique, permettant de détecter les erreurs pendant la phase de développement et d'améliorer la robustesse du code.

Son adoption dans le développement backend est devenue un standard. Il est fortement recommandé d'utiliser TypeScript dans tout projet JavaScript significatif, car il permet d'identifier les erreurs lors de la compilation, évitant ainsi de nombreux bugs en production.

TypeScript permet d'écrire du code plus **robuste** et de **prévenir les erreurs avant l'exécution**.

Il améliore également l'expérience de développement en facilitant l'analyse du code par l'IDE, qui peut ainsi proposer des corrections plus pertinentes, des suggestions contextuelles et des outils de **refactorisation** plus puissants.

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

Le linting est un processus d'analyse du code permettant d'en vérifier la qualité. Parmi les nombreux outils disponibles, ESLint est le plus populaire.

https://eslint.org/

Un linter est un outil complémentaire au compilateur. Il analyse les motifs dans le code qui pourraient potentiellement générer des problèmes, même si la syntaxe est valide et que le code compile correctement.

### Note sur l'IA

Avec l'omniprésence croissante de l'intelligence artificielle capable de produire du code, il devient essentiel d'établir des standards de qualité élevés. Ces standards permettent à l'IA de comprendre et de générer du code de haute qualité. L'utilisation de TypeScript combinée à des règles de linting strictes constitue une approche efficace pour garantir l'excellence du code.
