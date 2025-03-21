import { defineConfig } from "vitepress";
import { withMermaid } from "vitepress-plugin-mermaid";
// https://vitepress.dev/reference/site-config
export default withMermaid({
  title: "Pac Teaches",
  description: "A teaching Site",
  lang: "fr-FR",
  srcDir: "content",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Accueil", link: "/" },
      { text: "Cours", link: "/cours/dev-frontend/intro" },
      { text: "Exercices", link: "/exercices/dev-frontend/vuejs" },
    ],

    sidebar: {
      "/cours": [
        {
          text: "Developpement Frontend",
          items: [
            { text: "Introduction", link: "/cours/dev-frontend/intro" },
            { text: "Ecosystème", link: "/cours/dev-frontend/ecosysteme" },
            { text: "Concepts", link: "/cours/dev-frontend/concepts" },
            { text: "Rendering", link: "/cours/dev-frontend/rendering" },
            { text: "Routing", link: "/cours/dev-frontend/routing" },
            { text: "Hebergement", link: "/cours/dev-frontend/hebergement" },
            { text: "SEO", link: "/cours/dev-frontend/seo" },
            { text: "Approfondir", link: "/cours/dev-frontend/approfondir" },
          ],
        },
        {
          text: "Frameworks",
          items: [{ text: "VueJS", link: "/cours/dev-frontend/vuejs" }],
        },
      ],
      "/exercices": [
        {
          text: "Exercices",
          items: [
            { text: "VueJS", link: "/exercices/dev-frontend/vuejs" },
            { text: "Nuxt", link: "/exercices/dev-frontend/nuxt" },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: "github", link: "https://github.com/opac-teach/teach-press" },
    ],

    outline: {
      level: [1, 2],
      label: "Sommaire",
    },
  },
});
