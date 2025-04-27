import { withMermaid } from "vitepress-plugin-mermaid";
import structure from "./structure.mts";

export default withMermaid({
  title: "Pac Teaches",
  description: "A teaching Site",
  lang: "fr-FR",
  srcDir: "content",
  lastUpdated: true,
  cleanUrls: true,
  ignoreDeadLinks: "localhostLinks",

  head: [["link", { rel: "icon", href: "/logo.svg" }]],
  themeConfig: {
    logo: "/logo.svg",

    nav: [
      { text: "Accueil", link: "/" },
      {
        text: "Cours",
        items: structure.cours,
      },
    ],

    search: {
      provider: "local",
    },

    sidebar: structure.sidebar,

    socialLinks: [
      { icon: "github", link: "https://github.com/opac-teach/teach-web-md" },
    ],

    outline: {
      level: [1, 2],
      label: "Sommaire",
    },
  },
});
