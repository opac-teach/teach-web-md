export default {
  cours: [
    { text: "Dev Frontend", link: "/cours/dev-frontend" },
    { text: "Dev Backend", link: "/cours/dev-backend" },
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
          { text: "Tests", link: "/cours/dev-frontend/tests" },
          { text: "Sécurité", link: "/cours/dev-frontend/securite" },
          { text: "Approfondir", link: "/cours/dev-frontend/approfondir" },
        ],
      },
      {
        text: "Frameworks",
        items: [
          {
            text: "VueJS",
            items: [
              {
                text: "Projet d'exemple",
                link: "/cours/dev-frontend/vuejs/index",
              },
              {
                text: "Exercices",
                link: "/cours/dev-frontend/vuejs/exercices",
              },
            ],
          },
          {
            text: "Nuxt",
            items: [
              {
                text: "Projet d'exemple",
                link: "/cours/dev-frontend/nuxt/index",
              },
              {
                text: "Exercices",
                link: "/cours/dev-frontend/nuxt/exercices",
              },
            ],
          },
          {
            text: "React",
            items: [
              { text: "Présentation", link: "/cours/dev-frontend/react/index" },
              {
                text: "Components",
                link: "/cours/dev-frontend/react/components",
              },
              { text: "Hooks", link: "/cours/dev-frontend/react/hooks" },
              {
                text: "Server Components",
                link: "/cours/dev-frontend/react/rsc",
              },
              {
                text: "Server Functions",
                link: "/cours/dev-frontend/react/server-functions",
              },
              {
                text: "Exercices",
                link: "/cours/dev-frontend/react/exercices",
              },
            ],
          },
          {
            text: "NextJS",
            items: [
              {
                text: "Introduction",
                link: "/cours/dev-frontend/nextjs/index",
              },
              {
                text: "Projet d'exemple",
                link: "/cours/dev-frontend/nextjs/demo",
              },
              {
                text: "Authentification",
                link: "/cours/dev-frontend/nextjs/authentification",
              },
              {
                text: "Exercices",
                link: "/cours/dev-frontend/nextjs/exercices",
              },
              {
                text: "Projet",
                link: "/cours/dev-frontend/nextjs/projet",
              },
            ],
          },
        ],
      },
    ],
    "/cours/c-cpp": [
      {
        text: "Langage C",
        items: [
          {
            text: "Bases",
            items: [
              { text: "Cours", link: "/cours/c-cpp/c-bases/langage-c" },
              {
                text: "Cheatsheet",
                link: "/cours/c-cpp/c-bases/langage-c-cheatsheet",
              },
              {
                text: "Exercices",
                link: "/cours/c-cpp/c-bases/langage-c-exercices",
              },
            ],
          },
          {
            text: "Avancé",
            items: [
              { text: "Cours", link: "/cours/c-cpp/c-avance/langage-c-avance" },
              {
                text: "Cheatsheet",
                link: "/cours/c-cpp/c-avance/langage-c-avance-cheatsheet",
              },
              {
                text: "Exercices",
                link: "/cours/c-cpp/c-avance/langage-c-avance-exercices",
              },
              {
                text: "Shaders",
                link: "/cours/c-cpp/c-avance/shaders",
              },
            ],
          },
        ],
      },
      {
        text: "Langage C++",
        items: [
          {
            text: "Cours",
            items: [
              {
                text: "Intro",
                link: "/cours/c-cpp/cpp/intro",
              },
              {
                text: "Types",
                link: "/cours/c-cpp/cpp/types",
              },
              {
                text: "Entrées/Sorties",
                link: "/cours/c-cpp/cpp/io",
              },
              {
                text: "Pointeurs",
                link: "/cours/c-cpp/cpp/pointeurs",
              },
              {
                text: "POO",
                link: "/cours/c-cpp/cpp/poo",
              },
              {
                text: "Organisation du code",
                link: "/cours/c-cpp/cpp/split",
              },
              {
                text: "Divers",
                link: "/cours/c-cpp/cpp/divers",
              },
            ],
          },
          { text: "Exercices", link: "/cours/c-cpp/cpp/langage-cpp-exercices" },
        ],
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
            text: "Cours",
            items: [
              { text: "Introduction", link: "/cours/dev-backend/nestjs/index" },
              {
                text: "Découpage",
                link: "/cours/dev-backend/nestjs/decoupage",
              },
              { text: "API REST", link: "/cours/dev-backend/nestjs/api-rest" },
              { text: "GraphQL", link: "/cours/dev-backend/nestjs/graphql" },
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
                text: "Projet d'exemple",
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
      {
        text: "GraphQL",
        items: [
          {
            text: "Cours",
            items: [
              {
                text: "Introduction",
                link: "/cours/dev-backend/graphql/index",
              },
              { text: "Schemas", link: "/cours/dev-backend/graphql/schemas" },
              { text: "Queries", link: "/cours/dev-backend/graphql/queries" },
              { text: "Server", link: "/cours/dev-backend/graphql/server" },
              { text: "Clients", link: "/cours/dev-backend/graphql/clients" },
              {
                text: "Optimisation",
                link: "/cours/dev-backend/graphql/optimisation",
              },
            ],
          },
          {
            text: "En pratique",
            items: [
              {
                text: "Projet d'exemple",
                link: "/cours/dev-backend/graphql/project-example",
              },
              {
                text: "Exercices",
                link: "/cours/dev-backend/graphql/exercices",
              },
            ],
          },
        ],
      },
      {
        text: "Supabase",
        items: [
          {
            text: "Entrainement",
            link: "/cours/dev-backend/supabase/index",
          },
        ],
      },
      // {
      //   text: "DevOps",
      //   items: [
      //     {
      //       text: "Environnements",
      //       link: "/cours/dev-backend/devops/environnements",
      //     },
      //   ],
      // },
    ],
  },
};
