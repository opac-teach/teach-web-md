# Les langages de programmation

## Le Javascript

Javascript ayant été le premier language de programmation a être intégré dans un navigateur web, il est depuis resté le principal language pour developper des application web, et ce tout au long de la chaine (pages web, serveurs, outils, …)

Cela a grandement facilité le développement d’applications car ça a permis d’utiliser le même language sur une grande partie de la stack, permettant d’améliorer la qualité du code et la reutilisabilité.

### Typescript

Il est important de savoir que le Javascript a beaucoup évolué depuis sa création. Il a été amélioré au fur et a mesure du temps pour se moderniser et améliorer la qualité de code et l’experience développeur. Il n’est donc pas rare de trouver des exemples de code avec des anciennes pratiques qu’il ne faut plus reproduire.

Un des gros défauts de Javascript en tant que language de programmation est qu’il n’est pas typé: Il n’est pas nécessaire déclarer le type des variables et celui ci peut changer au cours de l’execution. Cela rend le language beaucoup plus simple à apprendre et à écrire, mais le rend très peu résiliant.

Afin de palier ce manque, le language Typescript a été inventée pour améliorer la robustesse des programmes Javascript. Il est à noter que Typescript est un langage intermediaire et n’est pas directement executé. Un code en Typescript est d’abord _transpilé_ en Javascript puis executé.

Le fait d’écrire un programme en typescript permet de pré-valider que notre logique est correcte au moment du développement, mais à l’execution, rien ne garanti que les variables manipulées sont bien du type attendu (requetes API, librairies externes…)

Cela permet tout de même d’améliorer grandement la fiabilité des programmes, car la plupart des bugs peuvent être détectés avant même l’execution du code, et nécessite moins de verifier que l’application fonctionne correctement à l’execution, à condition d’être rigoureux sur la définition des types et des variables.

Voici un example du meme code en Javascript et en Typescript:

```jsx
function calculate_average(values) {
    return values.reduce((s, v) => s+v, 0) / values.length;
}

// Intended to be used with numbers
const numbers = [10, 20, 30]
console.log(calculate_average(numbers)) // ✅ Works fine: 20.0

// But what if we accidentally pass strings?
const object = { n1: 10, n2, 20 }
console.log(calculate_average(object)) // 🚨 Runtime error: unknown property 'reduce'
```

```tsx
function calculate_average(values: Array<number>) {
    return values.reduce((s, v) => s+v, 0) / values.length;
}

const numbers = [10, 20, 30]
console.log(calculate_average(numbers)) // ✅ Works fine: 20.0

const object = { n1: 10, n2, 20 }
console.log(calculate_average(object)) // 🚨 Compilation error: expected Array<number>
```

## Qualité de code

**eslint**

Afin de réduire au maximum les erreurs de code, on va utiliser des outils de verification automatique de qualité de code, en temps réel dans l’IDE et aussi juste avant l’execution des tests. Ceux-ci possèdent une liste de règles qui doivent être respectées et pointeront vers les bouts de code qui “sentent mauvais”.

Les retours de linting ne sont pas des erreurs de compilation: techniquement cela n’empêche pas le code de compiler et de s’executer, mais informe qu’il y aura certainement eu des problèmes à l’execution.

## Note sur l’IA

Les IA génératives sont aujourd’hui suffisamment performantes pour produire du code fonctionnel de grande qualité. Cependant, afin de les faire générer du code de la meilleure qualité possible, il est indispensable de leur fournir le maximum d’informations, notamment, leur un typage et des règles strictes.

> **Plus un langage est fortement typé, meilleure sera la qualité de code produite par une IA**

Le fait que le compilateur donne des erreurs précises sur les problèmes rencontrés vont aider l’IA a produire un code de qualité optimale, et réduire les hallucinations.

<aside>
⚠️

> Poussez au maximum les exigences en terme de qualité de code (typage, linting, tests…), car cela ne ralentit plus la productivité aujourd’hui grâce à l’IA

</aside>

# Outils de développement

Afin de nous aider dans le développement d’application, il existe une multitude d’outils qui vont nous faciliter le travail, de la création à la maintenance de celle ci, tel que la gestion des librairies externes, compilation, serveur de développement, hot-reload, minification,

> Historiquement, la plupart de ces outils ont été codés en JavaScript pour garder une cohérence avec le code de l’app, mais une transition vers des langages plus rapides est en train de se faire et la plupart des outils sont en train d’être portés en Rust pour une expérience de développement (DX) plus fluide. (turbopack, swc,…)

La dépendance principale de tout projet web sera NodeJS https://nodejs.org/.

## Gestionnaires de paquets

### NPM (Node Package Manager)

- Gestionnaire de paquets par défaut pour Node.js
- Permet d'installer et gérer les dépendances d'un projet
- Utilise le fichier `package.json` pour décrire le projet et ses dépendances
- Commandes essentielles :
  ```bash
  npm init         # Initialiser un nouveau projet
  npm install      # Installer les dépendances
  npm run SCRIPT        # Exécuter des scripts
  ```

**Alternatives**

npm a été à un moment critiqué pour ses faiblesses (performances, fiabilité, fonctionnalités…) et de nombreuses alternatives ont étés créées, telles que yarn, pnpm, …

Leur fonctionnement est relativement similaire et les paquets restent compatible avec npm, et il est possible de passer d’un gestionnaire à un autre si besoin (nécessitant que de legeres modifications)

npm a évolué pour rattraper son retard et reste géneralement suffisant pour la plupart des projets

**Le package.json**

Voici un exemple détaillé d'un fichier `package.json` typique pour un projet frontend moderne :

```json
{
  "name": "mon-projet-frontend",
  "version": "1.0.0",
  "description": "Une application web moderne utilisant Vue.js",
  "author": "John Doe <john.doe@example.com>",
  "private": true,
  "license": "MIT",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "test": "jest",
    "lint": "eslint --ext .js,.vue src"
  },
  "dependencies": {
    "vue": "^3.3.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^4.2.0"
  },
  "engines": {
    "node": ">=16.0.0",
    "npm": ">=8.0.0"
  },
  "browserslist": ["> 1%", "last 2 versions", "not dead"]
}
```

Ce fichier va définir:

- Les informations générales (name, description, version…)
- Des contraintes de version (engine, browserslist)
- Des scripts (start, test, …) qui serviront régulièrement au développement de l’application
- Des dépendances (paquets) dont l’application a besoin, avec leur version (dev dependencies → uniquement pour le développement, inutiles pour lancer l’application en production)

## Les outils de build

### Vite

- Outil de build moderne et ultra-rapide
- A privilegier, plus simple et rapidement configurable pour les outils modernes
- Développé par l'équipe Vue.js
- Avantages :
  - Démarrage instantané
  - Rechargement à chaud très rapide
  - Configuration simple
  - Support natif des modules ES
- Particulièrement adapté aux frameworks modernes (Vue, React, Svelte)

### Webpack

- Bundler le plus populaire et mature
- Necessite du boilerplate code
- Fonctionnalités principales :
  - Regroupement des fichiers (bundling)
  - Minification du code
  - Gestion des assets (images, styles, etc.)
  - Hot Module Replacement (HMR)
- Configuration plus complexe mais très flexible

## Les outils de test

### Jest

- Framework de test JavaScript complet
- Utilisé pour les tests unitaires (tester des morceaux de codes indépendamment
- Caractéristiques :
  - Tests isolés et parallélisés
  - Couverture de code intégrée
  - Mock et simulation faciles

```jsx
test("addition de 2 nombres", () => {
  expect(1 + 2).toBe(3);
});
```

### Cypress

- Outil de test end-to-end (E2E) moderne
- Permet de tester l'application comme un utilisateur réel, lance l’application dans un navigateur virtuel plutôt que d’executer uniquement des bouts de code
- Avantages :
  - Interface visuelle intuitive
  - Tests en temps réel dans le navigateur
  - Debugging facile
  - Capture d'écran et vidéos automatiques

```jsx
describe('Page d'accueil', () => {
  it('charge correctement', () => {
    cy.visit('/')
    cy.get('h1').should('be.visible')
  })
})
```

# Les frameworks et bibliothèques modernes

## Pourquoi utiliser un framework ?

**Avantages**

- **Productivité accrue**
  - Réutilisation de composants
  - Structures et patterns préétablis
  - Nombreuses fonctionnalités prêtes à l'emploi
- **Maintenance facilitée**
  - Architecture standardisée
  - Code organisé et cohérent
  - Documentation extensive
- **Performance optimisée**
  - Mécanismes d'optimisation intégrés
  - Gestion efficace du DOM
  - Outils de développement dédiés

**Inconvénients**

- Courbe d'apprentissage initiale
- Surcharge potentielle pour les petits projets
- Dépendance à l'écosystème du framework

## Panorama des frameworks populaires

### Vue.js

- **Caractéristiques principales**
  - Framework progressif
  - Facile à intégrer dans des projets existants
  - Syntaxe intuitive et claire (HTML et JS classiques)
  - Excellente documentation en plusieurs langues
- **Points forts**
  - Courbe d'apprentissage douce
  - Performance élevée
  - Flexibilité d'utilisation
  - Écosystème bien structuré (Pinia, Vue Router)
  - Stabilité dans l’utilisation

```html
<template>
  <div class="counter">
    <h2>Vue Counter</h2>
    <p>Count: {{ count }}</p>
    <button @click="count++">Increment</button>
    <button @click="count--">Decrement</button>
  </div>
</template>

<script>
  const count = ref(0);
</script>
```

### React

- **Caractéristiques principales**
  - Développé et maintenu par Facebook
  - Basé sur les composants
  - Utilisation intensive du JSX
- **Points forts**
  - Énorme écosystème
  - Grande communauté
  - Nombreuses opportunités professionnelles
  - Excellent pour les grandes applications
- **Points faibles**
  - Syntaxe JSX spécifique à react
  - Evolution rapide des techniques

```tsx
import { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="counter">
      <h2>React Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
    </div>
  );
}

export default Counter;
```

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
const element = React.createElement(
  "h1",
  { className: "greeting" },
  "Hello, world!"
);
```

### Svelte

- **Caractéristiques principales**
  - Approche compilée
  - Pas de Virtual DOM
  - Code plus léger
- **Points forts**
  - Performance exceptionnelle
  - Bundle final très léger
  - Réactivité native

```html
<script>
  let count = 0;
</script>

<div class="counter">
  <h2>Svelte Counter</h2>
  <p>Count: {count}</p>
  <button on:click={() => count++}>Increment</button>
  <button on:click={() => count--}>Decrement</button>
</div>
```

### HTMX

- **Caractéristiques principales**
  - Approche minimaliste
  - Extension des capacités HTML
  - Pas de reactivité
  - Pas de JavaScript complexe
  - Principalement pour le rendu coté serveur avec un moteur de template
- **Points forts**
  - Simplicité d'utilisation
  - Intégration facile
  - Performances natives du navigateur
  - Excellent pour les applications CRUD simples

```html
<!-- HTML -->
<div class="counter" id="root">
  <h2>HTMX Counter</h2>
  <p>Count: <span id="count-value">0</span></p>
  <button
    hx-post="/increment"
    hx-trigger="click"
    hx-target="#count-value"
    hx-swap="innerHTML"
  >
    Increment
  </button>
  <button
    hx-post="/page_2"
    hx-trigger="click"
    hx-target="#root"
    hx-swap="innerHTML"
  >
    Go to page
  </button>
</div>
```

```python
from flask import Flask

app = Flask(__name__)
count = 0

@app.route('/increment', methods=['POST'])
def increment():
    global count
    count += 1
    return str(count)

@app.route('/page_2', methods=['POST'])
def page_2():
    return f"""
    <div>
	    <h1>Page 2</h1>
	    <p>Counter: {counter}</p>
	  </div>
	  """
```

### Astro

Astro est un framework permettant principalement d’exporter des sites statiques (SSG)

On peut l’utiliser avec differents framework comme React ou Vue, et il est plus efficace que Next ou Nuxt pour charger du contenu statique (Markdown, headless CMC) et rendre des sites statiques extremement performants. Le rendu n’est plus une SPA.
