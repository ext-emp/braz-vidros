import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

function cssNoHtml() {
  return {
    name: "css-no-html",
    apply: "build",
    enforce: "post",
    generateBundle(_, bundle) {
      const html = bundle["index.html"];
      if (!html || typeof html.source !== "string") return;

      for (const arquivo of Object.values(bundle)) {
        if (arquivo.type !== "asset" || !arquivo.fileName.endsWith(".css")) continue;
        const link = new RegExp(`<link[^>]*href="/${arquivo.fileName}"[^>]*>`);
        if (!link.test(html.source)) continue;
        // Substituição por função: um "$" no CSS não vira referência de grupo
        html.source = html.source.replace(link, () => `<style>${arquivo.source}</style>`);
        delete bundle[arquivo.fileName];
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), cssNoHtml()],
  build: {
    /* Explícito de propósito: nenhum .map vai junto do build publicado, para
       o código-fonte não ficar navegável no ar. Em dev o source map do Vite
       continua ligado */
    sourcemap: false,
  },
});
