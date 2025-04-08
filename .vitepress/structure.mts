export default {
  cours: [
    { text: "Dev Frontend", link: "/cours/dev-frontend" },
    { text: "Dev Backend", link: "/cours/dev-backend" },
    // { text: "C/C++", link: "/cours/c-cpp" },
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
    "/cours/dev-backend": [
      {
        text: "Generalités",
        items: [
          { text: "Introduction", link: "/cours/dev-backend/index" },
          { text: "JavaScript", link: "/cours/dev-backend/js" },
          { text: "Architectures", link: "/cours/dev-backend/architectures" },
        ],
      },
      {
        text: "NestJS",
        items: [
          {
            text: "Leçons",
            items: [
              { text: "Introduction", link: "/cours/dev-backend/nestjs" },
              {
                text: "Découpage",
                link: "/cours/dev-backend/nestjs/decoupage",
              },
              { text: "API REST", link: "/cours/dev-backend/nestjs/api-rest" },
              { text: "ORM", link: "/cours/dev-backend/nestjs/orm" },
              { text: "Tests", link: "/cours/dev-backend/nestjs/tests" },
              {
                text: "Microservices",
                link: "/cours/dev-backend/nestjs/microservices",
              },
              {
                text: "Websockets",
                link: "/cours/dev-backend/nestjs/ws",
              },
            ],
          },
          {
            text: "En pratique",
            items: [
              {
                text: "Projet d'example",
                link: "/cours/dev-backend/nestjs/project-example",
              },
              {
                text: "Exercices",
                link: "/cours/dev-backend/nestjs/exercices",
              },
            ],
          },
        ],
      },
    ],
  },
};
