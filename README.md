# Braz Vidros: Site institucional

Site institucional multi-página da Braz Vidros (vidraçaria e esquadrias de alumínio,
Novo Hamburgo/RS).

**Stack**: React + Vite, React Router, Tailwind CSS v4, GSAP (hero mosaico + scroll reveals)

**Páginas**: `/` (home com hero slider), `/vidracaria`, `/esquadrias`,
`/sobre`, `/contato`

> **Deploy**: por ser SPA com rotas, o servidor precisa de fallback para `index.html`
> (Vercel/Netlify/Cloudflare Pages fazem isso automático para projetos Vite).

## Rodar

```bash
npm install
npm run dev      # desenvolvimento (http://localhost:5173)
npm run build    # build de produção em dist/
npm run preview  # servir o build localmente
```

## O que substituir antes de publicar

Tudo centralizado em `src/data/content.js`:

1. **`WHATSAPP`**: número real no formato internacional só dígitos (ex: `5551912345678`)
2. **Fotos**: todas as URLs `picsum.photos/seed/...` são placeholder. Trocar pelas fotos
   reais dos projetos (hero: 1920×1200; portfólio: 800×600; focos: 900×1100)
3. **`og-cover.jpg`**: criar imagem de capa 1200×630 em `public/` para o preview de
   link no WhatsApp (referenciada no `index.html`)
4. **Telefone no `index.html`**: atualizar o `telephone` do JSON-LD
5. **Favicon**: o `favicon.svg` ainda é o desenho antigo. A logo é um lettering
   deitado (4,6:1), que não funciona em 32×32; falta uma versão em monograma

## SEO

- Meta tags, Open Graph e JSON-LD (LocalBusiness) estáticos no `index.html`
- Preload da primeira imagem do hero (LCP)
- **Pendente (passo de deploy)**: pré-renderização do build para crawlers
  (ex: `vite-prerender-plugin`). O conteúdo estático do `index.html` já cobre o
  preview de WhatsApp; a pré-renderização melhora a indexação do corpo da página.
- Recomendado: criar/completar o Google Business Profile apontando para o domínio

## Design

- Conceito: "clean + material vidro" com painéis liquid glass (`.glass` / `.glass-dark`
  em `src/index.css`) com fallback sólido para navegadores sem `backdrop-filter`
- Tokens de cor e tipografia no `@theme` do `src/index.css`
  (Fraunces display + Manrope texto; acento bronze `#c4823b`)
- Hero: recriação em GSAP do efeito Slider Revolution do tema Archipark
  (mosaico 17×17 desktop / 8×8 mobile, texto mascarado em 3 camadas, ~9s por slide)
- `prefers-reduced-motion` respeitado em todas as animações
