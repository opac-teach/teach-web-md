# Exercices NextJS

Ces exercices sont des entrainements aux concepts de bases à maitriser avant de se lancer dans un projet plus complexe.

Pour travailler sur ces exercices, vous devrez forker le [projet de démonstration](https://github.com/opac-teach/nextjs-demo) et créer une nouvelle branche, puis créer une pull request sur le projet d'origine pour valider votre travail.


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

- Ajouter une page d'authentification
  - Créer un formulaire qui demande juste un mot de passe
    - `password` non vide
  - Envoyer ce mot de passe en POST à
    - `https://nuxt-demo-blush.vercel.app/api/login-cookie`
    - _(le bon mot de passe est `admin123`)_
  - Changer l'URL de la requête pour récupérer la liste des memecoins vers
    - `https://nuxt-demo-blush.vercel.app/api/get-memecoins-protected`
  - Changer l'URL de la requête pour créer un memecoin vers
    - `https://nuxt-demo-blush.vercel.app/api/create-memecoin-protected`
    - Vérifier que la création fonctionne bien et que l'owner du memecoin créé est bien le nôtre
  - Faire évoluer l'UI en fonction de l'état connecté
    - Si on est connecté :
      - Afficher un bouton pour se déconnecter dans la navbar
      - Si l'utilisateur affiche la page de login, ne pas l'afficher et rediriger ailleurs
    - Si on est déconnecté :
      - Afficher un bouton pour se connecter dans la navbar
      - Ne pas afficher le formulaire de création de memecoin, mais un bouton pour se connecter à la place

- Gerer l’etat connecté avec des middlewares (redirection)
  > Par exemple, si on est connecté et qu'on essaye d'acceder à la page de login, on doit etre redirigé vers la page d'accueil. Si on accede a la page de memecoins sans etre connecté, on est redirigé vers la page de login.

## Route handlers

- Creer un route handler pour la route `/api/stats` qui retourne un objet JSON avec des statistiques sur les memecoins tels que le nombre total, le nombre moyen par utilisateur...
- Afficher ces statistiques dans la page `/memecoins`