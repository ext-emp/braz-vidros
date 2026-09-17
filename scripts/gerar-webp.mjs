/*
  Converte as imagens de public/ para WebP, com a sharp.

  Três receitas, porque as fontes são diferentes:

  - Foto (JPEG): WebP em qualidade 85. WebP sem perda em cima de JPEG não
    devolve qualidade nenhuma, porque o que o JPEG jogou fora já foi, e ainda
    engorda o arquivo: o codificador passa a ter que guardar com fidelidade
    total até o ruído da compressão anterior. Medido neste acervo, 90 deixou
    quatro fotos maiores que o original e 85 tirou de 13% a 29% sem diferença
    visível.
  - Desenho em PNG (a logo): WebP sem perda de verdade, pixel por pixel. Em
    arte chapada o sem perda é barato, e aqui ainda ficou 31% menor.
  - Foto em PNG com transparência (o recorte do hero): qualidade 92 com canal
    alfa intacto. Sem perda, esse arquivo ficaria em 1,4 MB, e ele é a imagem
    que o navegador baixa primeiro, com preload, para fechar o LCP da home.

  As capas de preview (og-*.jpg) ficam de fora de propósito: o robô do WhatsApp
  não renderiza WebP, e o preview de link sairia sem imagem.

  Roda à mão com `npm run webp`. Não entra no build: os .webp são versionados
  junto com o resto do site.
*/
import { readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, extname, join, relative } from "node:path";
import sharp from "sharp";

const raiz = join(dirname(fileURLToPath(import.meta.url)), "..");
const base = join(raiz, "public");

/* Capas do Open Graph: nome começa com og-. Continuam em JPEG */
const ehCapaSocial = (arquivo) => /^og-/.test(arquivo);

const FOTOS = [".jpg", ".jpeg"];
const PNGS = [".png"];

/* PNG que é foto, e não desenho: vai com perda, senão fica em megabytes.
   Hoje só o recorte do hero se encaixa */
const ehFotoEmPng = (arquivo) => arquivo === "vidracaria.png";

async function listar(pasta) {
  const entradas = await readdir(pasta, { withFileTypes: true });
  const arquivos = [];
  for (const entrada of entradas) {
    const caminho = join(pasta, entrada.name);
    if (entrada.isDirectory()) arquivos.push(...(await listar(caminho)));
    else arquivos.push(caminho);
  }
  return arquivos;
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0).padStart(5)} kB`;

const arquivos = await listar(base);
let entrou = 0;
let saiu = 0;
let convertidos = 0;

for (const caminho of arquivos) {
  const ext = extname(caminho).toLowerCase();
  const nome = caminho.split(/[\\/]/).pop();
  const foto = FOTOS.includes(ext);
  const png = PNGS.includes(ext);

  if ((!foto && !png) || ehCapaSocial(nome)) continue;

  const semPerda = png && !ehFotoEmPng(nome);
  const destino = caminho.slice(0, -ext.length) + ".webp";
  const original = (await stat(caminho)).size;

  let receita;
  if (semPerda) receita = { lossless: true, effort: 6 };
  else if (png) receita = { quality: 92, alphaQuality: 100, effort: 6 };
  else receita = { quality: 85, effort: 6 };

  const buffer = await sharp(caminho).webp(receita).toBuffer();

  await writeFile(destino, buffer);

  entrou += original;
  saiu += buffer.length;
  convertidos++;

  const queda = (100 - (buffer.length / original) * 100).toFixed(0);
  console.log(
    `${relative(raiz, destino).padEnd(38)} ${kb(original)} -> ${kb(buffer.length)}  ${queda.padStart(3)}% menor  ${semPerda ? "(sem perda)" : ""}`
  );
}

console.log(
  `\n${convertidos} imagens convertidas: ${kb(entrou)} -> ${kb(saiu)} (${(100 - (saiu / entrou) * 100).toFixed(0)}% menor)`
);
