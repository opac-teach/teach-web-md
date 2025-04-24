import { defineUserConfig } from "vitepress-export-pdf";
import structure from "./structure.mts";

// Fonction pour extraire les liens d'une section
function extractLinksFromSection(section: any): string[] {
  if (!section.items) return [];
  return section.items
    .flatMap((item: any) => {
      if (item.link) return [item.link];
      else if (item.items) return extractLinksFromSection(item);
      else return null;
    })
    .filter((i: any) => !!i?.link);
}

function extractAllLinks(coursePath: string): string[] {
  return Object.values(structure.sidebar)
    .flat()
    .flatMap((section) => extractLinksFromSection(section))
    .filter((link) => link.startsWith(`${coursePath}`));
}

const LESSON = process.env.LESSON;
const links = extractAllLinks(`/cours/${LESSON}`).map((link) => link + ".html");

if (links.length === 0) {
  throw new Error(`No links found for ${LESSON}`);
}

// Configuration pour le cours Frontend
const frontendConfig = defineUserConfig({
  sorter: (pageA, pageB) => {
    const aIndex = links.findIndex((link) => link === pageA.path);
    const bIndex = links.findIndex((link) => link === pageB.path);
    if (aIndex === -1) return 1;
    if (bIndex === -1) return -1;
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
