# Intro au C++

::: info ℹ️

Avant d’entamer ce cours, il est nécessaire de bien connaitre les bases du langage C, qui ne seront pas revues ici.

Vous retrouverez les pré-requis ici:

[Langage C: Cours bases](../c-bases/langage-c.md)

[Langage C: Cours avancé](../c-avance/langage-c-avance.md)

:::

Le langage C++ est un successeur du Langage C auquel il apporte de nombreuses nouveautés qui vont permettre d’aller plus loin dans la complexité des programmes et simplifier le développement, notamment avec la **programmation objet** et la **librairie standard**.

Il n’est pas exactement un remplaçant, car le C, plus léger et bas niveau, reste à privilégier dans certains cas d’usages tels que les systèmes embarqués.

Son compilateur principal reste **gcc**, et sa syntaxe reste compatible avec celle du C, mais de nouvelles façons d’écrire du code viennent apparaitre, qui faciliteront souvent la vie du développeur et permettront le developpement de programme plus poussés.

Nous retrouverons notamment sa bibliothèque standard `std` qui nous fournira beaucoup d’outils pour aider à la gestion de la memoire, des tableaux, pointeurs etc…

Enfin son caractère **objet** sera très utile pour construire des architectures logicielles propres, modulaires et maintenables.

La documentation officielle:

https://en.cppreference.com/w/

Autre ressource de cours en français:

https://zestedesavoir.com/tutoriels/822/la-programmation-en-c-moderne

Cheat sheet:
https://cheatsheets.zip/cpp

Pour l'environnement de travail, vous pouvez suivre [la même méthode d'installation que pour le C](/cours/c-cpp/c-bases/langage-c#coder-localement)

## Utilisation du C++

### Systèmes d'exploitation et noyaux (OS & Kernels) :

- Microsoft Windows : Noyaux et composants critiques
- MacOS : Noyau Darwin
- Linux : Pilotes et composants user-space

### Compilateurs et outils de développement :

- GCC
- Clang/LLVM

### Environnements de développement intégrés (IDE) :

- Microsoft Visual Studio (pour le backend)

### Bases de données :

- MySQL
- MongoDB

### Applications de bureau complexes :

- Microsoft Office (Word, Excel, PowerPoint)
- Adobe Creative Suite : Photoshop, Illustrator, Premiere Pro, After Effects

### Intelligence Artificielle et Machine Learning :

- TensorFlow, PyTorch : Interfaces Python sur coeurs en C++
- OpenCV

### Systèmes embarqués et IoT (Internet des Objets) :

Voitures connectées, drones, appareils médicaux, microcontrôleurs

### Finance quantitative et trading haute fréquence :

Algorithmes en temps réél

### Graphismes 3D, réalité virtuelle/augmentée :

- Bibliothèques graphiques (OpenGL, Vulkan, DirectX)
- Moteurs de jeu (Unreal Engine, CryEngine)

## Librairies C++ populaires:

- Boost: Calculs mathématiques avancés, gestion des fichiers, programmation réseau, etc.
- OpenGL/DirectX pour les graphismes 3D
- Qt: Développement d'interfaces graphiques

## Compilation

Pour compiler nos programmes en C++ nous utiliserons la commande suivante:

`g++ -Wall -std=c++17 code.cpp -o executable.exe`

Décomposons:

- `g++` la version C++ de **gcc**
- `-Wall` afficher les “warnings”, avertissements sur problèmes dans le code
- `-std=c++17` pour utiliser le standard 17 de C++
- `code.cpp` notre fichier texte de code que l’on souhaite compiler
- `-o executable.exe` la sortie (output, o) de la compilation (donc l’éxécutable) s’appellera `executable.exe`

_Sous Mac/Linux, ne pas rajouter `.exe` à l’executable_

Pour executer:

`./executable.exe`

### Versions

Il existe differentes versions de C++, et par défaut **gcc** utilise le standard **17**

Les versions les plus recentes incluent toutes les modifications précedentes (17 inclut 11, qui inclut 97)

Parfois en utilisant des exemples trouvé sur internet, vous verrez que votre code ne compile plus car ces exemples utiliseront probablement du code de nouvelles versions, pour laquelle la syntaxe a changé.

Pour changer la version de C++ utilisée, rajouter `-std=c++17` pour la version `2017` par exemple (il existe `c++97` `c++11` `c++17` `c++20` `c++23`)

### Affichage dans la console

Afin de faciliter la compréhension du début du cours, nous allons voir basiquement comment afficher du texte dans la console.

Avant, en C, nous utilisitons `printf`:

```c
#include <stdio.h>

int main() {
    printf("Hello World!\n");
    int var = 5;
    printf("var: %d\n", var);
}
```

Maintenant, en C++, nous allons utiliser `std::cout`.

L’opérateur `<<` permet de concatener des elements à afficher et `std::endl` permet d'aller à la ligne.

```cpp
#include <iostream> // inclure la librairie d'entrée/sortie

int main() {
    std::cout << "Hello World!" << std::endl;
    int var = 4;
    std::cout << "var: " << var << std::endl;
    return 0;
}
```

Le fonctionnement de `std::cout` sera expliqué en détail dans la suite du cours.

## Projet de départ

Un exemple de projet C++ de base est [telechargeable ici](./assets/cpp_base_project.zip)

Vous devez avoir un compilateur et l'outil Makefile installé.

Pour compiler:

```bash
make
```

Pour lancer le programme:

```bash
make run
```
