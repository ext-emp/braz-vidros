/*
  Todo o conteúdo editável do site num lugar só.
  TODO (aguardando cliente):
   - WHATSAPP: número real (formato internacional, só dígitos)
   - Fotos reais dos projetos (substituir as URLs picsum.photos)
   - Logo, se existir
*/

export const WHATSAPP = "5551999999999"; // TODO: número real
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
    title: "Braz Vidros — Vidraçaria e Esquadrias de Alumínio em Novo Hamburgo",
    description:
      "Vidraçaria em Novo Hamburgo/RS: box, espelhos, sacadas, guarda-corpo, policarbonato e esquadrias de alumínio sob medida. Orçamento pelo WhatsApp.",
  },
  vidracaria: {
    title: "Vidraçaria em Novo Hamburgo — Braz Vidros",
    description:
      "Box de banheiro, espelhos sob medida, sacadas de vidro, guarda-corpo, coberturas de policarbonato e quiosques em Novo Hamburgo e região.",
  },
  esquadrias: {
    title: "Esquadrias de Alumínio em Novo Hamburgo — Braz Vidros",
    description:
      "Janelas, portas, portões e fechamentos de alumínio fabricados sob medida para sua obra em Novo Hamburgo e região.",
  },
  projetos: {
    title: "Projetos — Braz Vidros",
    description:
      "Trabalhos instalados de vidraçaria e esquadrias de alumínio em Novo Hamburgo e região: box, espelhos, sacadas, guarda-corpo e mais.",
  },
  sobre: {
    title: "Sobre a Braz Vidros — Vidraçaria em Novo Hamburgo",
    description:
      "Conheça a Braz Vidros: vidraçaria e esquadrias de alumínio com medição, fabricação e instalação próprias em Novo Hamburgo/RS.",
  },
  contato: {
    title: "Contato — Braz Vidros",
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
    text: "Sem intermediário: a mesma equipe faz o orçamento, a medição e a instalação — sem surpresa no dia da entrega.",
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

export const HERO_SLIDES = [
  {
    image: "https://picsum.photos/seed/brazhero1/1920/1200",
    label: "Vidraçaria em Novo Hamburgo",
    title: ["Vidro sob medida,", "do box à fachada"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento com a Braz Vidros.") },
  },
  {
    image: "https://picsum.photos/seed/brazhero2/1920/1200",
    label: "Esquadrias de Alumínio",
    title: ["Alumínio com", "precisão de milímetro"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento de esquadrias de alumínio.") },
  },
  {
    image: "https://picsum.photos/seed/brazhero3/1920/1200",
    label: "Sacadas & Coberturas",
    title: ["Sua vista,", "sem nada no caminho"],
    cta: { text: "Pedir orçamento", href: waLink("Olá! Quero um orçamento de sacada de vidro.") },
  },
];

export const FOCUS = [
  {
    id: "vidracaria",
    eyebrow: "Foco 01",
    title: "Vidraçaria",
    text: "Box de banheiro, espelhos, sacadas e guarda-corpo instalados com vidro temperado e laminado de procedência. Medição no local, corte sob medida e instalação limpa.",
    image: "https://picsum.photos/seed/brazfocus1/900/1100",
    link: "/vidracaria",
  },
  {
    id: "esquadrias",
    eyebrow: "Foco 02",
    title: "Esquadrias de Alumínio",
    text: "Janelas, portas e fechamentos de alumínio fabricados na medida exata da sua obra. Perfis de qualidade, vedação correta e acabamento que dura.",
    image: "https://picsum.photos/seed/brazfocus2/900/1100",
    link: "/esquadrias",
  },
];

export const SERVICES_GLASS = [
  { title: "Box de banheiro", text: "Vidro temperado com perfis discretos, no padrão do seu banheiro." },
  { title: "Espelhos sob medida", text: "Lapidados, bisotados ou com iluminação, cortados na medida." },
  { title: "Sacadas de vidro", text: "Fechamento e cortina de vidro para aproveitar a sacada o ano todo." },
  { title: "Guarda-corpo", text: "Segurança com vidro laminado e fixação estrutural certificada." },
  { title: "Coberturas de policarbonato", text: "Luz natural com proteção — pergolados, garagens e áreas de serviço." },
  { title: "Quiosques e cabanas", text: "Estruturas envidraçadas para área de lazer e comércio." },
];

export const SERVICES_ALUMINUM = [
  { title: "Janelas de alumínio", text: "De correr, maxim-ar ou integradas, com vidro incluso." },
  { title: "Portas e portões", text: "Pivotantes, de correr e de giro, no acabamento da sua fachada." },
  { title: "Fechamentos e fachadas", text: "Pele de vidro e fechamentos comerciais completos." },
  { title: "Sob medida para obra", text: "Fabricação conforme o vão da sua construção ou reforma." },
];

export const PORTFOLIO = [
  { image: "https://picsum.photos/seed/brazport1/800/600", title: "Box incolor — apartamento", category: "Box" },
  { image: "https://picsum.photos/seed/brazport2/800/600", title: "Espelho bisotado — sala", category: "Espelhos" },
  { image: "https://picsum.photos/seed/brazport3/800/600", title: "Cortina de vidro — sacada", category: "Sacadas" },
  { image: "https://picsum.photos/seed/brazport4/800/600", title: "Guarda-corpo — escada", category: "Guarda-corpo" },
  { image: "https://picsum.photos/seed/brazport5/800/600", title: "Pergolado — área externa", category: "Policarbonato" },
  { image: "https://picsum.photos/seed/brazport6/800/600", title: "Janelas de correr — casa nova", category: "Esquadrias" },
  { image: "https://picsum.photos/seed/brazport7/800/600", title: "Porta pivotante — entrada", category: "Esquadrias" },
  { image: "https://picsum.photos/seed/brazport8/800/600", title: "Quiosque envidraçado", category: "Sacadas" },
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

export const ABOUT = {
  eyebrow: "Sobre a Braz Vidros",
  title: "Feito aqui, instalado direito",
  text: [
    "A Braz Vidros atende Novo Hamburgo e região com serviços de vidraçaria e esquadrias de alumínio. Do orçamento à instalação, quem mede é quem instala — sem intermediário e sem surpresa no dia da entrega.",
    "Trabalhamos com vidro temperado e laminado de procedência e perfis de alumínio de qualidade, com acabamento pensado para durar no clima do Sul.",
  ],
  image: "https://picsum.photos/seed/brazabout/1000/800",
  region: "Novo Hamburgo · Campo Bom · Estância Velha · São Leopoldo · Dois Irmãos e região",
};
