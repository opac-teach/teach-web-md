# Exercices - Langage C

Partir de ce code de départ:

```c
#include <stdio.h>

int main(void) {

	// Entrer le code ici

  return 0;
}
```

# Basique

### Variables et affichage

- Déclarer une variable de type entier
- Affecter une valeur à cette variable
- Déclarer une variable de type flottant et lui affecter une valeur sur une seule ligne
- Afficher la valeur de la variable entière
- Afficher la valeur de la variable flottante

### Caractères

- Déclarer une variable de type caractère et lui affecter la lettre `b`
- Afficher la valeur de cette variable

### Récupération de valeurs

- Demander à l’utilisateur d’entrer une valeur entière
- Affecter cette valeur à une variable de typer entier
- Afficher cette variable

### Plages de valeurs

- Jusqu’a combien peut on compter si on a une variable d’une taille de 2 octets ?
- Créer une variable de type `char` initialisée à 100, lui rajouter 100, puis afficher sa valeur entière

## Opérateurs

### Arithmétiques

- Déclarer deux variables entières
- Effectuer la somme de ces deux variables et l’affecter à une nouvelle variable
- Pareil avec des variables flottantes
- Effectuer des opérations avec ces opérateurs: `-` `/` `*`
- Quel est le résultat de `int a = 3 * 1.5;`

### Heures ⇒ Minutes

- Ecrire un programme qui demande un nombre d’heures et qui affiche l’équivalent en minutes

### Modulo

- Déterminer le reste de la division euclidienne de 47 par 5

### Comparaisons

- Déclarer deux variables entières `a` et `b` et leur affecter des valeurs
- Affecter à une nouvelle variable le résultat d’une comparaison de type “`a` est strictement supérieur à `b`” des deux premières variables

### Logiques

- Déclarer trois variables flottantes `a` `b` `c`et leur affecter des valeurs
- Affecter à une nouvelle variable le résultat de la condition “`a` est égal à `b` ET `a` est different de `c`”
- Affecter à une nouvelle variable le résultat de la condition “`a` est strictement inférieur à `b` OU `a` est égal à `c`”
- Affecter à une nouvelle variable le résultat de la condition “`a` est inférieur ou égal inférieur à `b` sans utiliser le symbole inférieur ou egal”

# Contrôles de flux

## Structures conditionnelles

### If…Else

- Créer un programme qui demande l’âge de l’utilisateur
- Si l’âge est strictement inférieur à 1 ou supérieur ou égal à 100, afficher un message d’erreur
- Si l’âge est strictement inférieur à 18, alors afficher “mineur”, sinon afficher “majeur”
- Si l’âge est situé entre 19 et 24 (inclus), afficher “étudiant”, sinon afficher “adulte”

### Nombres pairs

- Créer un programme qui demande un nombre entier
- Afficher si ce nombre est pair ou impair

### Switch

- Créer un programme qui demande un nombre entier à l’utilisateur
- Afficher ce nombre en lettres (1 ⇒ “un”, 2 ⇒ “deux”, …)
- Pour les cas non pris en compte, afficher “erreur”

## Boucles

### While

- Définir une variable entière initialisée à 0
- Ecrire une boucle qui:
  - Tant que
    - la variable est strictement inférieure à 18
  - Alors
    - Demander à l’utilisateur une nouvelle valeur pour la variable
- Afficher un message pour indiquer que la boucle est terminée

### For

- Afficher tous les nombres entiers entre 10 et 15 inclus

### For 2

- Afficher les 5 premiers multiples de 5

### For 3

- Afficher la somme des nombres entre 1 et 5 inclus

# Fonctions

- Créer une fonction prend un nombre en argument qui retourne le carré de ce nombre, puis utiliser cette fonction
- Créer une fonction qui prend deux nombres en argument et retourne 1 si le premier est divisible par le deuxième, 0 sinon
- Demander deux nombres à l’utilisateur, et afficher si le premier est divisible par le deuxième
- Afficher tous les diviseurs du nombre 48
- Créer une fonction `timesDivisible` qui:

  - prend deux nombres en argument
  - retourne le nombre de fois que le premier nombre est divisible par le deuxième.

- Ecrire une fonction qui prend deux nombres en paramètres et retourne le plus grand
- Ecrire une fonction qui convertit des degrés en radian
- Afficher combien vaut 32° en radians
- Demander deux nombres à l’utilisateur et afficher le plus grand converti en radians

### Premiers

- Créer une fonction qui prend un nombre en argument retourne 1 si un nombre est premier, 0 sinon

### Factorielle

- Créer une fonction qui calcule la factorielle d’un chiffre
  - Faire une version avec un `for`
  - Faire une version _récursive_

<aside>
⚠️

Pour rappel, la factorielle (écrit `5!` pour factorielle de 5) est la multiplication d’un nombre par tous ses nombre inférieurs

Exemple: `4! = 4*3*2*1`

</aside>

### [PGCD](https://fr.wikipedia.org/wiki/Plus_grand_commun_diviseur)

> En [mathématiques](https://fr.wikipedia.org/wiki/Math%C3%A9matiques), le **PGCD de nombres entiers** différents de [zéro](https://fr.wikipedia.org/wiki/Z%C3%A9ro) est, parmi les [diviseurs](https://fr.wikipedia.org/wiki/Diviseur) communs à ces [entiers](https://fr.wikipedia.org/wiki/Entier_naturel), le plus grand d'entre eux. PGCD signifie **plus grand commun diviseur**.
>
> Par exemple, les diviseurs positifs de 30 sont, dans l'ordre : 1, 2, 3, 5, 6, 10, 15 et 30. Ceux de 18 sont 1, 2, 3, 6, 9 et 18. Les diviseurs communs de 30 et 18 étant 1, 2, 3 et 6, leur PGCD est 6. Ce qui se note : PGCD(30, 18) = 6.

### [PPCM](https://fr.wikipedia.org/wiki/Plus_petit_commun_multiple)

> En [mathématiques](https://fr.wikipedia.org/wiki/Math%C3%A9matiques), et plus précisément en [arithmétique](https://fr.wikipedia.org/wiki/Arithm%C3%A9tique_%C3%A9l%C3%A9mentaire), le **plus petit commun multiple** – en abrégé **PPCM** – (peut s'appeler aussi **PPMC**, soit « **plus petit multiple commun** ») de deux [entiers](https://fr.wikipedia.org/wiki/Entier_relatif) non nuls *a* et *b* est le plus petit entier strictement positif qui soit [multiple](<https://fr.wikipedia.org/wiki/Multiple_(math%C3%A9matiques)>) de ces deux nombres.

# Mini-projets

## La calculatrice

Votre objectif sera de réaliser une calculatrice basique pouvant effectuer differentes opérations

Lorsque le programme démarre, il va d’abord demander quelle opération effectuer:

Chaque opération sera identifiée par un symbole ou une lettre, comme suit :

- addition : `+`
- soustraction : `-`
- multiplication : `*`
- division : `/`
- reste de la division entière : `%`
- puissance : `^`
- factorielle : `!`
- Premier: `p`
- PGCD : `g`
- PPCM : `m`

Le programme doit s’arrêter lorsque la lettre « q » est spécifiée comme opération

Commencer par seulement une ou deux opérations et rajouter les autres au fur et a mesure.

Une fois l’opération choisie, demander les paramètres ( par exemple 2 pour les additions, 1 pour les puissances …)

Calculer et afficher le résultat

Recommencer aux choix de l’opération

Chaque opération doit être effectué dans une fonction séparée qui ne prend que les operandes et ne retourne que le résultat. Ne pas utiliser de librairie externe, faire les calculs soi-même.

- Ecrire une fonction qui prend en paramètre un nombre de secondes, et qui affiche l’équivalent en heure, minutes, secondes

## Pyramide

Afficher une pyramide à l’écran comme ceci:

```
       #
      ##
     ###
    ####
   #####
  ######
 #######
########
```

Commencer par demander à l’utilisateur la taille (hauteur) de la pyramide

## Monnaie

Supposons que vous travaillez dans un magasin et qu'un client vous donne 1,00€ (100 centimes) pour des bonbons qui coûtent 0,50€ (50 centimes). Vous devrez lui rendre la "monnaie", le montant restant après avoir payé le coût des bonbons. Lorsque vous rendez la monnaie, il est probable que vous souhaitiez minimiser le nombre de pièces que vous distribuez à chaque client, de peur de manquer de pièces (ou d'ennuyer le client !). Les pieces disponibles sont 1, 2, 5, 10, 20, 50 centimes et 1 et 2 euros.

Implémentez un programme en C qui affiche le nombre minimum de pièces nécessaires pour rendre la monnaie donnée, en centimes, comme ci-dessous :

```c
Monnaie due : 20
1
Monnaie due : 70
2
Monnaie due : 75
3
Monnaie due : 26
3

```

Redemandez à l'utilisateur, encore et encore si nécessaire, si son entrée n'est pas supérieure ou égale à 0
