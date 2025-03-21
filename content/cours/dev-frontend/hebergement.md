# **Solutions d’hébergement d’applications frontend**

## Pour les applications statiques

Une application statique est une application dont les pages sont construites au moment du build et ne change pas tant qu’il n’est pas reconstruit.

Un serveur statique est un serveur qui va uniquement renvoyer les fichier présent dans un dossier, souvent de type CDN, avec du cache. Il n’aura pas de logique propre et ne changera pas le contenu du site en lui-même.

Il est optimisé pour retourner le contenu le plus rapidement possible, et est souvent réparti un peu partout dans le monde pour que la resource soit au plus proche des utilisateurs.

Ces hébergements sont très peu couteux et souvent gratuits.

On les utilisera pour les applications **CSR** et **SSG**, qui, lors de la compilation, fournissent en sortie un ensemble de fichiers suffisants pour l’execution de l’application.

Pour le SSG, toutes les données seront déjà incluses dans ces fichiers, tandis que pour le CSR elles seront récupérées à l’execution par le client.

## **Pour les applications SSR**

Les pages d’une application à rendu coté serveur seront rendues à chaque requête utilisateur.

Les applications à rendu côté serveur nécessiteront plus de travail de la part du backend qu’un simple envoi de fichier. Lorsque le client demande des pages, le serveur devra récolter les données demandées, et construire lui-même le HTML.

Il faudra alors passer par une plateforme spécialement conçue pour ça, ou un serveur classique.

## Plateformes d’hébergement principales

Les plateformes PaaS (plateforme as a service) fourniront un service très simple tout clé en main, en general une simple commande suffit pour obtenir une application deployée et entièrement fonctionnelle. Le cloud sera lui plus complexe a mettre en place, mais avec plus de contrôle de la stack. Enfin, le bare-metal est une solution qui peut offrir de très bonnes performances avec des couts très faible.

- **Vercel**: créateurs de NextJS, permet de deployer très facilement la plupart des applications web full-stack sous reserve de respecter certains critères (serverless)
- **Netlify**: Equivalent de Vercel
- **Render**: Permet de deployer tout type d’applications assez simplement
- **AWS**: Tout type de déploiement (complexe)
- **Bare Metal**: Machine à configurer soi meme, très économique
