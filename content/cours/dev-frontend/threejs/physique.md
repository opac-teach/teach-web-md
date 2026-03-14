# Physique

Three.js est un moteur de rendu, pas un moteur physique. Il ne gère pas nativement la gravité, les collisions ou les forces. Pour simuler de la physique, deux approches existent : la coder manuellement dans la boucle d'animation, ou déléguer à une librairie dédiée.

## Simulation manuelle dans la boucle d'animation

Pour des effets simples comme la gravité, il suffit de mettre à jour la position d'un objet à chaque frame en appliquant une accélération.

L'idée : on maintient une variable `velocity` (vitesse verticale). À chaque frame, on lui soustrait la gravité multipliée par `delta`, puis on l'ajoute à la position Y de l'objet. Quand l'objet touche le sol (Y <= 0), on arrête.

```js
const GRAVITY = 9.8; // m/s²
let velocityY = 0;   // Vitesse verticale initiale

function animate(lastRenderTime) {
  const delta = (Date.now() - lastRenderTime) / 1000;

  if (sphere.position.y > 0) {
    velocityY -= GRAVITY * delta;         // Accélération vers le bas
    sphere.position.y += velocityY * delta; // Application de la vitesse

    if (sphere.position.y < 0) {
      sphere.position.y = 0; // On s'arrête exactement au sol
      velocityY = 0;
    }
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

Cette approche fonctionne pour un cas simple, mais devient vite fastidieuse dès que l'on a plusieurs objets, des formes complexes ou des collisions entre objets.

##

# Librairies de physique

Pour aller plus loin, il existe des moteurs physiques dédiés que l'on couple à Three.js. Le principe est toujours le même : le moteur physique calcule les positions et rotations, Three.js se charge uniquement du rendu. À chaque frame, on synchronise les positions des objets Three.js avec celles calculées par le moteur.

## Cannon-es

[https://github.com/pmndrs/cannon-es](https://github.com/pmndrs/cannon-es)

**Cannon-es** est un fork maintenu de Cannon.js, écrit entièrement en JavaScript. C'est la librairie la plus simple à prendre en main pour débuter avec la physique dans Three.js.

Elle gère : gravité, forces, impulsions, collisions entre formes simples (box, sphere, plane…), friction et rebond.

```bash
npm install cannon-es
```

```js
import * as CANNON from "cannon-es";

// Monde physique
const world = new CANNON.World({ gravity: new CANNON.Vec3(0, -9.8, 0) });

// Corps physique (sphère)
const sphereBody = new CANNON.Body({
  mass: 1, // kg — 0 = statique
  shape: new CANNON.Sphere(0.5),
  position: new CANNON.Vec3(0, 10, 0),
});
world.addBody(sphereBody);

// Sol statique
const groundBody = new CANNON.Body({
  mass: 0,
  shape: new CANNON.Plane(),
});
groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
world.addBody(groundBody);

// Boucle d'animation : on synchronise Three.js avec Cannon
function animate(lastRenderTime) {
  const delta = (Date.now() - lastRenderTime) / 1000;

  world.step(1 / 60, delta); // Avance la simulation

  // Copie position et rotation du corps physique vers le mesh Three.js
  sphere.position.copy(sphereBody.position);
  sphere.quaternion.copy(sphereBody.quaternion);

  renderer.render(scene, camera);
}
```

Pour appliquer des forces ou des impulsions :

```js
// Force continue (vent, poussée...)
sphereBody.applyForce(new CANNON.Vec3(10, 0, 0), sphereBody.position);

// Impulsion instantanée (explosion, saut...)
sphereBody.applyImpulse(new CANNON.Vec3(0, 5, 0), sphereBody.position);
```

## Rapier

[https://rapier.rs/](https://rapier.rs/)

**Rapier** est un moteur physique écrit en Rust et compilé en WebAssembly. Il est beaucoup plus performant que Cannon-es, notamment pour les scènes avec de nombreux objets. Il gère aussi bien la 2D que la 3D.

```bash
npm install @dimforge/rapier3d-compat
```

```js
import RAPIER from "@dimforge/rapier3d-compat";
await RAPIER.init(); // Initialisation du module WASM

const world = new RAPIER.World({ x: 0, y: -9.8, z: 0 });

// Corps rigide dynamique
const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(0, 10, 0);
const rigidBody = world.createRigidBody(rigidBodyDesc);

// Collider (forme de collision)
const colliderDesc = RAPIER.ColliderDesc.ball(0.5);
world.createCollider(colliderDesc, rigidBody);

// Sol
const groundDesc = RAPIER.RigidBodyDesc.fixed();
const ground = world.createRigidBody(groundDesc);
world.createCollider(RAPIER.ColliderDesc.cuboid(10, 0.1, 10), ground);

function animate() {
  world.step();

  const pos = rigidBody.translation();
  sphere.position.set(pos.x, pos.y, pos.z);

  renderer.render(scene, camera);
}
```

## Ammo.js

[https://github.com/kripken/ammo.js](https://github.com/kripken/ammo.js)

**Ammo.js** est le portage de **Bullet Physics** (moteur utilisé dans de nombreux jeux AAA) vers JavaScript via Emscripten. C'est le plus complet et le plus puissant des trois, mais aussi le plus complexe à utiliser.

Il supporte des formes de collision très avancées (convex hull, triangle mesh), les véhicules, les contraintes articulaires (ragdoll, portes...) et les corps mous (soft bodies).

```js
// Initialisation du monde Bullet
const collisionConfiguration = new Ammo.btDefaultCollisionConfiguration();
const dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration);
const broadphase = new Ammo.btDbvtBroadphase();
const solver = new Ammo.btSequentialImpulseConstraintSolver();

const physicsWorld = new Ammo.btDiscreteDynamicsWorld(
  dispatcher, broadphase, solver, collisionConfiguration
);
physicsWorld.setGravity(new Ammo.btVector3(0, -9.8, 0));

// Boucle
function animate(lastRenderTime) {
  const delta = (Date.now() - lastRenderTime) / 1000;
  physicsWorld.stepSimulation(delta, 10);
  // ... synchronisation des meshes
}
```

## Comparatif

| Librairie | Langage | Performances | Complexité | Cas d'usage |
|-----------|---------|-------------|------------|-------------|
| **Cannon-es** | JavaScript | Moyenne | Faible | Prototypage, projets simples |
| **Rapier** | Rust/WASM | Élevée | Moyenne | Projets nécessitant de la performance |
| **Ammo.js** | C++/WASM | Élevée | Forte | Simulations avancées, jeux complexes |

::: info
Pour la plupart des projets étudiants, **Cannon-es** est le meilleur point de départ : son API est intuitive et sa documentation accessible.
:::
