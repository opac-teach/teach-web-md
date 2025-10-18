# Programmation Orientée Objet

## Exemples de classe

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
- Une methode pour calculer la moyenne de l'élève

### Classe

Créer une classe `Classe` qui contiendra une liste dynamique d'éléves.

- Créer une méthode `moyenne()` qui retournera la moyenne de la classe

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

_(**Indice**: utiliser la portée des attributs)_

Puis:

- Implémenter une methode `attaquer` , qui prendra un autre joueur en paramètre et qui:
  - réduira les points de vie de l’ennemi
  - Si le joueur ennemi meurt (vie < 0), ajouter des points d’experience. Si on dépasse un seuil d’xp, on monte de niveau

### Joueurs avec héritage

- Créer deux classes héritées de `Joueur`
  - `Guerrier`
    - Possède des points d’endurance
  - `Magicien`
    - Possède des points de magie
- Modifier la fonction `attaquer` dans chacune de ces classes pour qu’elle enlève les points d’energie correspondant à la classe du joueur

## Separation des fichiers

Pour l'exercice "Joueurs avec héritage", organiser le code de manière à ce que chaque classe soit dans un fichier séparé, avec les headers et l'implémentation dans deux fichiers distincts.

Ecrire la commande necessaire pour compiler le programme dans un fichier readme à coté du code.
