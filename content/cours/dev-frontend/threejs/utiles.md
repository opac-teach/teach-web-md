# Imports

Il est possible d'importer des ressources externes dans votre projet, tels que des modèles 3D ou textures existants.

Vous trouverez plein de modèles 3D gratuit en ligne notamment sur sketchfab:
https://sketchfab.com/3d-models/popular

## Charger des modèles

Télechargez de preference les modèles sous le format `gltf`

```jsx
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const modelLoader = new GLTFLoader();
const gltf = await modelLoader.loadAsync("./models/hovercar/scene.gltf");
scene.add(gltf.scene);
```


## Charger des textures

```jsx
const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.loadAsync("./textures/block/dirt.png");

const material = new THREE.MeshBasicMaterial({ map: texture });
```

# Notions utiles


## Skybox

La skybox permet d'afficher une image de fond dans le monde affiché pour donner une impression d'un univers (ciel, ville...) sans avoir besoin de modèles 3D.

Telécharger une image de fond au format Equirectangulaire

```jsx
const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.loadAsync("./textures/skymap.png");
texture.mapping = THREE.EquirectangularReflectionMapping;
texture.colorSpace = THREE.SRGBColorSpace;
scene.background = texture;
```

## Animation

Certains modèles 3D possèdent une animation pour les faire bouger dans le temps. Pour cela, il est necessaire d'utilier un **AnimationMixer** et de le mettre à jour à chaque frame.
```jsx
const mixer = new THREE.AnimationMixer(gltf.scene);
const clip = THREE.AnimationClip.findByName(gltf.animations, "animation.steve.walk");
const action = mixer.clipAction(clip);

// Dans la boucle d'animation
mixer.update(delta);
```

## Controls

Three.js integre differents Controls qui permettent un deplacement de la caméra selon le type de gameplay voulu.
Par exemple, **PointerLockControls** est idéal pour les jeux types FPS, **OrbitControls** pour les jeux qui necessitent un déplacement en trois dimensions.

### Pointer Lock

```jsx
import { PointerLockControls } from "three/addons/controls/PointerLockControls.js";
const controls = new PointerLockControls(camera, document.body);
document.body.addEventListener("click", function () {
  controls.lock();
});
```

## Detection d’objets

### Raycaster

Le Raycaster permet de detecter des objets se trouvant dans l’axe d’un rayon. Ce rayon part d’un point, et possède une direction.

Cela peut être très utile pour detecter des collisions ou savoir sur quel est l’objet visé par l’utilisateur par exemple.

```jsx
let raycaster = new THREE.Raycaster();

// Definir le rayon sur la position/direction de la camera
raycaster.setFromCamera( new Vector2(0, 0), camera );

// definir origine/direction manuellement
raycaster.set(origin, direction);

const intersects = raycaster.intersectObjects( objectsList, true );
```

### Intersection

Pour detecter une superposition entre deux objets, on peut utiliser des Box.

Cet objet prend la forme d’un cube, et il est très facile de determiner si il y a une intersection entre deux cubes.

Ce cube est une approximation de notre modèle mais il permet d’avoir un calcul de collision rapide.

```jsx
const boundingBox = new THREE.Box3();
boundingBox.setFromObject(object);

const boundingBox2 = new THREE.Box3();
boundingBox2.setFromObject(object2);

if(boundingBox.intersectsBox(boundingBox2)) {
  //...
}
```

## Mise a jour de la taille de fenetre

Vous remarquerez que de base, si vous redimensionnez la fenetre de votre navigateur, l'image garde la taille initiale. Si vous souhaitez que votre application se redimensionne automatiquement, vous devez surveiller les changement de taille et modifier la camera et le renderer. 

```jsx
window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
```

# Déploiement

Vous pouvez deployer votre projet sur Vercel.

Si vous utilisez un projet de base avec juste Vite:


- Creer un fichier `vite.config.js` a la racine de votre projet et inserer le code suivant dedans:

```jsx
export default {
  build: {
    target: "esnext", //browsers can handle the latest ES features
  },
};
```

- Déplacer toutes les ressources (modeles, textures…) dans un dossier appelé `public` a la racine du projet
- Tester que ces ressources fonctionnent encore en local
- Lancer la commande `npx vercel`
    - Se connecter si necessaire puis accepter les réponses par defaut a toutes les questions