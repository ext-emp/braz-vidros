import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    /* Explícito de propósito: nenhum .map vai junto do build publicado, para
       o código-fonte não ficar navegável no ar. Em dev o source map do Vite
       continua ligado */
    sourcemap: false,
  },
});
