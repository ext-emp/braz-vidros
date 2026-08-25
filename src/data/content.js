/*
  Todo o conteúdo editável do site num lugar só.
  TODO (aguardando cliente):
   - Fotos reais dos projetos: as de /public/projetos, /public/focus e
     /public/sobre são banco de imagens (Unsplash License, uso comercial
     liberado) e devem sair assim que o cliente mandar as dele
   - Logo, se existir
*/

export const WHATSAPP = "5551995475761";
export const INSTAGRAM = "https://www.instagram.com/braz_vidross";

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Vidraçaria", href: "/vidracaria" },
  { label: "Esquadrias", href: "/esquadrias" },
  { label: "Projetos", href: "/projetos" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

/* Meta de cada página (título da aba + description) */
export const PAGE_META = {
  home: {
    title: "Braz Vidros | Vidraçaria e Esquadrias de Alumínio em Novo Hamburgo",
    description:
      "Vidraçaria em Novo Hamburgo/RS: box, espelhos, sacadas, guarda-corpo, policarbonato e esquadrias de alumínio sob medida. Orçamento pelo WhatsApp.",
  },
  vidracaria: {
    title: "Vidraçaria em Novo Hamburgo | Braz Vidros",
    description:
      "Box de banheiro, espelhos sob medida, sacadas de vidro, guarda-corpo, coberturas de policarbonato e quiosques em Novo Hamburgo e região.",
  },
  esquadrias: {
    title: "Esquadrias de Alumínio em Novo Hamburgo | Braz Vidros",
    description:
      "Janelas, portas, portões e fechamentos de alumínio fabricados sob medida para sua obra em Novo Hamburgo e região.",
  },
  projetos: {
    title: "Projetos | Braz Vidros",
    description:
      "Trabalhos instalados de vidraçaria e esquadrias de alumínio em Novo Hamburgo e região: box, espelhos, sacadas, guarda-corpo e mais.",
  },
  sobre: {
    title: "Sobre a Braz Vidros | Vidraçaria em Novo Hamburgo",
    description:
      "Conheça a Braz Vidros: vidraçaria e esquadrias de alumínio com medição, fabricação e instalação próprias em Novo Hamburgo/RS.",
  },
  contato: {
    title: "Contato | Braz Vidros",
    description:
      "Peça seu orçamento pelo WhatsApp: vidraçaria e esquadrias de alumínio em Novo Hamburgo e região.",
  },
};

/* Como funciona o serviço, do primeiro contato à entrega */
export const PROCESS = [
  {
    step: "01",
    title: "Orçamento pelo WhatsApp",
    text: "Fotos do ambiente e medidas aproximadas já bastam para o primeiro valor.",
  },
  {
    step: "02",
    title: "Medição no local",
    text: "Quem mede é quem instala: conferimos cada vão antes de fabricar.",
  },
  {
    step: "03",
    title: "Fabricação sob medida",
    text: "Vidro e alumínio cortados na medida exata do seu projeto.",
  },
  {
    step: "04",
    title: "Instalação limpa",
    text: "Instalação agendada, rápida e sem sujeira na sua casa ou obra.",
  },
];

export const DIFFERENTIALS = [
  {
    title: "Quem mede é quem instala",
    text: "Sem intermediário: a mesma equipe faz o orçamento, a medição e a instalação, sem surpresa no dia da entrega.",
  },
  {
    title: "Material de procedência",
    text: "Vidro temperado e laminado certificados e perfis de alumínio de qualidade, com acabamento pensado para o clima do Sul.",
  },
  {
    title: "Vidro e alumínio juntos",
    text: "As duas especialidades na mesma empresa: você fecha a obra inteira com um fornecedor só.",
  },
  {
    title: "Atendimento direto",
    text: "Orçamento sem compromisso pelo WhatsApp, de segunda a sábado, em Novo Hamburgo e região.",
  },
];

/* Fotos do hero: Unsplash License (uso comercial liberado, sem atribuição).
   Substituir por fotos reais de projetos quando o cliente enviar. */
export const HERO_SLIDES = [
  {
    image: "/hero/hero-vidracaria.jpg",
    label: "Vidraçaria em Novo Hamburgo",
    title: ["Vidro sob medida,", "do box à fachada"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento com a Braz Vidros.") },
  },
  {
    image: "/hero/hero-esquadrias.jpg",
    label: "Esquadrias de Alumínio",
    title: ["Alumínio com", "precisão de milímetro"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento de esquadrias de alumínio.") },
  },
  {
    image: "/hero/hero-sacadas.jpg",
    label: "Sacadas & Coberturas",
    title: ["Sua vista,", "sem nada no caminho"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento de sacada de vidro.") },
  },
];

export const FOCUS = [
  {
    id: "vidracaria",
    title: "Vidraçaria",
    text: "Box de banheiro, espelhos, sacadas e guarda-corpo instalados com vidro temperado e laminado de procedência. Medição no local, corte sob medida e instalação limpa.",
    image: "/focus/focus-vidracaria.jpg",
    link: "/vidracaria",
  },
  {
    id: "esquadrias",
    title: "Esquadrias de Alumínio",
    text: "Janelas, portas e fechamentos de alumínio fabricados na medida exata da sua obra. Perfis de qualidade, vedação correta e acabamento que dura.",
    image: "/focus/focus-esquadrias.jpg",
    link: "/esquadrias",
  },
];

/* `icon` casa com as chaves do mapa em ServiceCard.jsx */
export const SERVICES_GLASS = [
  { icon: "box", title: "Box de banheiro", text: "Vidro temperado com perfis discretos, no padrão do seu banheiro." },
  { icon: "espelho", title: "Espelhos sob medida", text: "Lapidados, bisotados ou com iluminação, cortados na medida." },
  { icon: "sacada", title: "Sacadas de vidro", text: "Fechamento e cortina de vidro para aproveitar a sacada o ano todo." },
  { icon: "guardaCorpo", title: "Guarda-corpo", text: "Segurança com vidro laminado e fixação estrutural certificada." },
  { icon: "cobertura", title: "Coberturas de policarbonato", text: "Luz natural com proteção para pergolados, garagens e áreas de serviço." },
  { icon: "quiosque", title: "Quiosques e cabanas", text: "Estruturas envidraçadas para área de lazer e comércio." },
];

export const SERVICES_ALUMINUM = [
  { icon: "janela", title: "Janelas de alumínio", text: "De correr, maxim-ar ou integradas, com vidro incluso." },
  { icon: "porta", title: "Portas e portões", text: "Pivotantes, de correr e de giro, no acabamento da sua fachada." },
  { icon: "fachada", title: "Fechamentos e fachadas", text: "Pele de vidro e fechamentos comerciais completos." },
  { icon: "medida", title: "Sob medida para obra", text: "Fabricação conforme o vão da sua construção ou reforma." },
];

export const PORTFOLIO = [
  { image: "/projetos/box.jpg", title: "Box incolor em apartamento", category: "Box" },
  { image: "/projetos/espelho.jpg", title: "Espelho bisotado na sala", category: "Espelhos" },
  { image: "/projetos/sacada.jpg", title: "Cortina de vidro na sacada", category: "Sacadas" },
  { image: "/projetos/guarda-corpo.jpg", title: "Guarda-corpo de escada", category: "Guarda-corpo" },
  { image: "/projetos/pergolado.jpg", title: "Pergolado em área externa", category: "Policarbonato" },
  { image: "/projetos/janelas.jpg", title: "Janelas de correr em casa nova", category: "Esquadrias" },
  { image: "/projetos/porta.jpg", title: "Porta pivotante na entrada", category: "Esquadrias" },
  { image: "/projetos/quiosque.jpg", title: "Quiosque envidraçado", category: "Sacadas" },
];

export const PORTFOLIO_CATEGORIES = [
  "Todos",
  "Box",
  "Espelhos",
  "Sacadas",
  "Guarda-corpo",
  "Policarbonato",
  "Esquadrias",
];

/* Endereço da empresa: alimenta o mapa do Contato, o rodapé e o schema.org */
export const ADDRESS = {
  street: "R. Oswaldo Artur Hartz, 776",
  district: "Canudos",
  city: "Novo Hamburgo",
  state: "RS",
  cep: "93546-650",
};

export const addressLine = `${ADDRESS.street} - ${ADDRESS.district}, ${ADDRESS.city} - ${ADDRESS.state}, ${ADDRESS.cep}`;

/* Versão curta, sem CEP, para onde o espaço é apertado (rodapé) */
export const addressShort = `${ADDRESS.street} - ${ADDRESS.district}, ${ADDRESS.city} - ${ADDRESS.state}`;

export const mapEmbed = (zoom = 17) =>
  `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&z=${zoom}&output=embed`;

export const mapLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;

export const ABOUT = {
  eyebrow: "Sobre a Braz Vidros",
  title: "Feito aqui, instalado direito",
  text: [
    "A Braz Vidros atende Novo Hamburgo e região com serviços de vidraçaria e esquadrias de alumínio. Do orçamento à instalação, quem mede é quem instala, sem intermediário e sem surpresa no dia da entrega.",
    "Trabalhamos com vidro temperado e laminado de procedência e perfis de alumínio de qualidade, com acabamento pensado para durar no clima do Sul.",
  ],
  image: "/sobre/equipe.jpg",
  region: "Novo Hamburgo, Campo Bom, Estância Velha, São Leopoldo, Dois Irmãos e região",
};
