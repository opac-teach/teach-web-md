# Three.js: 101
##

# Presentation

Three.js est un moteur 3D pour navigateur web, écrit en javascript.

Il a été conçue pour être simple à utiliser et performant, beaucoup de sites l’utilisent pour afficher des animations élégantes sur leurs pages web et des jeux vidéo.

Il exploite WebGL et le DOM, ce n’est donc utilisable que dans le contexte d’un navigateur, pas dans NodeJS.

## Supports d’information

### ThreeJS

Vous trouverez toutes les informations nécessaire à l’apprentissage et l’utilisation de cette librairie sur son site officiel:

[https://threejs.org/](https://threejs.org/)

Sur cette page, vous trouverez des exemples de sites ou elle a été utilisée.

Dans le menu de gauche, dans la partie **Learn** vous trouverez notamment:

- Des **exemples** des techniques habituelles avec le code associé
- La **documentation**, séparée en deux parties:
  - **docs** La référence de toutes les classes et méthodes de la librairie
  - **manual** Le guide complet pour aprendre à utiliser la librairie

### Introduction à la 3D par Mozilla

Mozilla a écrit un guide rapide pour apprendre les bases théoriques de la 3D:

[3D on the web](https://developer.mozilla.org/fr/docs/Games/Techniques/3D_on_the_web/Basic_theory)

##

# Getting started

Il existe différentes façons d'integrer Three.js à une page web. 

La plus simple, si vous n'avez besoin que d'afficher votre rendu ThreeJS, est d'utiliser une simple page HTML et de compiler votre programme avec [Vite](https://vite.dev/).

Si vous avez des besoins plus complexes, notamment intégrer le rendu à une page web existante, ou créer des menus ou d'autres composants 2D, vous devrez integrer le moteur dans un projet classique type Next ou Vue.

### Prérequis

Vous devez avoir installé NodeJS sur votre ordinateur.

[https://nodejs.org/fr](https://nodejs.org/fr)

## Starter-kit de base (Vite)

La solution la plus simple est d'utiliser Vite pour compiler votre programme ThreeJS.

Vous pouvez partir de ce projet de base: [boilerplate-three-vite.zip](./assets/boilerplate-three-vite.zip)

**Décompressez** cette archive dans votre ordinateur, puis ouvrez le dossier dans votre éditeur de code.

Installez les dépendances avec `npm i` et lancez le projet avec `npm start`.

Vous aurez un serveur web démarré qui rechargera automatiquement le code a chaque changement. Ouvrez votre navigateur a la page indiquée pour voir la page web.

### Composition du programme

- `index.html`: Notre fichier de base, qui est vide mais sert à charger notre script principal. Le moteur de rendu prendra tout l'espace de la page.
- `src/main.js`: Le code javascript minimal pour afficher un cube qui se déplace.

**Attention**: Plus votre programme deviendra complexe, plus il sera nécessaire de découper le programme en plusieurs fichiers, et il faudra idéalement utiliser des classes. 

## Starter-kit avec Next.js


Si vous preferez integrer Three.js dans une page web plus complexe, il est possible de l'utiliser.js avec Next.js, en utilisant les [ref de React](https://react.dev/learn/manipulating-the-dom-with-refs) pour donner l'element `canvas` à Three.js, ce qui nous permet de le placer où on le souhaite dans la page.

Vous pouvez partir de ce projet de base: 
[boilerplate-three-next.zip](./assets/boilerplate-three-next.zip)

De même, installez les dépendances avec `pnpm i` et lancez le projet avec `pnpm dev`.

### Composition du programme

- `app/page.tsx`: La page principale qui va décider de l'emplacement du rendu de notre jeu. 
- `app/three-app.tsx`: Un composent `client` qui va charger notre jeu et le placer dans le DOM de manière responsive, c'est à dire que le rendu se redimensionnera automatiquement si la fenetre du navigateur change de taille.
- `game/index.ts`: Notre moteur de jeu qui initialisera Three.js et notre scène.

