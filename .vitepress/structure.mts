export default {
  cours: [
    { text: "Dev Frontend", link: "/cours/dev-frontend" },
    { text: "C/C++", link: "/cours/c-cpp" },
  ],

  sidebar: {
    "/cours/dev-frontend": [
      { text: "Developpement Frontend" },
      {
        text: "Fondamentaux",
        items: [
          { text: "Introduction", link: "/cours/dev-frontend/index" },
          { text: "Ecosystème", link: "/cours/dev-frontend/ecosysteme" },
          { text: "Concepts", link: "/cours/dev-frontend/concepts" },
          { text: "Rendering", link: "/cours/dev-frontend/rendering" },
          { text: "Routing", link: "/cours/dev-frontend/routing" },
          { text: "Hebergement", link: "/cours/dev-frontend/hebergement" },
          { text: "Styling", link: "/cours/dev-frontend/styling" },
          { text: "SEO", link: "/cours/dev-frontend/seo" },
          { text: "Approfondir", link: "/cours/dev-frontend/approfondir" },
        ],
      },
      {
        text: "Frameworks",
        items: [
          { text: "VueJS", link: "/cours/dev-frontend/vuejs" },
          { text: "Nuxt", link: "/cours/dev-frontend/nuxt" },
        ],
      },
      {
        text: "Exercices",
        items: [
          {
            text: "VueJS",
            link: "/cours/dev-frontend/exercices/vuejs",
          },
          { text: "Nuxt", link: "/cours/dev-frontend/exercices/nuxt" },
          {
            text: "[Projet] Memecoin",
            link: "/cours/dev-frontend/exercices/projet-memecoin",
          },
        ],
      },
    ],
    "/cours/c-cpp": [
      {
        text: "Langage C",
        items: [{ text: "Cours", link: "/cours/c-cpp/langage-c" }],
      },
      {
        text: "Langage C++",
        items: [{ text: "Cours", link: "/cours/c-cpp/langage-cpp" }],
      },
    ],
  },
};
