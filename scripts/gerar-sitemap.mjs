/*
  Gera o public/sitemap.xml a partir do PAGE_META de src/data/content.js, que
  é a mesma fonte do SEO de cada página. Rota nova entra num lugar só e
  aparece nos dois, e o sitemap nunca lista uma página que não existe.

  Roda sozinho antes do build (o npm chama o `prebuild`) e pode ser chamado à
  mão com `npm run sitemap`.
*/
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { SITE_URL, SITEMAP_ROUTES } from "../src/data/content.js";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const destino = join(raiz, "public", "sitemap.xml");

const urls = SITEMAP_ROUTES.map((page) => {
  const linhas = [
    `    <loc>${SITE_URL}${page.path}</loc>`,
    page.lastmod ? `    <lastmod>${page.lastmod}</lastmod>` : null,
    page.changefreq ? `    <changefreq>${page.changefreq}</changefreq>` : null,
    page.priority ? `    <priority>${page.priority}</priority>` : null,
  ].filter(Boolean);
  return `  <url>\n${linhas.join("\n")}\n  </url>`;
}).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(destino, xml, "utf8");
console.log(`sitemap.xml gerado com ${SITEMAP_ROUTES.length} rotas`);
