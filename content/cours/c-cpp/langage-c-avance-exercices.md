# Exercices - Langage C Avancé

Si vous souhaitez revoir rapidement les bases, vous pouvez faire les [exercices préparatoires](./langage-c-avance-pre-exercices).

## Tableaux

### Exercice 1.1

- Ecrire une fonction qui calcule la somme de tous les éléments d’un tableau de nombres
- Ecrire une fonction qui calcule la moyenne d'un tableau de nombres

### Exercice 1.2

- Ecrire une fonction qui prend en paramètre un tableau et qui affiche tous les nombres pairs dans ce tableau
- Ecrire une fonction qui prend en paramètre un tableau et qui retourne le nombre le plus petit de ce tableau

### Exercice 1.3

_Tableaux multidimensionnels_

Ecrire une fonction qui affiche un tableau bi-dimensionnel à l’écran

**Bonus**: dessiner quelque chose de joli !

### Exercice 1.4

_Chaines de caractères_

Ecrire une fonction qui demande un mot de passe et retourne 1 ou 0 si le mot de passe est correct ou non

L'utiliser au debut de votre programme et le stopper si le mot de passe est incorrect

### Exercice 1.5

_Chaines de caractères et tableaux_

Ecrire une fonction qui recoit une chaine de caractères et qui retourne 1 ou 0 si la chaine est un palindrome ou non

### Exercice 1.6

- Créer une fonction qui compte combien d’espaces sont présents dans une chaine de caractère
- Recréer les fonctions `strlen`, `strcpy`, `strcmp`

## Structures

### Exercice 2.1

Ecrire un programme qui définit :

- une structure de qui représente une couleur en RGB
- une fonction qui retourne la luminosité d'une couleur (moyenne des valeurs RGB)
- Declarer une variable de couleur et calculer sa luminosité

### Exercice 2.2

Ecrire un programme qui définit :

- Une structure Horaire qui contient des heures et des minutes
- Une fonction qui additionne deux horaires
  > Attention à ce que les minutes ne dépassent pas 60
- Une fonction qui affiche un Horaire
- Utiliser ces fonctions

- **Bonus**: Une fonction qui convertit un timestamp (secondes) en Horaire (ajouter les secondes)

## Pointeurs

### Exercice 3.1

Ecrire une fonction qui multiplie une variable par référence

### Exercice 3.2

Ecrire une fonction qui inverse les données de deux variables avec l’utilisation des pointeurs

> Si a = 1 et b = 2 alors apres l'appel de la fonction a = 2 et b = 1

## Allocation dynamique

### Exercice 4.1

_Allocations mémoire_

- Ecrire un programme qui alloue de la mémoire pour un tableau de 10 flottants
- Ecrire une fonction qui remplit les valeurs d'un tableau avec les premiers multiples de 3
- Utiliser cette fonction et afficher le tableau

### Exercice 4.2

_Allocations mémoire et tableaux_

Ecrire un programme qui:

- Demande a l’utilisateur une taille
- Alloue de la memoire pour un tableau d’entiers de la taille demandée
- Pour chaque element du tableau, demander sa valeur à l’utilisateur et la stocker dans le tableau
- Afficher tous les elements du tableau

### Exercice 4.3

_Structures et pointeurs_

Ecrire un programme qui gère le niveau d’un joueur

- Créer une structure Player qui contient le niveau et le nombre de points d’experience d’un joueur
- Créer une fonction qui:
  - Ajoute de l’experience à un joueur
  - Si l’experience atteint un seuil, augmenter le niveau, et mettre à jour l'exp

## Buffer Overflow

### Exercice 5.1

Ecrire un programme qui est protégé par un mot de passe. Si le mauvais mot de pase est utilisé le programme doit s'arreter, sinon le reste du programme peut s'executer (afficher un message de succès)

Rendre le logiciel vulnérable à un buffer overflow, et exploiter le programme pour qu'il s'execute même quand le mot de passe est incorrect.

Corriger le programme en ajoutant des protections.

Rendre les deux versions du programme dans des fichiers differents (vulnerable et protegé) et indiquer comment exploiter le programme vulnérable.

## Exercice 5.2

Ecrire un programme qui appelle des fonctions par pointeurs. Le rendre vulnérable à un buffer overflow et l'exploiter pour changer son comportement.

## Structures avancées

### Exercice 6.1 - Liste chainées

Créer un programme qui implémente une liste chainées d’entiers

Le programme doit contenir les fonctions suivantes:

- `struct chained_list creerListe(int* item, unsigned int size)`
- `void parcourirListe(struct chained_list *liste)`
- `void ajouterItem(struct chained_list *liste, int item)`
- `void supprimerItem(struct chained_list *liste, unsigned int index)`

**Aide**: voir [Listes chainées](./langage-c-avance#listes-chainees)

### Exercice 6.2 - Graphes

Ecrire un programme qui implémente un système de graphes

- Le graph doit pouvoir avoir un nombre arbitraire d’elements
- On doit pouvoir ajouter des elements au graph
- On doit pouvoir parcourir le graph en entier en suivant les connexions

**Aide**: voir [Les graphes](./langage-c-avance#les-graphes)

# Divers

## Separation du code

Ecrire un programme séparé en plusieurs fichiers

Dans un nouveau dossier:

- Créer un fichier `main.c` qui contiendra une fonction `main`
- Créer des fichier `lib.c` et `lib.h` qui contiendront une fonction utilitaire de votre choix (estPair, estPremier, palindrome, …)
- Appeler cette fonction utilitaire depuis le main
- Compiler et executer le programme
  - Inclure la liste des ficher à compiler à gcc (`gcc main.c lib.c …`)

**Aide**: voir [Organisation du code](./langage-c-avance#organisation-du-code)

## Tri

- Réaliser un algorithme de tri
  - Trier un tableau d’entiers
  - Comparer différentes strategies de tri et leurs performances

# Mini projets

## Carte de crédit

Les numéro de crédits sont assez long pour qu’il y en aie assez pour tout le monde, mais permettent facilement de savoir si ils sont correct ou pas. Si on fait une erreur en tapant un numero de carte bleue en ligne, le site nous dira rapidement si il y a une faute de frappe. Cela permet de se tromper et d’utiliser la carte de quelqu’un d’autre.

Alors, quelle est la formule secrète ? Eh bien, la plupart des cartes utilisent un algorithme inventé par Hans Peter Luhn d'IBM. Selon l'algorithme de Luhn, vous pouvez déterminer si un numéro de carte de crédit est (syntaxiquement) valide comme suit :

1. Multipliez chaque autre chiffre par 2, en commençant par l'avant-dernier chiffre du numéro, puis additionnez les chiffres des produits obtenus.
2. Ajoutez cette somme à la somme des chiffres qui n'ont pas été multipliés par 2.
3. Si le dernier chiffre du total est 0 (ou, plus formellement, si le total modulo 10 est congruent à 0), le numéro est valide !

Essayons un exemple avec la Visa de David : 4003600000000014.

Pour la discussion, soulignons d'abord chaque autre chiffre, en commençant par l'avant-dernier chiffre du numéro :

4003600000000014

D'accord, multiplions chacun des chiffres soulignés par 2 :

1•2 + 0•2 + 0•2 + 0•2 + 0•2 + 6•2 + 0•2 + 4•2

Cela nous donne :

2 + 0 + 0 + 0 + 0 + 12 + 0 + 8

Maintenant, additionnons les chiffres des produits (c'est-à-dire, pas les produits eux-mêmes) ensemble :

2 + 0 + 0 + 0 + 0 + 1 + 2 + 0 + 8 = 13

Ajoutons maintenant cette somme (13) à la somme des chiffres qui n'ont pas été multipliés par 2 (en commençant par la fin) :

13 + 4 + 0 + 0 + 0 + 0 + 0 + 3 + 0 = 20

Oui, le dernier chiffre de cette somme (20) est un 0, donc la carte de David est légitime !

Ainsi, valider des numéros de carte de crédit n'est pas difficile, mais cela devient un peu fastidieux à faire à la main.

Ecrire un programme en C qui permet de valider un numéro de carte de crédit.

## Scrabble

Dans le jeu de Scrabble, les joueurs créent des mots pour marquer des points, et le nombre de points est la somme des valeurs en points de chaque lettre du mot.

| **A** | **B** | **C** | **D** | **E** | **F** | **G** | **H** | **I** | **J** | **K** | **L** | **M** | **N** | **O** | **P** | **Q** | **R** | **S** | **T** | **U** | **V** | **W** | **X** | **Y** | **Z** |
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- |
| 1     | 3     | 3     | 2     | 1     | 4     | 2     | 4     | 1     | 8     | 5     | 1     | 3     | 1     | 1     | 3     | 10    | 1     | 1     | 1     | 1     | 4     | 4     | 8     | 4     | 10    |

Par exemple, si nous voulons calculer le score du mot "CODE", nous noterons que le 'C' vaut 3 points, le 'O' vaut 1 point, le 'D' vaut 2 points et le 'E' vaut 1 point. En additionnant ces valeurs, nous obtenons que "CODE" vaut 7 points.

Implémentez un programme en C qui détermine le gagnant d'un court jeu de type Scrabble. Votre programme doit demander une entrée deux fois : une fois pour que le "Joueur 1" saisisse son mot et une fois pour que le "Joueur 2" saisisse son mot. Ensuite, en fonction du joueur qui marque le plus de points, votre programme doit afficher soit quel joueur gagne ou si il y a égalité.

## Autres idées

- Jeu du pendu
- TODO list
- TOP1:
  - Poser des questions “tu preferes … ?” (plat preferé, ville, film, …)
  - Parmis les preferences demander “tu preferes … ou … ?”
  - Dire ce qui est préferé
