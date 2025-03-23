import { defineUserConfig } from "vitepress-export-pdf";
import structure from "./structure.mts";

// Fonction pour extraire les liens d'une section
function extractLinksFromSection(section: any): string[] {
  if (!section.items) return [];
  return section.items.map((item: any) => item.link);
}

// Fonction pour extraire tous les liens d'une section de cours
function extractAllLinks(coursePath: string): string[] {
  const sections = structure.sidebar[coursePath];
  return sections.flatMap((section) => extractLinksFromSection(section));
}

const LESSON = process.env.LESSON;

// Configuration pour le cours Frontend
const frontendConfig = defineUserConfig({
  sorter: (pageA, pageB) => {
    const links = extractAllLinks(`/cours/${LESSON}`).map(
      (link) => link + ".html"
    );
    const aIndex = links.findIndex((link) => link === pageA.path);
    const bIndex = links.findIndex((link) => link === pageB.path);
    return aIndex - bIndex;
  },
  outFile: `pdfs/${LESSON}.pdf`,
  routePatterns: ["!/**", `/cours/${LESSON}/**`],
  pdfOptions: {
    format: "A4",
    printBackground: true,
    margin: {
      top: "20mm",
      right: "20mm",
      bottom: "20mm",
      left: "20mm",
    },
  },
});

export default frontendConfig;
