# Exercices Nuxt

Pour travailler sur ces exercices, vous devez forker le projet de démonstration et créer une nouvelle branche.

https://github.com/opac-teach/nuxt-demo

Nous allons maintenant refaire la meme chose que pour l'exercice [VueJS CSR](./vuejs), mais en utilisant le framework Nuxt en SSR.

Vous pouvez copier coller une partie du travail que vous avez déjà fait, mais certaines choses doivent être changées:

- Adapter les changements pour Nuxt
- Faire attention à ce que les requêtes ne soient pas lancées plusieurs fois (une serveur et une client)
- Pour l’authentification, utiliser l’url suivante:
  - `https://nuxt-demo-blush.vercel.app/api/login-cookie`
  - Ce endpoint stocke le token dans le cookie, ne plus le stocker dans le localStorage
  - Verifier que les appels à `/create-memecoin-protected` fonctionnent encore, changer les requêtes si besoin
- Gerer l’etat connecté avec des middlewares (redirection)
