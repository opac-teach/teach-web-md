# Exercices Vue.js

Pour travailler sur ces exercices, vous devez forker le projet de démonstration et créer une nouvelle branche.

[https://github.com/opac-teach/vue-demo](https://github.com/opac-teach/vue-demo)

##  Exercices de base

Faire les exercices indiqués dans chacune des pages de l'application d'exemple

### Page Memecoin

- Ajouter une page `/exercices`
- Dans cette page, ajouter une section qui affiche une liste de memecoins
  - Récupérer la liste de memecoins depuis l'adresse
  - `https://nuxt-demo-blush.vercel.app/api/get-memecoins`
  - Les afficher dans la page
- Dans cette page, ajouter un formulaire pour créer un memecoin
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
  - Afficher le résultat, et gérer le cas des erreurs API
  - Rafraîchir la liste des memecoins affichée
  - Bonus : Récupérer et stocker la liste des memecoins dans un store Pinia

## Authentification

- Ajouter une page d'authentification
  - Créer un formulaire qui demande juste un mot de passe
    - `password` non vide
  - Envoyer ce mot de passe en POST à
    - `https://nuxt-demo-blush.vercel.app/api/login`
    - _(le bon mot de passe est `admin123`)_
  - Stocker le token JWT retourné dans un store Pinia
    - Stocker aussi son userId retourné
    - Injecter le token JWT dans les prochaines requêtes à l'API
    - Bonus: stocker le token dans le localStorage pour qu'il soit chargé si on relance l'app
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

## Tests

- Créer des tests unitaires pour :
  - Le(s) store(s) Pinia
  - Le composant qui affiche la liste des memecoins
  - Le formulaire de création de memecoin
- Créer un test d'intégration (e2e) qui va créer un memecoin et vérifier qu'il apparaît bien dans la liste

# Rendu

- Commit/Push votre travail sur votre fork, et créez une pull request sur le projet d'origine pour valider votre travail
