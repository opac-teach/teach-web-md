# Imports

Il est possible d'importer des ressources externes dans votre projet, tels que des modèles 3D ou textures existants.

Vous trouverez plein de modèles 3D gratuit en ligne notamment sur sketchfab:
https://sketchfab.com/3d-models/popular

## Charger des modèles

Télechargez de preference les modèles sous le format `gltf`

```jsx
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const modelLoader = new GLTFLoader();
const gltf = await modelLoader.loadAsync("/assets/models/hovercar/scene.gltf");
scene.add(gltf.scene);
```


## Charger des textures

```jsx
const textureLoader = new THREE.TextureLoader();
const texture = await textureLoader.loadAsync("/assets/textures/block/dirt.png");

const material = new THREE.MeshBasicMaterial({ map: texture });
```

### Distribution des assets

Les modeles et textures sont chargés au moment de l'execution du code par le client, pas par le serveur ou par le compilateur. Il est donc necessaire que les resources soient disponibles par le navigateur. 

En general, (avec Vite et Next), vous pouvez placer les assets dans le dossier `public`, qui rendra les fichiers qui sont dedans accessibles à l'url `/`.

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

## Animation des modèles

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
Par exemple, **PointerLockControls** est idéal pour les jeux types FPS, **OrbitControls** pour pour du TPS.

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

// Detecter les collisions avec une liste d'objets
const intersects = raycaster.intersectObjects( objectsList, true ); // true indique qu'il doit aussi tester les descendants de ces objets.
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

## 2D

Il est parfois utile d'afficher des elements 2D sur votre image, comme du texte ou des images, pour faire un **HUD** par exemple. 

Pour cela, il est souvent plus simple d'utiliser directement du HTML/CSS superposé à votre `canvas`, mais certains outils existent quand meme en threejs. 
### Sprites

Les sprites sont des surfaces planes qui font **toujours** face à la caméra, il n'y a pas de projection 3D qui y sont appliqués. 
```js
const texture = new THREE.TextureLoader().load("/assets/textures/block/dirt.png");
const material = new THREE.SpriteMaterial({ map:texture });
const sprite = new THREE.Sprite(material);
sprite.position.set(0,-5,0);
```

### Texte

https://threejs.org/manual/?q=text#en/creating-text

## GUI

Vous pouvez utiliser des librairies qui vous permettent de modifier des parametres de votre programme en temps reel:

https://github.com/georgealways/lil-gui
