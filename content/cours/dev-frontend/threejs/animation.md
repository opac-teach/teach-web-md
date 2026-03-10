# Animer la scene

Pour faire évoluer notre scene, nous allons transformer nos objets présents (translation, rotation, échelle…) à notre souhait

## La boucle d’animation

La fonction `renderer.render(scene, camera);` effectue un rendu de la scène du point de vue de la caméra, mais ne le fait qu'une seule fois. Si on déplace les objets dans la scène sans rappeler cette fonction, rien ne se passera à l'écran.

Pour que notre scène affichée évolue, il va falloir appeler cette fonction pour chaque image rendue.

Il n'est pas possible d'appeler nous même cette fonction de rendu quand on le désire. Seulement le navigateur peut vous proposer de faire cela. Cela permet d'adapter la fréquence de rendu à la machine qui va executer votre programme (60 images par secondes sur la plupart des appareils), et aussi d'économiser des ressources quand c'est possible (le rendu ne sera pas effectué si l'onglet est caché par exemple). 

La fonction `setAnimationLoop` sert à indiquer quelle fonction appelée dès que le navigateur peut afficher une nouvelle image.

```js
function animate() {
  cube.position.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
```

Ici on décide de déplacer et touner le cube de 0.01 a chaque image (normalement 0.6 par seconde à 60fps).

Etant donné que nous ne connaissons pas à l'avance la frequence de rafraichissement au moment du rendu, et que cela peut évoluer, si on veut un déplacement constant il faut savoir combien de temps s'est écoulé depuis le dernier rendu. On peut faire ça manuallement en utilisant `Date.now()`, mais la fonction animate prend aussi un paramètre qui indique quand s'est effectué le dernier rendu (par rapport au demarrage de l'application).

```js
function animate(lastRenderTime) {
  const now = Date.now(); // En millisecondes
  const delta = (now - lastRenderTime) / 1000; // conversion en secondes
  cube.position.x += 1 * delta;
  cube.rotation.y += 1 * delta;
}
```

Ainsi, on peut garantir que le cube se déplacera de manière constante peut importe les fluctuations de rendu (1 par seconde)
##

# Interactivité

### Une page web avant tout

Comme vous le voyez pour le renderer, nous restons dans une page web et donc toutes les interactions que nous pouvons avoir en Javascript avec le DOM (`document`) sont toujours disponibles (evenements tels que clavier, souris, ...)

## Clavier

Vous pouvez écouter les touches du clavier appuyés par l'utilisateur en utilisant la fonction `addEventListener` du DOM


```jsx
document.addEventListener("keydown", (e) => { // touche appuyée
    switch (e.code) {
      case "KeyW": {
      // ...
        break;
      }
      case "KeyS": {
      // ...
        break;
      }
      case "KeyA": {
      // ...
        break;
      }
      case "KeyD": {
        // ...
        break;
      }
    }
  });
  
document.addEventListener("keyup", (e) => { // touche relachée
 /// ...
});
```
Retrouvez les differents codes clavier ici: [https://www.toptal.com/developers/keycode](https://www.toptal.com/developers/keycode)

## Souris

```jsx
  document.addEventListener("mousedown", (e) => { // clic appuyé
    if (e.button == 0) { // clic gauche
     
    } else if (e.button == 2) { // click droit
    
    }
  });
  
  document.addEventListener("wheel", (e) => { // molette
    if (e.wheelDelta > 0) {
      
    } else if (e.wheelDelta < 0) {
      
    }
  });
```

## Gamepad

Il est possible d'utiliser des manettes de jeu avec l'API GamePad.

La documentation est disponible ici: https://developer.mozilla.org/fr/docs/Web/API/Gamepad_API/Using_the_Gamepad_API

A l'inverse du clavier et de la souris, il n'est pas possible de déclencher un évenement lors d'un appui sur une touche, nous devons alors manuellement faire du polling pour lire l'état de la manette. 

```js
function poll() {
    const gamepads = navigator.getGamepads();
    for(const gamepad of gamepads) {
        console.log(gamepad.axes);
        console.log(gamepad.buttons);
    }
}
```
