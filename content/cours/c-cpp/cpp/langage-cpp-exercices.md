### Consignes de rendu

Retourner les exercices dans une archive **.zip** contenant **un fichier par exercice**

Merci de nommer votre archive comme ceci :

`NOM_Prénom_groupe_seance.zip`

_Exemple_

`Boisson_Pacien_G1_S2.zip`

# Remise à niveau en C

## Bases

Pour les élèves souhaitant revoir les bases:

- [Exercices C](../c-bases/langage-c-exercices.md)

### Puissance

1- Créer une fonction Puissance, qui prend en entrée 2 entiers et retourne le premier nombre
puissance le deuxième. Exemple : 2^3 = 2**2**2 = 8
2- Utiliser cette fonction et afficher le résultat dans la fonction main.

### Guess my number

Vous allez creer un petit jeu dans lequel vous devrez deviner un nombre.

Au début, le jeu choisit un nombre aléatoire, et vous proposera de le deviner.
Si vous trouvez le bon chiffre, vous gagnez.
Si vous vous trompez, le jeu vous dit si son nombre est plus grand ou plus petit et vous redemande.
On compte le nombre de fois ou vous vous trompez, et le but est de deviner avec le moins d'essais possibles. On affichera le score a la fin.

La fonction rand() déjà utilisée ici retourne un entier aléatoire.

Partir de ce code de base, qui part d’un nombre aléatoire dejà generé

```c
#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void)
{
    srand(time(0)); // initialisation de l'aleatoire
    int randomNumber = rand() % 100; // Generation d'un nombre aleatoire entre 0 et 100
	  // ...
}
```

## Avancé

Pour tout le monde, ces exercices serviront pour la suite:

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

[Cours langage C sur les listes chainées](../c-avance/ langage-c-avance#listes-chainees)

# Intro au C++

### Compilation

S’assurer que son environnement de développement fonctionne, et compiler et executer le code suivant:

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

- Créer des variables de différents types et afficher leurs valeurs dans la console avec `std::cout`
  - `int`
  - `float`
  - `char`
- Demander à l’utilisateur de rentrer des valeurs pour les affecter à ces différents types de variables avec `std::cin`

# Les pointeurs

### References

Ecrire une fonction qui inverse les données de deux variables avec l’utilisation de variables passées en reference (`&`)

### Allocations

Demander à l’utilisateur une taille et allouer un tableau d’entier de cette taille avec `new` puis liberer la mémoire pour ce tableau

# Conteneurs

### Array

- Créer un tableau statique d’entiers avec `std::array`, et demander a l’utilisateur de remplir les valeurs pour chacun de ses elements.
- Copier ce tableau, modifier les valeurs d’un des deux tableaux et s’assurer que les deux tableaux sont bien différents.

### String

- Créer une chaine de caractère initialisée à `"ZDJSIJ2393D"`
- Supprimer les deux derniers caractères
- Ajouter le caractère `'Y'` à la fin
- Supprimer tous les caractères
- Ajouter le caractère `'B'`
- Afficher la chaine de caractère

### Vector

- Creer un `vector` de `string`
- En boucle:
  - Demander à l’utilisateur d’entrer une phrase
  - Si la phrase rentrée est `exit`
    - Quitter la boucle
  - Sinon si la phrase rentrée est `cancel`
    - Supprimer la dernière phrase
  - Sinon
    - Ajouter cette phrase au `vector`
  - Afficher toutes les phrases

### Itérateurs

- Reprendre l’exercice precedents sur les Vector
- Utiliser des itérateurs pour afficher toutes les phrases plutot qu’utiliser les index
- Si l’utilisateur rentre la phrase `remove`
  - Demander l’index de la phrase a supprimer
  - Supprimer cette phrase
- Si l’utilisateur rentre la phrase `reverse`
  - Inverser l’ordre phrase
- Si l’utilisateur rentre la phrase `sort`
  - Trier les phrases par ordre alphabetique

### Bibliothèque standard

Réimplementer certaines fonctions fournies par la librairie standard:

- `find(iterator_debut, iterator_fin, search)`
- `count(iterator_debut, iterator_fin, search)`
- `compare(string1, string2)`

## Polymorphisme

### Surcharge

Créer deux fonctions `carre` qui retourneront le carré d’un nombre. L’une d’elle prendra et retournera des entiers, l’autre des nombres flottants.

# Classes

## Bases

### Films

Créer une classe `Film` qui contiendra

- Le nom du film
- Le nom du réalisateur
- Une note / 10
- Le nombre d’entrées au cinema
- Une méthode `estBien` qui dira si le film est _bien_ ou pas
  - Un film est _bien_ si il a une note supérieure à 8 et plus de 1000 entrées au cinema

### Eleve

Créer une classe `Eleve` qui contiendra

- Le nom de l’élève
- Le nom de la classe
- Un tableau dynamique de notes (utiliser `vector`)
- Une methode pour ajouter une note
- Une methode pour récuperer sa note moyenne

### Joueur

Créer une classe `Joueur` qui représentera un personnage dans un jeu video.

La classe doit posséder:

- Un nom
- Un niveau
- Un nombre de points de vie
- Un nombre de points d’experience acquis

Il doit être possible de:

- Lire et Changer son nom
- Lire le niveau
- Lire les points de vie

Il ne doit pas être possible de:

- Changer directement son niveau
- Changer directement ses points d’experience
- Changer directement ses points de vie

Puis:

- Implémenter une methode `attaquer` , qui prendra un autre joueur en paramètre et qui:
  - réduira les points de vie de l’ennemi
  - Si le joueur ennemi meurt (vie < 0), ajouter des points d’experience. Si on dépasse un seuil d’xp, on monte de niveau
  -

### Joueurs avec heritage

- Créer deux classes héritées de `Joueur`
  - `Soldat`
    - Possède des points d’endurance
  - `Magicien`
    - Possède des points de magie
- Modifier la fonction `attaquer` dans chacune de ces classes pour qu’elle enlève les points d’energie correspondant à la classe du joueur

### Pare-feu

Nous allons ébaucher un programme de pare feu, qui servira a analyser du traffic réseau et autoriser ou refuser des communications.

Pour commencer, on va créer un simple filtre sur des numéros de ports à autoriser ou non.

Il devra être possible de:

- Ajouter un port autorisé
- Supprimer un port autorisé
- Analyser un port
- Activer/Désactiver le pare-feu
  - Quand le pare feu est désactivé, il laisse passer tout le traffic
  - Par defaut, il est desactivé
  - Par défaut, tous les ports sont interdits

Utiliser `assert` pour tester la classe et verifier son fonctionnement, par exemple:

```cpp
#include <cassert>
#include "Firewall.hpp"

int main()
{
    Firewall firewall;

    assert(!firewall.check(21));
    firewall.allow(21);
    assert(firewall.check(21));

    return 0;
}
```

# Projet

## Annuaire

Créer un programme qui gère une annuaire de numéro de telephone sous forme nom / numéro de telephone.

S’inspirer de l’exercice vecteurs/itérateurs ou nous stockions des phrases, en gardant le système de commandes (ajouter, supprimer, lister, …)

Partir de ce projet:

[annuaire-template.zip](../assets/annuaire-template.zip)

Compiler avec la commande suivante:

`g++ -O -Wall -std=c++17 Annuaire.cpp main.cpp -o ./main`

Au lieu d’utiliser des `vector`, utiliser des `maps` pour stocker chaque entrée du repertoire par nom → numéro de telephone

Créer une classe Annuaire, qui s’occupera de la gestion de celui ci.

Cette classe devra posseder:

- Une methode `add` pour ajouter une entrée dans l’annuaire
- Une methode `remove` pour supprimer une entrée par nom
- Une methode `exists` pour verifier si une entrée existe
- une methode `print` pour afficher tout l’annuaire
- Un constructeur de copie
- Tout autre methode qui vous semblera utile

Les variables contenant les données de l’annuaire ne doivent pas être modifiables en dehors de la classe.

## Flux

### Concatenation

- Demander à l’utilisateur de rentrer deux phrases
- Créer une chaine de caractère qui contient ces deux phrases bout à bout, séparées par un `:`

Utiliser `std::stringstream`

- Séparer cette chaine de caractère en deux

### Fichiers

- Reprendre l’exercice Annuaire
- Ajouter une commande `save`, qui va enregistrer dans un fichier toutes les contacts qui ont été ajoutés
- Au démarrage du programme, charger les contacts depuis ce fichier texte

# [Projet Final] Gestionnaire de mot de passes

### Description

Créer un programme qui s’occupe de la gestion de mots de passes.

A la manière d’un Keepass, ce programme pourra stocker les mots de passe de l’utilisateur sur differentes plateformes

Chaque entrée sera composé de:

- Nom de la plateforme (google, discord, instagram,…)
  - Celui ci servira de clé dans l’annuaire
- Nom d’utilisateur (mail/username)
- Mot de passe
- Plus si vous le souhaitez (2FA, commentaires, …)

Les mots de passes devront êtres sauvegardés dans un fichier et chargés à l’ouverture du programme

### Implementation

Reprendre le code du programme d’annuaire telephonique, qui lui même aura été démarré sur le template proposé ici: [Partir de ce projet:](#annuaire)

Modifier celui ci pour les besoins de ce projet

- Ecrire le code du gestionnaire de mots de passe dans la classe `Annuaire` qui pourra être renommée si besoin
- Ecrire des tests dans la fonction `test()` pour verifier que l’annuaire de mot de passes fonctionne bien
- Ecrire une interface utilisateur dans la fonction `ui()` qui s’occupera de demander des actions à l’utilisateur (ajouter/supprimer/lister entrées, …)

### Chiffrement

Pour améliorer la sécurité, il serait preferable que le fichier ou sont stockés les mots de passe soit chiffré.

Lors du chargement à partir du fichier ou de l’enregistrement, utiliser une librairie de chiffrement symetrique. Quand le programme démarre, demander le mot de passe à l’utilisateur

Telecharger cette archive, ajouter les fichiers à votre projet et utiliser ces fonctions pour le chiffrement

[AES.zip](../assets/AES.zip)

```cpp
#include "AES.hpp"

EasyAES aes;

std::string message = "phrase secrete";
std::string key = "password";
std::string cipher = aes.encrypt(message, key);
std::string decipher = aes.decrypt(cipher, key);
assert(message == decipher);

```

### Fonctionnalités supplementaires

- Verifier securité mot de passes (nb de caractère, caractères speciaux,…)
- Comparer mots de passes avec les plus utilisés
  - https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/
- Génerateur de mot de passe

### Rendu

Le projet complet sera a rendre sous la forme d’une archive zip

Retourner le projet complet dans une archive **.zip**

Merci de nommer votre archive comme ceci :

`NOM_Prénom_groupe.zip`

_Exemple_

`Boisson_Pacien_G1.zip`
