# Intro au C++

### Compilation

S’assurer que son environnement de développement fonctionne, compiler et executer le code suivant:

```cpp
#include <iostream>
#include <string>

int main()
{
    std::cout << "Hello world !" << std::endl;

    return 0;
}
```

## Entrées/Sorties

Remplacer l'utilisation de `printf` et `scanf` par `std::cout` et `std::cin`

- Créer des variables de différents types et afficher leurs valeurs dans la console avec `std::cout`
  - `int`
  - `float`
  - `char`
- Demander à l’utilisateur de rentrer des valeurs pour les affecter à ces différents types de variables avec `std::cin`

## Conteneurs

### Array

- Créer un tableau statique d’entiers avec `std::array`, et demander a l’utilisateur de remplir les valeurs pour chacun de ses elements.
- Copier ce tableau, modifier les valeurs d’un des deux tableaux et s’assurer que les deux tableaux sont bien différents.
- Créer une fonction qui prend en paramètre un tableau `std::array` et qui affiche ses valeurs. Cette fonction doit être optimisée et ne doit pas pouvoir modifier les valeurs du tableau.

### String

- Créer une chaine de caractère initialisée à `"ZDJSIJ2393D"`
- Supprimer les deux derniers caractères
- Ajouter le caractère `'Y'` à la fin
- Supprimer tous les caractères
- Ajouter le caractère `'B'`
- Afficher la chaine de caractère

### Vector

- Créer une liste dynamique de chaines de caractères avec `std::vector`.
- Ajouter quatre chaines de caractères à celle-ci
- Afficher toutes les chaines de caractères et la taille de la liste
- Supprimer la dernière chaine de caractères
- Vider toute la liste

### Itérateurs

Reprendre l'exercice precedent sur les vecteurs de chaines de caractères.

- Pour afficher la liste de chaines de caractères, utiliser des itérateurs pour parcourir la liste au lieu d’un simple `for` avec un index.

Avant de vider la liste:

- Inverser la liste
- Supprimer le deuxieme element de la liste
- Trier la liste par ordre alphabétique

## Algorithmes

### Search string

Ecrire une fonction qui prend deux chaines de caractères en entrée et retourne vrai si la première contient la deuxième (utiliser une fonction existante de la librairie standard)

### Fait maison

Réimplementer certaines fonctions fournies par la librairie standard:

- `find(iterator_debut, iterator_fin, search)`
- `count(iterator_debut, iterator_fin, search)`
- `compare(string1, string2)`

Vous pouvez vous réferer à la documentation officielle pour connaitre le fonctionnement de ces fonctions: https://en.cppreference.com/w/cpp/algorithm

## Les pointeurs

### References

Ecrire une fonction qui inverse les données de deux variables avec l’utilisation de variables passées par réference (`&`)

### Allocations

Demander à l’utilisateur une taille et allouer un tableau d’entier de cette taille avec `new` puis liberer la mémoire pour ce tableau

## Polymorphisme

### Surcharge

Créer deux fonctions `carre` qui retourneront le carré d’un nombre. L’une d’elle prendra et retournera des entiers, l’autre des nombres flottants.

### Templates

Créer une fonction générique `max` qui prendra deux variables et qui retournera la plus grande des deux. Le type de ces variables sera défini lors de l’appel de la fonction.
