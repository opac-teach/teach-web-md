# Projet

Dans le but de construire un programme utile et fonctionnel, nous allons d'abord avancer étape par étape par mini-projets en rajoutant des fonctionnalités au fur et à mesure.

## CLI interactive

Pour les éxercices suivants, vous allez commencer par créer une programme qui proposera une interface console interactive (CLI). Celle-ci proposera differentes actions et demandera à l’utilisateur laquelle effectuer.

Pour cela, commencer par afficher une liste de commandes disponibles avec une description pour chacune d'elle, et effectuer l'action demandée par l'utilisateur. Une fois effectuée, re-afficher la liste des commandes et continuer ainsi jusqu'à ce que l'utilisateur demande à quitter le programme.

Actions de départ:

- `help`: Afficher la liste des commandes
- `exit`: Quitter le programme
- `hello`: Afficher `Hello World!`

### Liste de phrases

Ajouter au programme précedent liste de chaine de caractères dynamique.

Ajouter les commandes suivantes:

- `add`: Demander une phrase à l’utilisateur et l’ajouter à la liste
- `show`: Afficher toutes les phrases de la liste avec leur index
- `pop`: Supprimer la dernière phrase de la liste
- `clear`: Vider la liste

### Itérateurs

A partir de l'exercice précedent:

- Pour la commande `show`, utiliser des itérateurs pour afficher toutes les phrases plutot que boucler traditionellement sur les index.

Ajouter les commandes suivantes:

- `remove`: supprimer une des chaines de caractère
  - Demander l’index de la phrase a supprimer (l'index des phrases doit être affiché quand on affiche la liste)
  - Supprimer cette phrase
- `reverse`: Inverser l’ordre phrase
- `sort`: Trier les phrases par ordre alphabetique
- `search` (bonus) : Chercher une chaine de caractère dans la liste

## Annuaire télephonique

Créer un programme qui gère une annuaire de numéro de telephone sous forme nom / numéro de telephone.

Partir de ce projet:

[annuaire-template.zip](../assets/annuaire-template.zip)

Compiler avec la commande suivante:

`g++ -O -Wall -std=c++17 Annuaire.cpp main.cpp -o ./main`

Ou, si vous avez Makefile installé, simplement `make` pour compiler et `make run` pour lancer.

Reprendre le travail précedent sur la CLI, Vecteurs et Itérateurs pour utiliser l'annuaire. Au lieu d’utiliser des `vector`, utiliser des `maps` pour stocker chaque entrée du repertoire par nom → numéro de telephone

Conserver le code de la CLI dans le ficher principale `main.cpp` (ou le mettre dans un fichier séparé si vous le souhaitez), mais écrire tout le code de gestion de l’annuaire dans une classe `Annuaire`.

Cette classe devra posseder:

- Une methode `add` pour ajouter une entrée dans l’annuaire
- Une methode `get` pour récupérer un numéro de téléphone par nom
- Une methode `remove` pour supprimer une entrée par nom
- Une methode `exists` pour verifier si une entrée existe
- une methode `print` pour afficher tout l’annuaire
- Un constructeur de copie
- Tout autre methode qui vous semblera utile

Les variables contenant les données de l’annuaire ne doivent pas être modifiables en dehors de la classe (attribut privé).

Au fur et à mesure que les fonctionnalités sont implémentées, vous pourrez décommenter les `assert` pour verifier que votre programme fonctionne comme demandé et en rajouter de nouveaux si besoin.

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

Dupliquer le code du programme d’annuaire télephonique, qui lui même aura été démarré sur le template proposé ici: [Partir de ce projet:](#annuaire)

Modifier celui ci pour les besoins de ce projet

- Ecrire le code du gestionnaire de mots de passe dans la classe `Annuaire` qui pourra être renommée si besoin
- Ecrire des tests dans la fonction `test()` pour verifier que l’annuaire de mot de passes fonctionne bien
- Ecrire une interface utilisateur dans la fonction `ui()` qui s’occupera de demander des actions à l’utilisateur (ajouter/supprimer/lister entrées, …)

### Chiffrement

Pour améliorer la sécurité, il serait preferable que le fichier ou sont stockés les mots de passe soit chiffré.

Lors du chargement à partir du fichier ou de l’enregistrement, utiliser une librairie de chiffrement symetrique. Quand le programme démarre, demander le mot de passe à l’utilisateur

Telecharger cette archive, ajouter les fichiers à votre projet et utiliser ces fonctions pour le chiffrement

[AES.zip](../../assets/AES.zip)

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

- Verifier la complexité des mot de passes (nombre de caractères, caractères speciaux, …)
- Comparer les mots de passes avec les plus utilisés
  - https://github.com/danielmiessler/SecLists/blob/master/Passwords/Common-Credentials/
- Génerateur de mot de passe
- Créer une classe dédiée au stockage des données. Commencer par créer une classe abstraite qui définira le contrat de stockage quelque soit le support, puis implementer une ou plusieurs classes de stockage (fichier, base de données, s3, google drive, ...)
