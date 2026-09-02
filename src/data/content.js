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

/* Mesmo número do WhatsApp, nos dois formatos que a interface precisa:
   um para ler e outro para discar */
export const PHONE = "(51) 99547-5761";
export const PHONE_HREF = "tel:+5551995475761";

export const waLink = (text) =>
  `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

export const NAV_LINKS = [
  { label: "Início", href: "/" },
  { label: "Vidraçaria", href: "/vidracaria" },
  { label: "Esquadrias", href: "/esquadrias" },
  { label: "Sobre", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

/* Meta de cada página (título da aba + description) */
export const PAGE_META = {
  home: {
    title: "Braz Vidros | Vidraçaria e Esquadrias de Alumínio em Novo Hamburgo",
    description:
      "Vidraçaria em Novo Hamburgo/RS: box, espelhos, sacadas, guarda-corpo, policarbonato e esquadrias de alumínio sob medida, com garantia de no mínimo 1 ano. Orçamento pelo WhatsApp.",
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
  sobre: {
    title: "Sobre a Braz Vidros | Vidraçaria em Novo Hamburgo",
    description:
      "A história da Braz Vidros: vidraçaria e esquadrias de alumínio em Novo Hamburgo/RS, com medição e instalação próprias, garantia de no mínimo 1 ano e pós-venda de verdade.",
  },
  contato: {
    title: "Contato | Braz Vidros",
    description:
      "Peça seu orçamento pelo WhatsApp: vidraçaria e esquadrias de alumínio em Novo Hamburgo e região.",
  },
};

/*
  Faixa de números no rodapé do hero.
  Anos de experiência e projetos entregues crescem sozinhos na virada do ano:
  a base é 2026 (9 anos, 4 mil projetos) e cada ano novo soma 1 ano e 500
  projetos. Assim 2027 mostra 10 anos e 4.500+ sem ninguém tocar no código.
*/
const STATS_ANO_BASE = 2026;
const ANOS_NO_ANO_BASE = 9;
const PROJETOS_NO_ANO_BASE = 4000;
const PROJETOS_POR_ANO = 500;

const anosDesdeBase = Math.max(0, new Date().getFullYear() - STATS_ANO_BASE);

export const ANOS_DE_ESTRADA = ANOS_NO_ANO_BASE + anosDesdeBase;
export const PROJETOS_ENTREGUES =
  PROJETOS_NO_ANO_BASE + anosDesdeBase * PROJETOS_POR_ANO;

export const HERO_STATS = [
  { value: `${ANOS_DE_ESTRADA}`, label: "Anos de experiência" },
  {
    value: `${PROJETOS_ENTREGUES.toLocaleString("pt-BR")}+`,
    label: "Projetos entregues",
  },
  { value: "1 ano", label: "Garantia mínima" },
];

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
    text: "Agendada, rápida e sem sujeira, com garantia de no mínimo 1 ano.",
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
    title: "Garantia de no mínimo 1 ano",
    text: "Todo serviço sai com garantia mínima de 1 ano. Se precisar depois da entrega, a gente volta e resolve.",
  },
];

/* Fotos do hero: Unsplash License (uso comercial liberado, sem atribuição).
   Substituir por fotos reais de projetos quando o cliente enviar. */
export const HERO_SLIDES = [
  {
    image: "/hero/vidracaria.png",
    label: "Vidraçaria em Novo Hamburgo",
    title: ["Vidro sob medida,", "do box à fachada"],
    lede: "Medição, fabricação e instalação com prazo fechado, sem intermediário no meio do caminho.",
    cta: {
      text: "Pedir orçamento",
      href: waLink("Olá! Quero um orçamento com a Braz Vidros."),
    },
  },
  {
    image: "/hero/hero-esquadrias.jpg",
    label: "Esquadrias de Alumínio",
    title: ["Alumínio com", "precisão de milímetro"],
    lede: "Janelas, portas e fechamentos fabricados na medida exata da obra, com vedação correta.",
    cta: {
      text: "Pedir orçamento",
      href: waLink("Olá! Quero um orçamento de esquadrias de alumínio."),
    },
  },
  {
    image: "/hero/hero-sacadas.jpg",
    label: "Sacadas & Coberturas",
    title: ["Sua vista,", "sem nada no caminho"],
    lede: "Sacadas de vidro e coberturas que abrem o ambiente sem abrir mão da segurança.",
    cta: {
      text: "Pedir orçamento",
      href: waLink("Olá! Quero um orçamento de sacada de vidro."),
    },
  },
];

export const FOCUS = [
  {
    id: "vidracaria",
    title: "Vidraçaria",
    text: "Box de banheiro, espelhos, sacadas e guarda-corpo instalados com vidro temperado e laminado de procedência. Medição no local, corte sob medida e instalação limpa.",
    image: "/focus/focus-vidracaria.jpg",
    link: "/vidracaria",
    linkText: "Ver tudo em vidraçaria",
  },
  {
    id: "esquadrias",
    title: "Esquadrias de Alumínio",
    text: "Janelas, portas e fechamentos de alumínio fabricados na medida exata da sua obra. Perfis de qualidade, vedação correta e acabamento que dura.",
    image: "/focus/focus-esquadrias.jpg",
    link: "/esquadrias",
    linkText: "Ver tudo em esquadrias",
  },
];

/* `icon` casa com as chaves do mapa em ServiceCard.jsx */
export const SERVICES_GLASS = [
  {
    icon: "box",
    title: "Box de banheiro",
    text: "Vidro temperado com perfis discretos, no padrão do seu banheiro.",
  },
  {
    icon: "espelho",
    title: "Espelhos sob medida",
    text: "Lapidados, bisotados ou com iluminação, cortados na medida.",
  },
  {
    icon: "sacada",
    title: "Sacadas de vidro",
    text: "Fechamento e cortina de vidro para aproveitar a sacada o ano todo.",
  },
  {
    icon: "guardaCorpo",
    title: "Guarda-corpo",
    text: "Segurança com vidro laminado e fixação estrutural certificada.",
  },
  {
    icon: "cobertura",
    title: "Coberturas de policarbonato",
    text: "Luz natural com proteção para pergolados, garagens e áreas de serviço.",
  },
  {
    icon: "quiosque",
    title: "Quiosques e cabanas",
    text: "Estruturas envidraçadas para área de lazer e comércio.",
  },
];

export const SERVICES_ALUMINUM = [
  {
    icon: "janela",
    title: "Janelas de alumínio",
    text: "De correr, maxim-ar ou integradas, com vidro incluso.",
  },
  {
    icon: "porta",
    title: "Portas e portões",
    text: "Pivotantes, de correr e de giro, no acabamento da sua fachada.",
  },
  {
    icon: "fachada",
    title: "Fechamentos e fachadas",
    text: "Pele de vidro e fechamentos comerciais completos.",
  },
  {
    icon: "medida",
    title: "Sob medida para obra",
    text: "Fabricação conforme o vão da sua construção ou reforma.",
  },
];

export const PORTFOLIO = [
  {
    image: "/projetos/box.jpg",
    title: "Box incolor em apartamento",
    category: "Box",
  },
  {
    image: "/projetos/espelho.jpg",
    title: "Espelho bisotado na sala",
    category: "Espelhos",
  },
  {
    image: "/projetos/sacada.jpg",
    title: "Cortina de vidro na sacada",
    category: "Sacadas",
  },
  {
    image: "/projetos/guarda-corpo.jpg",
    title: "Guarda-corpo de escada",
    category: "Guarda-corpo",
  },
  {
    image: "/projetos/pergolado.jpg",
    title: "Pergolado em área externa",
    category: "Policarbonato",
  },
  {
    image: "/projetos/janelas.jpg",
    title: "Janelas de correr em casa nova",
    category: "Esquadrias",
  },
  {
    image: "/projetos/porta.jpg",
    title: "Porta pivotante na entrada",
    category: "Esquadrias",
  },
  {
    image: "/projetos/quiosque.jpg",
    title: "Quiosque envidraçado",
    category: "Sacadas",
  },
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

/* Os números do texto saem das mesmas constantes da faixa do hero, então
   viram 10 anos e 4.500 instalações sozinhos na virada do ano */
export const ABOUT = {
  eyebrow: "Sobre a Braz Vidros",
  title: "Feito aqui, instalado direito",
  text: [
    "A Braz Vidros nasceu de um sonho: construir uma empresa reconhecida pela qualidade, pela responsabilidade e pela confiança em cada projeto realizado.",
    `Começamos com uma estrutura pequena, atendendo os primeiros clientes, e crescemos obra por obra. Hoje são ${ANOS_DE_ESTRADA} anos de experiência e mais de ${PROJETOS_ENTREGUES.toLocaleString("pt-BR")} instalações em Novo Hamburgo e região, do box de banheiro à fachada comercial.`,
    "Do orçamento à instalação, quem mede é quem instala, com vidro temperado e laminado de procedência e perfis de alumínio de qualidade. E o serviço não acaba na entrega: todo trabalho tem garantia de no mínimo 1 ano e seguimos à disposição depois que a obra fica pronta.",
  ],
  image: "/sobre/equipe.jpg",
};

/* Nossa história, do jeito que o cliente conta */
export const ABOUT_STORY = {
  eyebrow: "Nossa história",
  title: "De uma estrutura pequena a uma empresa de confiança",
  lede: "Crescemos, ampliamos os serviços e melhoramos os processos, mas os princípios que nos trouxeram até aqui continuam os mesmos.",
  closing:
    "Braz Vidros: qualidade na instalação, confiança no atendimento e compromisso também no pós-venda.",
  blocks: [
    {
      title: "Onde tudo começou",
      text: [
        "Começamos com uma estrutura menor, atendendo nossos primeiros clientes e construindo, pouco a pouco, aquilo que hoje se tornou a nossa empresa. Desde o início entendemos que trabalhar com vidro vai muito além de instalar um produto: é fazer parte da transformação de casas, comércios e ambientes, entregando segurança, beleza e funcionalidade.",
        "Com o passar dos anos fomos adquirindo experiência, aprimorando nossos processos e ampliando nossos serviços. Cada obra e cada cliente contribuíram para o nosso crescimento e para a reputação que buscamos manter até hoje.",
      ],
    },
    {
      title: "Atendimento e garantia",
      text: [
        "Uma das nossas principais qualidades sempre foi o compromisso com o pós-venda e a garantia dos serviços. Todo trabalho sai com garantia de no mínimo 1 ano, e desde o começo da nossa história fazemos questão de acompanhar o cliente mesmo depois da entrega da obra.",
        "Assumir a responsabilidade pelo serviço realizado é fundamental para nós. Quando o cliente precisa, estamos à disposição para resolver e prestar o suporte necessário. Queremos que ele fique satisfeito com o resultado e tenha a tranquilidade de saber que pode contar com a gente também depois da instalação.",
      ],
      highlight: "Nunca deixamos um cliente na mão.",
    },
    {
      title: "Mais do que vidro",
      text: [
        "Buscamos entender exatamente o que cada cliente precisa para oferecer uma solução adequada, segura e com excelente acabamento. São projetos residenciais e comerciais, sempre unindo qualidade, segurança, estética e durabilidade.",
        "Seja um box de banheiro, um fechamento de sacada, portas, janelas, esquadrias ou um projeto personalizado, cada trabalho recebe a mesma atenção e a mesma responsabilidade.",
      ],
    },
    {
      title: "Nossa essência",
      text: [
        "Crescemos, mas mantemos os mesmos princípios que nos trouxeram até aqui: qualidade no serviço, atendimento próximo, responsabilidade e compromisso com o cliente. Mais do que vender e instalar vidros, queremos construir relacionamentos duradouros e ser uma empresa em que o cliente possa confiar.",
        "É por isso que, para nós, uma obra bem feita não é apenas aquela que fica bonita no dia da instalação. É aquela em que o cliente continua tendo a certeza de que fez a escolha certa mesmo depois que o serviço foi concluído.",
      ],
    },
  ],
};
