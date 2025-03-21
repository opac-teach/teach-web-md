# SEO pour les applications web

## Les enjeux du référencement

Le référencement (SEO - Search Engine Optimization) est crucial pour la visibilité d'une application web. Les applications modernes, particulièrement les Single Page Applications (SPA), font face à des défis spécifiques en matière de SEO :

1. **Problématiques des SPA traditionnelles**
   - Contenu généré dynamiquement par JavaScript
   - Les robots des moteurs de recherche peuvent avoir du mal à indexer le contenu
     - Comment le robot détermine que tout le contenu a été chargé et est prêt à être indexé ?
   - Temps de chargement initial potentiellement long
2. **Impact sur la visibilité**
   - Classement dans les résultats de recherche
   - Accessibilité du contenu pour les moteurs de recherche
   - Expérience utilisateur et métriques Web Vitals

## Solutions techniques

**1. Métadonnées dynamiques**

```html
<head>
  <!-- Titre de la page (très important pour le SEO) -->
  <title>Titre de ma page | Mon Site Web</title>

  <!-- Description (apparaît dans les résultats de recherche) -->
  <meta name="description" content="Description détaillée de la page en 150-160 caractères. C'est ce texte qui apparaîtra dans les résultats de recherche Google.">

  <!-- Mots-clés (moins important aujourd'hui, mais toujours utilisé) -->
  <meta name="keywords" content="mot-clé1, mot-clé2, mot-clé3">

  <!-- Auteur -->
  <meta name="author" content="Nom de l'auteur">

  <!-- Contrôle du comportement des robots -->
  <meta name="robots" content="index, follow">

  <!-- Image de preview sur les réseaux sociaux -->
  <meta name="twitter:image" content="https://www.monsite.com/image.jpg">
</html>
```

```jsx
export default {
  metaInfo: {
    title: "Mon titre de page",
    meta: [
      { name: "description", content: "Description de ma page" },
      { property: "og:title", content: "Titre pour les réseaux sociaux" },
    ],
  },
};
```

**2. Plan du site (Sitemap)**

- Génération automatique du sitemap.xml
- Mise à jour dynamique des URLs
- Soumission aux moteurs de recherche

**3. Optimisations techniques**

- URLs propres et significatives
- Structure HTML sémantique
- Optimisation des images et ressources
- Temps de chargement optimisé

## Server-Side Rendering (SSR)

Le SSR est une solution majeure pour améliorer le SEO des applications modernes.

Il permettra, contrairement au CSR, de retourner instantanément toutes les données nécessaires à l'indexation. Les frameworks comme NextJS proposent des outils efficaces pour une génération automatique des métadonnées, images de couverture, sitemap, etc.
