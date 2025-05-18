# Exercices NextJS

Ces exercices sont des entrainements aux concepts de bases à maitriser avant de se lancer dans un projet plus complexe.

Pour travailler sur ces exercices, vous devrez forker le [projet de démonstration](https://github.com/opac-teach/next-demo) et créer une nouvelle branche, puis créer une pull request sur le projet d'origine pour valider votre travail.

## Instructions generales

Pour tous les exercices, il faudra faire en sorte d'écrire des composants les plus optimisés possible. Cela signifie d'utiliser au maximum les Server Component, Server Actions, le streaming, et une optimisation des cycles de vie des composants.

## Pages

### Memecoin list

- Ajouter une page `/memecoins`
- Dans cette page, ajouter une section qui affiche une liste de memecoins
  - Récupérer la liste de memecoins depuis l'adresse
  - `https://nuxt-demo-blush.vercel.app/api/get-memecoins`
  - Les afficher dans la page
- Découper la page en composants (MemecoinList + MemecoinItem par exemple)
- Dans cette page, ajouter un nouveau composant qui contiendra un formulaire pour créer un memecoin
  - Entrées du formulaire :
    - `name`, 4-16 caractères, obligatoire
    - `symbol`, 2-4 caractères, obligatoire, uniquement des majuscules
    - `description`, 0-1000 caractères, pas obligatoire
    - `logoUrl`, 0-200 caractères, pas obligatoire, doit être une URL valide
  - Envoyer sous forme de requête POST à cette adresse
    - `https://nuxt-demo-blush.vercel.app/api/create-memecoin`
  - Gérer la validation des entrées dans l'interface
    - Empêcher l'envoi du formulaire si les conditions ne sont pas respectées
    - Afficher des messages d'erreurs de validation
  - Afficher le résultat de l'operation
  - Rafraîchir la liste des memecoins après l'ajout 
  - Rafraichir régulierement la liste automatiquement

> L'API proposée retourne volontairement des erreurs de manière aléatoire afin d'assurer une gestion d'erreurs de manière robuste dans le frontend

### Memecoin details

- Ajouter une page `/memecoins/[id]` qui affichera un seul memecoin. 
  - Récupérer le memecoin depuis l'adresse
  - `https://nuxt-demo-blush.vercel.app/api/get-memecoins/[id]`
- Retourner des métadonnées SEO (opengraph) pour ces pages

## Authentification

Ajouter un système d'authentification: 

- Creer un route handler sur `/api/login` qui: 
  - Reçoit en POST un mot de passe à définir en constante
  - Crée un token JWT et le définit sur le client dans un cookie
- Ajouter une page `/login` qui permet de se connecter
- Faire évoluer l'UI en fonction de l'état connecté
  - Si on est connecté :
    - Afficher un bouton pour se déconnecter dans la navbar
  - Si on est déconnecté :
    - Afficher un bouton pour se connecter dans la navbar
  - Creer un middleware qui redirigera l'utilisateur si il accède aux pages de login et de creation de memecoin sans etre connecté, et à la page de login si il est deja conencté

## Alternatives

- Choisir un composant qui récupère des données, et le dupliquer en plusieurs composants qui chacun recupèrent les données en mode RSC, CSR, ISR, SSG et streaming. 
- Creer un composant qui affiche et stocke une donnée dans le localStorage

## Route handlers

Reproduire les routes utilisées (`https://nuxt-demo-blush.vercel.app/api/get-memecoins` etc...) dans ce projet. Commencer avec des données stockées dans des variables, puis utiliser une base de données et un ORM type prisma. 