/*
  Gera a public/og-cover.jpg, que é a miniatura do preview de link (WhatsApp,
  Facebook, Telegram, LinkedIn).

  A capa é a logo sobre o marinho da marca, no mesmo degradê das faixas do
  site. Fica em JPEG de propósito, e não em WebP: o robô do WhatsApp não
  renderiza WebP e o link sairia sem imagem nenhuma.

  1200x630 é o tamanho que o Open Graph pede, e é o que as tags
  og:image:width/height declaram no index.html.

  Roda à mão com `npm run capa`, quando a logo mudar.
*/
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const logo = join(raiz, "public", "logo-braz-vidros-2.png");
const destino = join(raiz, "public", "og-cover.jpg");

const LARGURA = 1200;
const ALTURA = 630;
/* A logo ocupa 55% da largura: menos que isso ela some na miniatura pequena
   que o WhatsApp mostra na lista de conversas, e mais que isso encosta nas
   bordas do cartão */
const LARGURA_LOGO = Math.round(LARGURA * 0.55);

const fundo = Buffer.from(
  `<svg width="${LARGURA}" height="${ALTURA}" xmlns="http://www.w3.org/2000/svg">
     <defs>
       <linearGradient id="marinho" x1="0" y1="0" x2="1" y2="1">
         <stop offset="0%" stop-color="#3a3d6e"/>
         <stop offset="55%" stop-color="#323560"/>
         <stop offset="100%" stop-color="#0c1622"/>
       </linearGradient>
     </defs>
     <rect width="${LARGURA}" height="${ALTURA}" fill="url(#marinho)"/>
   </svg>`
);

/* O arquivo da logo é o lettering escuro sobre transparência. O negate deixa
   ele branco sem tocar no canal alfa, que é o mesmo efeito do
   `brightness-0 invert` usado no rodapé do site */
const logoBranca = await sharp(logo)
  .negate({ alpha: false })
  .resize({ width: LARGURA_LOGO })
  .toBuffer();

const capa = await sharp(fundo)
  .composite([{ input: logoBranca, gravity: "centre" }])
  .jpeg({ quality: 92, chromaSubsampling: "4:4:4" })
  .toBuffer();

await writeFile(destino, capa);

const { width, height } = await sharp(capa).metadata();
console.log(
  `og-cover.jpg gerada: ${width}x${height}, ${(capa.length / 1024).toFixed(0)} kB`
);
