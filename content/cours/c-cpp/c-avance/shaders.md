# Shaders

##

# Qu’est-ce qu’un shader ?

Un pixel shader, également connu sous le nom de fragment shader, est un type de programme utilisé dans les systèmes de rendu graphique pour déterminer les propriétés visuelles de chaque pixel à l'écran. Il s'agit d'un composant clé du pipeline de rendu 3D moderne, qui fonctionne au sein des unités de traitement graphique (GPU).

Voici quelques points clés sur les pixel shaders :

1. **Personnalisation de l'image**: Les pixel shaders permettent aux développeurs de définir comment les pixels doivent être colorés et traités sur la base de divers facteurs, tels que l'éclairage, la couleur de la texture, et les données de profondeur.
2. **Programmabilité**: Contrairement aux anciennes méthodes de rendu, les pixel shaders sont programmables, ce qui signifie que les développeurs peuvent écrire des shaders dans des langages de haut niveau comme HLSL (High-Level Shader Language) pour DirectX ou GLSL (OpenGL Shading Language) pour OpenGL.
3. **Effets visuels**: Ils sont utilisés pour créer des effets visuels complexes tels que les reflets, les ombres douces, l'anticrénelage, le brouillard, les effets de lumière volumétrique, la transparence, et bien plus encore.
4. **Exécution parallèle**: Les shaders sont exécutés en parallèle sur le GPU, ce qui permet de traiter efficacement de nombreux pixels simultanément, offrant ainsi des performances élevées pour les graphiques en temps réel.
5. **Interaction avec d'autres shaders**: Les pixel shaders travaillent souvent en tandem avec d'autres types de shaders, comme les vertex shaders, qui déterminent la position et d'autres attributs des sommets dans une scène 3D, et les geometry shaders, qui peuvent générer ou modifier des géométries.
6. **Version et compatibilité**: Les capacités des pixel shaders ont évolué au fil des générations de matériel graphique, avec des versions plus récentes supportant des fonctionnalités plus avancées. Les développeurs doivent souvent tenir compte des capacités du matériel cible lors de l'écriture de shaders.
7. **Rendu non graphique**: Bien que leur fonction principale soit le rendu graphique, les pixel shaders peuvent également être détournés pour effectuer des calculs généraux (GPGPU), tels que ceux utilisés dans le traitement d'images ou la simulation physique.

En résumé, les pixel shaders sont essentiels pour la création d'images de synthèse réalistes et attrayantes dans les jeux vidéo, les simulations, et d'autres applications graphiques interactives. Ils offrent aux développeurs la flexibilité nécessaire pour créer une grande variété d'effets visuels et améliorer l'immersion visuelle dans les environnements numériques.

Les moteurs d’inférence en **intelligence artificielle** n’utilisent pas les shaders pour leur calculs, mais utilisent la meme infrastructure matérielle via des librairies comme **CUDA** afin de paralléliser les calculs de matrices et de vecteurs des réseaux neuronaux.

# Librairies et compatibilité

Les programmes de calcul graphique existent sous différentes formes, différentes syntaxes et différentes méthodes d’execution.

Ils different par leur syntaxe et par les librairies et materiel supporté. Les programmes codés avec DirectX pour NVIDIA ne seront pas compatibles avec les cartes AMD ou Linux par exemple. Avec OpenGL, on sera compatible sur les cartes AMD et NVIDIA, sous windows et linux, mais pas sous MacOS…

Il en est de même pour les shaders.

### WebGL

Les moteurs web des navigateurs intègrent maintenant **WebGL**, qui permet, avec une syntaxe unifiée, de créer des programmes graphiques compatibles sous toutes les plateformes qui possède les capacités nécessaires.

Cela veut dire qu’avec un seul code, on pourra afficher des graphismes sous Windows, Mac, Linux, iOS, Android tant qu’il y a suffisamment de puissance de calcul.

WebGL supporte l’utilisation des shaders.

### ShaderToy

ShaderToy est un site web qui permet de créer, tester, et exposer des shaders avec WebGL

https://www.shadertoy.com/

On peut voir les shaders réalisés par les membres du site, le code qui y est associé, et on peut les modifiers pour en créer de nouveaux.

> Quand on modifie le code, on peut cliquer sur le bouton “play” en bas de l’éditeur de code pour compiler et executer notre code.

# Exemples

Voici quelques exemples:

https://www.shadertoy.com/view/XcXXzS

https://www.shadertoy.com/view/McsSRB

https://www.shadertoy.com/view/mtyGWy

https://www.shadertoy.com/view/ddcGW8

https://www.shadertoy.com/view/XsX3z8

# Comment fonctionne un fragment shader de base

Un fragment shader est donc un petit bout de programme qui va être exécuté, en parallèle, par la carte graphique, pour chacun des pixels de l’espace de rendu.

Son role va être de déterminer la couleur du pixel auquel il est attribué.

### Données en entrée

- La coordonnée du pixel attribué
- La résolution de l’espace de rendu
- Différentes variables de contexte:
  - Textures
  - Temps écoulé
  - Données personnalisées injecté par le programme…

### Données en sortie

- Couleur du pixel

Une fois que tous les fragment shader sont executés, le programme connait la couleur de tous les pixels, et ils sont alors affichés à l’écran.

# Informations utiles

### Couleurs

Une couleur est représentée par 3 valeurs: **Rouge**, **Vert**, **Bleu**

### Vecteurs

Un vecteur est une liste de valeurs du même type.

Ils sont utilisés pour stocker des données multidimensionnelles, telles que:

- des **coordonnées** (x, y → 2 dimensions)
- des **couleurs** (r, g, b → 3 dimensions)

En C, c’est représenté par un tableau:

```c
int vecteur2Dimension[2] = { 1, 2 }
int vecteur3Dimension[3] = { 1, 2, 3 }
```

# Spécificités de langage

::: info ⚠️

Veuillez noter qu’à partir d’ici, nous aborderons la syntaxe et les outils disponibles dans ShaderToy. Celle ci sera différente dans d’autres environnements.

CheatSheet de la syntaxe utilisée:
https://gist.github.com/markknol/d06c0167c75ab5c6720fe9083e4319e1

:::

ShaderToy est basé sur la technologie **OpenGL GLSL ES**

Le langage de shader que nous allons voir est un _subset_ du langage C.

Si vous connaissez le C, vous connaitrez déjà ce langage. Seulement certaines choses ont été enlevées pour des raisons d’optimisations. D’autres choses ont été ajoutées pour aider au developpement.

Vous devrez en apprendre les spécificités pour s’en servir.

## Pointeurs

**On ne peut pas utiliser les pointeurs et references dans les shaders** ! C’est complétement désactivé.

## Valeurs et types

### Couleurs

Les couleurs seront representées par des variables de type `float`, pour des valeurs allant de 0 à 1.

```c
float r = 0.5;
float g = 0.; // attention, ne pas oublier le '.' pour signifier que c'est un float !
float b = 0.5;
// -> Magenta

{ O., 0., 0. } // -> noir
{ 1., 1., 1. } // -> blanc
```

### Coordonnées

Les coordonnées représentent la position d’un pixel à l’écran, et sont également représentées par des `float`. Valeurs entre 0 et la largeur/longueur de l’espace de travail.

## Structures de données

Afin de faciliter le développement, différentes structure de données pré-existantes ont été définie, avec des fonctions utilitaires qui vont avec.

### Vecteurs

Différentes structures ont été définies pour différentes tailles de vecteurs: `vec2`, `vec3`, `vec4`, … de type `float`

On accede aux valeurs contenues par `.x .y .z` ou `.r .g .b .a` , ces deux ensembles contiennent les mêmes valeurs et sont juste des raccourcis.

Des fonctions et opérations sont disponible et similaires pour chacun d’eux.

```c
struct vec3 {
	float x;
	float y;
	float z;
	float r;   // = x
	float g;   // = y
	float b;   // = z
}

vec3 vec3(float x, float, y, float z); // Creer un vecteur
vec3 rgb = vec3(0.5, 0.5, 0.);

vec3 vec4(vec3, float w);    // Créer un vecteur de dimensions plus elevée
vec4 rgba = vec4(rgb, 1.);

vec3 vec4(float xyz);    // Creer un vecteur avec toutes les dimensions égales
vec3 r = vec3(1.);

// Opérations

rgb = rgb * 2.; // Multiplication de toutes les valeurs
// Equivalent à
rgb.r = rgb.x * 2.;
rgb.g = rgb.y * 2.;
rgb.b = rgb.z * 2.;
```

Remarque: la 4° composante sur vec4 est nommée .w ou .a

## Variables disponibles

- `vec2 fragCoord`
  - Coordonnées du pixel en cours de traitement (x, y)
- `vec3 iResolution`
  - Résolution de l’espace de travail (x, y)
  - z représente l’aspect ratio
- `float iTime`
  - Temps actuel en millisecondes
- `vec4 iMouse`
  - Coordonnées de la souris en x et y
  - z,w → clicked
- `sampler2D iChannel0..3`
  - Textures fournies par l’utilisateur

## Variables à retourner

Le seul objectif indispensable est de définir la couleur de notre pixel, qui est stockée dans la variable `vec4 fragColor`

Celle ci est un vecteur de 4 dimensions, pour R,G,B,A

A représente l’alpha et n’est pas utilisé, il est conseillé de le définir à 1.

```c
fragColor = vec4(0.5, 0., 0.5, 1.);
```

## Fonctions

- `float length(vecX)`: Retourne la norme d’un vecteur (pythagore)
- `float cos(float)` : retourne le cosinus d’un angle
- `float mod(float, float)` : modulo avec nombre decimaux
- `float min/max(float, float)` : minimum ou maximum entre deux nombres
- `float clamp(float x, float min, float max)`: retourne x bornée entre min et max
- `float smoothStep(float min, float max, float x)` : “normalise” x entre 0 et 1 selon sa position entre min et max

### Exemple

```c
void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    vec3 color = vec3(1., 0., 0.); // rouge

    // retourne la valeur
    fragColor = vec4(color,1.0);
}
// Toute l'image sera rouge
```

## Exercices d’entrainement

### Gradient de rouge

Ecrire un shader qui affiche un gradient entre le noir et le rouge de gauche à droite

- Correction

  ```c
  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      // Coordonnées normalisées (entre 0 et 1)
      vec2 uv = fragCoord/iResolution.xy;

      vec3 color = vec3(uv.x, 0., 0.);

      // Definition de la couleur de sortie
      fragColor = vec4(color,1.0);
  }
  ```

### Transition rouge/vert

Ecrire un shader qui affiche affiche une couleur unie qui alterne lentement entre le rouge et le vert

- Correction

  ```c
  void mainImage( out vec4 fragColor, in vec2 fragCoord )
  {
      // Coordonnées normalisées (entre 0 et 1)
      vec2 uv = fragCoord/iResolution.xy;

      vec3 color = vec3(uv.x, 0., 0.);

      // Definition de la couleur de sortie
      fragColor = vec4(color,1.0);
  }
  ```

### Gradient circulaire

Ecrire un shader qui affiche affiche un gradient circulaire en partant du milieu

Indice: `length`

- Correction

Avec la webcam:

Inverser les couleurs

Inverser l’image

Déplacer l’image avec repetition sur les bords (indice: `cos(iTime)`)

## Liens utiles

https://www.shadertoy.com/

https://graphtoy.com/

[https://www.khronos.org/opengl/wiki/Data*Type*(GLSL)#Basic_types](<https://www.khronos.org/opengl/wiki/Data_Type_(GLSL)#Basic_types>)

https://thebookofshaders.com/

https://www.youtube.com/watch?v=f4s1h2YETNY

https://shadeup.dev/
