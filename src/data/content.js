/*
  Todo o conteúdo editável do site num lugar só.
  TODO (aguardando cliente):
   - Fotos reais dos projetos: as de /public/projetos, /public/focus e
     /public/sobre/equipe.webp são banco de imagens (Unsplash License, uso
     comercial liberado) e devem sair assim que o cliente mandar as dele
     (/public/sobre/sobre-nos.webp já é foto real da loja)
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

/* Domínio do site. Vale para o canonical, para as URLs absolutas do Open
   Graph e para o sitemap, que precisam da URL inteira */
export const SITE_URL = "https://brazvidros.com.br";

/* Capa padrão do preview de link (1200x630). Foto de obra entregue, não a
   logo: o preview costuma ser o primeiro contato com a marca */
export const OG_IMAGE = "/og-cover.jpg";
export const OG_IMAGE_ALT =
  "Logo da Braz Vidros, vidraçaria e esquadrias de alumínio em Novo Hamburgo";

/*
  Meta de cada página. É a fonte única do SEO e do sitemap, então rota nova
  entra aqui e aparece nos dois lugares.

  - `path`: a rota, de onde saem o canonical, a og:url e o <loc> do sitemap
  - `image`: capa 1200x630 do preview de link; sem ela vale a OG_IMAGE
  - `lastmod`: data da última mudança de conteúdo da página, escrita à mão.
    É o que vai para o sitemap, então atualize junto com o texto
  - `noindex`: tira a página do sitemap e manda `noindex, nofollow` para o
    robô. Hoje nenhuma rota usa, porque o site inteiro é público
*/
export const PAGE_META = {
  home: {
    path: "/",
    title: "Braz Vidros | Vidraçaria e Esquadrias de Alumínio em Novo Hamburgo",
    description:
      "Vidraçaria em Novo Hamburgo/RS: box, espelhos, sacadas, guarda-corpo, policarbonato e esquadrias de alumínio sob medida, com garantia de no mínimo 1 ano. Orçamento presencial ou pelo WhatsApp.",
    image: "/og-cover.jpg",
    imageAlt:
      "Logo da Braz Vidros, vidraçaria e esquadrias de alumínio em Novo Hamburgo",
    lastmod: "2026-09-17",
    changefreq: "monthly",
    priority: "1.0",
  },
  vidracaria: {
    path: "/vidracaria",
    title: "Vidraçaria em Novo Hamburgo | Braz Vidros",
    description:
      "Box de banheiro, espelhos sob medida, sacadas de vidro, guarda-corpo, coberturas de policarbonato e quiosques em Novo Hamburgo e região.",
    image: "/og-vidracaria.jpg",
    imageAlt: "Cortina de vidro instalada em sacada pela Braz Vidros",
    lastmod: "2026-09-17",
    changefreq: "monthly",
    priority: "0.9",
  },
  esquadrias: {
    path: "/esquadrias",
    title: "Esquadrias de Alumínio em Novo Hamburgo | Braz Vidros",
    description:
      "Janelas, portas, portões e fechamentos de alumínio fabricados sob medida para sua obra em Novo Hamburgo e região.",
    image: "/og-esquadrias.jpg",
    imageAlt: "Fachada de alumínio com vidro executada pela Braz Vidros",
    lastmod: "2026-09-17",
    changefreq: "monthly",
    priority: "0.9",
  },
  sobre: {
    path: "/sobre",
    title: "Sobre a Braz Vidros | Vidraçaria em Novo Hamburgo",
    description:
      "A história da Braz Vidros: vidraçaria e esquadrias de alumínio em Novo Hamburgo/RS, com medição e instalação próprias, garantia de no mínimo 1 ano e pós-venda de verdade.",
    image: "/og-sobre.jpg",
    imageAlt: "Fachada da loja da Braz Vidros em Novo Hamburgo",
    lastmod: "2026-09-17",
    changefreq: "yearly",
    priority: "0.6",
  },
  contato: {
    path: "/contato",
    title: "Contato | Braz Vidros",
    description:
      "Peça seu orçamento presencial ou pelo WhatsApp: vidraçaria e esquadrias de alumínio em Novo Hamburgo e região.",
    lastmod: "2026-09-17",
    changefreq: "yearly",
    priority: "0.8",
  },
  privacidade: {
    path: "/privacidade",
    title: "Política de Privacidade | Braz Vidros",
    description:
      "Como a Braz Vidros trata os dados pessoais de quem visita o site e pede orçamento, conforme a LGPD (Lei 13.709/2018).",
    lastmod: "2026-09-17",
    changefreq: "yearly",
    priority: "0.3",
  },
  /* A página de endereço errado. `noindex` tira ela do sitemap e manda o robô
     não guardar: página de erro indexada rouba o lugar da página certa */
  naoEncontrada: {
    path: "/404",
    title: "Página não encontrada | Braz Vidros",
    description:
      "O endereço que você tentou abrir não existe no site da Braz Vidros. Veja aqui as páginas de vidraçaria, esquadrias, sobre e contato.",
    noindex: true,
  },
};

/* As rotas que entram no sitemap: as mesmas do PAGE_META, menos as marcadas
   com noindex. A rota coringa (*) cai na home e não é listada em lugar
   nenhum, senão o sitemap apontaria para uma página que não existe */
export const SITEMAP_ROUTES = Object.values(PAGE_META).filter(
  (page) => !page.noindex,
);

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
    title: "Orçamento",
    text: "Presencial ou pelo WhatsApp: fotos e medidas aproximadas já bastam.",
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
    text: "Vidro temperado certificado e perfis de alumínio de qualidade, com acabamento pensado para o clima do Sul.",
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
    image: "/hero/vidracaria.webp",
    label: "Vidraçaria em Novo Hamburgo",
    title: ["Vidro sob medida,", "do box à fachada"],
    lede: "Medição, fabricação e instalação com prazo fechado, sem intermediário no meio do caminho.",
    cta: {
      text: "Pedir orçamento",
      href: waLink("Olá! Quero um orçamento com a Braz Vidros."),
    },
  },
  {
    image: "/hero/hero-esquadrias.webp",
    label: "Esquadrias de Alumínio",
    title: ["Alumínio com", "precisão de milímetro"],
    lede: "Janelas, portas e fechamentos fabricados na medida exata da obra, com vedação correta.",
    cta: {
      text: "Pedir orçamento",
      href: waLink("Olá! Quero um orçamento de esquadrias de alumínio."),
    },
  },
  {
    image: "/hero/hero-sacadas.webp",
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
    text: "Box de banheiro, espelhos, sacadas e guarda-corpo instalados com vidro temperado de procedência. Medição no local, corte sob medida e instalação limpa.",
    image: "/focus/focus-vidracaria.webp",
    link: "/vidracaria",
    linkText: "Ver tudo em vidraçaria",
  },
  {
    id: "esquadrias",
    title: "Esquadrias de Alumínio",
    text: "Janelas, portas e fechamentos de alumínio fabricados na medida exata da sua obra. Perfis de qualidade, vedação correta e acabamento que dura.",
    image: "/focus/focus-esquadrias.webp",
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
    text: "Segurança com vidro temperado e fixação estrutural certificada.",
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

/*
  Portfólio completo. `spec` é a especialidade e é o que separa as galerias:
  "vidro" alimenta a página da vidraçaria, "aluminio" a de esquadrias.
  `destaque: true` marca as oito obras que aparecem na home, quatro de cada
  especialidade, na ordem em que entram na grade.
*/
export const PORTFOLIO = [
  {
    image: "/projetos/box.webp",
    title: "Box incolor em apartamento",
    category: "Box",
    spec: "vidro",
    destaque: true,
  },
  {
    image: "/projetos/espelho.webp",
    title: "Espelho bisotado na sala",
    category: "Espelhos",
    spec: "vidro",
    destaque: true,
  },
  {
    image: "/projetos/sacada.webp",
    title: "Cortina de vidro na sacada",
    category: "Sacadas",
    spec: "vidro",
    destaque: true,
  },
  {
    image: "/projetos/guarda-corpo.webp",
    title: "Guarda-corpo de escada",
    category: "Guarda-corpo",
    spec: "vidro",
    destaque: true,
  },
  {
    image: "/projetos/pergolado.webp",
    title: "Pergolado em área externa",
    category: "Policarbonato",
    spec: "vidro",
  },
  {
    image: "/projetos/quiosque.webp",
    title: "Quiosque envidraçado",
    category: "Sacadas",
    spec: "vidro",
  },
  {
    image: "/projetos/janelas.webp",
    title: "Janelas de correr em casa nova",
    category: "Janelas",
    spec: "aluminio",
    destaque: true,
  },
  {
    image: "/projetos/porta.webp",
    title: "Porta pivotante na entrada",
    category: "Portas",
    spec: "aluminio",
    destaque: true,
  },
  {
    image: "/projetos/fachada.webp",
    title: "Fachada de alumínio com vidro",
    category: "Fachadas",
    spec: "aluminio",
    destaque: true,
  },
  {
    image: "/projetos/porta-correr.webp",
    title: "Porta de correr entre sala e pátio",
    category: "Portas de correr",
    spec: "aluminio",
    destaque: true,
  },
];

/* As oito obras da galeria da home, já na ordem: vidro primeiro, alumínio
   depois, para que o filtro "Tudo" mostre uma linha de cada especialidade */
export const PORTFOLIO_DESTAQUE = PORTFOLIO.filter((p) => p.destaque);

/* Os três botões do filtro da home. O id casa com o campo `spec`;
   "tudo" é o estado inicial e não filtra nada.
   `curto` é o que aparece no celular: as três opções dividem a largura da
   tela em partes iguais, e "Esquadrias de alumínio" não cabe num terço de
   320px sem quebrar em duas linhas */
export const PORTFOLIO_FILTROS = [
  { id: "tudo", label: "Tudo", curto: "Tudo" },
  { id: "vidro", label: "Vidro temperado", curto: "Vidro" },
  { id: "aluminio", label: "Esquadrias de alumínio", curto: "Alumínio" },
];

/* Endereço da empresa: alimenta o Contato, o rodapé e o schema.org */
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

/* O mapa embutido é um iframe do Google e grava cookie de terceiro. Ele entra
   junto com a página de Contato, sem depender de clique, e é por isso que a
   política de privacidade descreve esse carregamento em separado */
export const mapEmbed = (zoom = 17) =>
  `https://www.google.com/maps?q=${encodeURIComponent(addressLine)}&z=${zoom}&output=embed`;

export const mapLink = () =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressLine)}`;

/* Os canais da página de contato, na ordem em que aparecem. O canal sem
   `href` é só informação */
export const CONTACT_CHANNELS = [
  {
    label: "WhatsApp",
    value: PHONE,
    text: "Mande foto do ambiente e as medidas aproximadas. Respondemos no mesmo dia útil.",
    href: waLink("Olá! Quero um orçamento com a Braz Vidros."),
    external: true,
  },
  {
    label: "Onde estamos",
    value: ADDRESS.street,
    text: `${ADDRESS.district}, ${ADDRESS.city}, ${ADDRESS.state}, ${ADDRESS.cep}`,
    href: mapLink(),
    external: true,
  },
  {
    label: "Instagram",
    value: "@braz_vidross",
    text: "As obras recentes aparecem lá antes de virarem foto no site.",
    href: INSTAGRAM,
    external: true,
  },
  {
    label: "Atendimento",
    value: "Segunda a sexta",
    text: "Das 8h às 11h30 e das 13h às 18h.",
  },
];

/* Os números do texto saem das mesmas constantes da faixa do hero, então
   viram 10 anos e 4.500 instalações sozinhos na virada do ano */
export const ABOUT = {
  eyebrow: "Sobre a Braz Vidros",
  title: "Mesma equipe da medida à instalação",
  text: [
    "A Braz Vidros nasceu de um sonho: construir uma empresa reconhecida pela qualidade, pela responsabilidade e pela confiança em cada projeto realizado.",
    `Começamos com uma estrutura pequena, atendendo os primeiros clientes, e crescemos obra por obra. Hoje são ${ANOS_DE_ESTRADA} anos de experiência e mais de ${PROJETOS_ENTREGUES.toLocaleString("pt-BR")} instalações em Novo Hamburgo e região, do box de banheiro à fachada comercial.`,
    "Do orçamento à instalação, quem mede é quem instala, com vidro temperado de procedência e perfis de alumínio de qualidade. E o serviço não acaba na entrega: todo trabalho tem garantia de no mínimo 1 ano e seguimos à disposição depois que a obra fica pronta.",
  ],
  image: "/sobre/sobre-nos.webp",
  imageAlt: "Fachada da loja da Braz Vidros em Novo Hamburgo",
};

/* Resumo do Sobre que vai na home, entre a galeria e a chamada final.
   Texto próprio e mais curto que o da página Sobre de propósito: a home
   diz quem é a empresa em três linhas e manda quem quiser mais para /sobre */
export const ABOUT_HOME = {
  eyebrow: ABOUT.eyebrow,
  title: ABOUT.title,
  text: "Começamos com uma estrutura pequena e crescemos obra por obra, com o mesmo compromisso de sempre: qualidade na instalação, confiança no atendimento e presença também no pós-venda.",
  /* Foto própria, e não a ABOUT.image: a da página Sobre é vertical e na
     faixa da home ela entra deitada, cortando justo a placa da loja */
  image: "/sobre/equipe.webp",
  imageAlt: "Equipe da Braz Vidros em instalação",
  link: "/sobre",
  linkText: "Conheça a Braz Vidros",
};

/* Nossa história, do jeito que o cliente conta */
export const ABOUT_STORY = {
  eyebrow: "Nossa história",
  title: "Nossa história",
  lede: "Crescemos, ampliamos os serviços e melhoramos os processos, mas os princípios que nos trouxeram até aqui continuam os mesmos.",
  /* O fechamento sempre foi uma lista de três dentro de um período só. Em
     itens separados cada promessa ganha o próprio espaço na fita, e o título
     vem partido em dois: a primeira metade em romano, a segunda em itálico.
     "Presença" no último item, e não "compromisso", para não repetir a
     palavra que já está no título */
  closing: {
    title: "O compromisso",
    titleItalic: "da Braz Vidros",
    items: [
      "Qualidade na instalação",
      "Confiança no atendimento",
      "Presença no pós-venda",
    ],
  },
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
