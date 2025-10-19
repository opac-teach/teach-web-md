# Remise à niveau en C

## C

Pour les élèves souhaitant se remettre à niveau en C, vous pouvez faire les exercices de C

- [Exercices C](../../c-bases/langage-c-exercices)
- [Exercices C avancé](../../c-avance/langage-c-avance-exercices)

## Puissance

- Créer une fonction Puissance, qui prend en entrée 2 entiers et retourne le premier nombre puissance le deuxième. Exemple : `2^3 = 2**2**2 = 8`

- Utiliser cette fonction et afficher le résultat dans la fonction `main`.

## Guess my number

Vous allez creer un petit jeu dans lequel vous devrez deviner un nombre.

Au début, le jeu choisit un nombre aléatoire, et vous proposera de le deviner.
Si vous trouvez le bon chiffre, vous gagnez.
Si vous vous trompez, le jeu vous dit si son nombre est plus grand ou plus petit et vous redemande.
On compte le nombre de fois ou vous vous trompez, et le but est de deviner avec le moins d'essais possibles. On affichera le score a la fin.

La fonction `rand()` proposée ici retourne un entier aléatoire.

Partir de ce code de base:

```c
#include <stdio.h>
#include <time.h>

int main(void)
{
    srand(time(0));                         // initialisation de l'aleatoire
    int randomNumber = rand() % 100;        // Generation d'un nombre aleatoire entre 0 et 100
    printf("nombre: %d\n", randomNumber); // A supprimer plus tard pour ne pas afficher le nombre à deviner...
}
```

## Avancé

Pour les curieux, avant d'utiliser les nouveaux types de la librairie standard, vous pouvez vous entrainer à implémenter les équivalents en C.

### Tableaux dynamiques

Créer un programme qui gère des tableaux de taille dynamique, c’est à dire dont la taille pourra changer au fil du temps, contrairement aux tableaux traditionnels.

Concevoir des structures et des fonctions qui seront utilisées dans le main.

Avec à ces tableaux dynamiques, nous pourrons:

- Créer un nouveau tableau dynamique vide
- Ajouter un element a la fin du tableau
- Afficher tous les elements d’un tableau
- Récuperer un element du tableau via son index
- Supprimer le dernier element d’un tableau
- Copier un tableau dynamique
- Supprimer un element d’un tableau via son index

### Listes chainées

Implémenter un système de [listes chainées](../../c-avance/langage-c-avance#listes-chainees)

### Reflexion

Comparer les avantages et inconvénients des tableaux dynamiques et des listes chainées. Etudier les differences de performances et de coûts en calculs/mémoire entre ces deux méthodes et expliquer pourquoi privilegier l’une ou l’autre dans certains cas.

Reflechir à des alternatives possibles qui amélioreraient les performances.
