const CATEGORIAS = [
  { id: "box", label: "Box de banheiro", spec: "vidro" },
  { id: "sacadas", label: "Sacadas e fechamentos", spec: "vidro" },
  { id: "telhados", label: "Telhados e coberturas", spec: "vidro" },
  { id: "guarda-corpo", label: "Guarda-corpo", spec: "vidro" },
  { id: "portas", label: "Portas e janelas", spec: "aluminio" },
  { id: "espelhos", label: "Espelhos e outros", spec: "vidro" },
];

const FOTOS = [
  /* Box de banheiro */
  {
    arquivo: "Box-ate-o-teto-1",
    titulo: "Box até o teto",
    categoria: "box",
    alt: "Box de banheiro até o teto com perfis pretos, instalado pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Box-ate-o-teto-2",
    titulo: "Box até o teto",
    categoria: "box",
    alt: "Box de banheiro até o teto em vidro incolor com perfis cromados, instalado pela Braz Vidros",
  },
  {
    arquivo: "Box-ate-o-teto-3",
    titulo: "Box até o teto",
    categoria: "box",
    alt: "Box de banheiro até o teto em banheiro com revestimento cinza, instalado pela Braz Vidros",
  },

  /* Sacadas e fechamentos */
  {
    arquivo: "Sacada-de-vidro-1",
    titulo: "Sacada de vidro",
    categoria: "sacadas",
    alt: "Sacada fechada com vidro e perfis pretos, com vista para o pátio, instalada pela Braz Vidros",
  },
  {
    arquivo: "Sacada-de-vidro-2",
    titulo: "Sacada de vidro",
    categoria: "sacadas",
    alt: "Sacada com forro de madeira fechada em vidro de ponta a ponta pela Braz Vidros",
  },
  {
    arquivo: "Fechamento-em-vidro-1",
    titulo: "Fechamento em vidro",
    categoria: "sacadas",
    alt: "Fechamento em vidro de varanda coberta com vista para o pergolado, instalado pela Braz Vidros",
  },
  {
    arquivo: "Fechamento-em-vidro-2",
    titulo: "Fechamento em vidro",
    categoria: "sacadas",
    alt: "Fechamento em vidro voltado para o jardim, instalado pela Braz Vidros",
  },
  {
    arquivo: "Fechamento-em-vidro-piscina-1",
    titulo: "Fechamento em vidro na piscina",
    categoria: "sacadas",
    alt: "Fechamento em vidro com perfis pretos na área da piscina, instalado pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Fechamento-em-vidro-piscina-2",
    titulo: "Fechamento em vidro na piscina",
    categoria: "sacadas",
    alt: "Fechamento em vidro ao lado da piscina, visto de lado, instalado pela Braz Vidros",
  },
  {
    arquivo: "Fachada-de-vidro",
    titulo: "Fachada de vidro",
    categoria: "sacadas",
    alt: "Fachada de vidro com estrutura de alumínio preto, instalada pela Braz Vidros",
    // Estrutura de alumínio: é o serviço de fachadas da página de esquadrias
    spec: "aluminio",
  },

  /* Telhados e coberturas */
  {
    arquivo: "Telhado-de-vidro-1",
    titulo: "Telhado de vidro",
    categoria: "telhados",
    alt: "Telhado de vidro com estrutura escura visto de cima, instalado pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Telhado-de-vidro-2",
    titulo: "Telhado de vidro",
    categoria: "telhados",
    alt: "Telhado de vidro sobre área de residência, visto de cima, instalado pela Braz Vidros",
  },
  {
    arquivo: "Telhado-de-vidro-3",
    titulo: "Telhado de vidro",
    categoria: "telhados",
    alt: "Telhado de vidro escuro sobre área externa, instalado pela Braz Vidros",
  },
  {
    arquivo: "Telhado-de-vidro-4",
    titulo: "Telhado de vidro",
    categoria: "telhados",
    alt: "Telhado de vidro com estrutura preta na lateral da casa, visto de baixo, instalado pela Braz Vidros",
  },
  {
    arquivo: "Telhado-de-vidro-5",
    titulo: "Telhado de vidro",
    categoria: "telhados",
    alt: "Telhado de vidro com estrutura preta junto à casa, instalado pela Braz Vidros",
  },
  {
    arquivo: "Telhado-de-vidro-com-estrutura-em-aluminio",
    titulo: "Telhado de vidro com estrutura em alumínio",
    categoria: "telhados",
    alt: "Telhado de vidro com estrutura em alumínio preto visto de baixo, instalado pela Braz Vidros",
  },
  {
    arquivo: "Cobertura-de-vidro",
    titulo: "Cobertura de vidro",
    categoria: "telhados",
    alt: "Cobertura de vidro no corredor lateral da casa, instalada pela Braz Vidros",
  },

  /* Guarda-corpo */
  {
    arquivo: "Guarda-corpo-de-escada-1",
    titulo: "Guarda-corpo de escada",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro em escada, com fixação por botões de inox, instalado pela Braz Vidros",
  },
  {
    arquivo: "Guarda-corpo-de-escada-2",
    titulo: "Guarda-corpo de escada",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro acompanhando a escada, instalado pela Braz Vidros",
  },
  {
    arquivo: "Guarda-corpo-de-escada-3",
    titulo: "Guarda-corpo de escada",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro em escada clara, instalado pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Guarda-corpo-com-torre-inox",
    titulo: "Guarda-corpo com torre inox",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro com torres de inox em varanda com vista para o pátio, instalado pela Braz Vidros",
  },
  {
    arquivo: "Guarda-corpo-com-portao-de-correr-1",
    titulo: "Guarda-corpo com portão de correr",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro com torres de inox e portão de correr no acesso à escada, instalado pela Braz Vidros",
  },
  {
    arquivo: "Guarda-corpo-com-portao-de-correr-2",
    titulo: "Guarda-corpo com portão de correr",
    categoria: "guarda-corpo",
    alt: "Portão de correr de vidro no guarda-corpo da escada, instalado pela Braz Vidros",
  },
  {
    arquivo: "Guarda-corpo-de-piscina",
    titulo: "Guarda-corpo de piscina",
    categoria: "guarda-corpo",
    alt: "Guarda-corpo de vidro em volta da piscina, instalado pela Braz Vidros",
  },

  /* Portas e janelas */
  {
    arquivo: "Porta-em-vidro-acidato-com-mola-de-piso",
    titulo: "Porta de vidro acidato com mola de piso",
    categoria: "portas",
    alt: "Porta de vidro acidato com mola de piso e puxador de inox, instalada pela Braz Vidros",
    // Vidro temperado sem esquadria: é serviço da vidraçaria
    spec: "vidro",
  },
  {
    arquivo: "Porta-de-correr-de-vidro",
    titulo: "Porta de correr de vidro",
    categoria: "portas",
    alt: "Porta de correr de vidro com perfis pretos dando para o pátio, instalada pela Braz Vidros",
  },
  {
    arquivo: "Porta-de-vidro-jateado",
    titulo: "Porta de vidro jateado",
    categoria: "portas",
    alt: "Porta de vidro jateado com perfil preto, instalada pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Porta-em-esquadria-de-aluminio-1",
    titulo: "Porta em esquadria de alumínio",
    categoria: "portas",
    alt: "Porta de correr em esquadria de alumínio branco com quatro folhas, instalada pela Braz Vidros",
  },
  {
    arquivo: "Porta-de-aluminio",
    titulo: "Porta de alumínio",
    categoria: "portas",
    alt: "Porta de alumínio preta em ambiente interno, instalada pela Braz Vidros",
    destaque: true,
  },
  {
    arquivo: "Porta-de-aluminio-veneziana",
    titulo: "Porta de alumínio veneziana",
    categoria: "portas",
    alt: "Porta de alumínio veneziana branca com bandeira de vidro, instalada pela Braz Vidros",
  },
  {
    arquivo: "Janela-de-vidro",
    titulo: "Janela de vidro",
    categoria: "portas",
    alt: "Janela de vidro com perfis pretos e vista para a cidade, instalada pela Braz Vidros",
    destaque: true,
  },

  /* Espelhos e outros */
  {
    arquivo: "Espelho-1",
    titulo: "Espelho sob medida",
    categoria: "espelhos",
    alt: "Espelho sob medida cobrindo a parede e refletindo a sala, instalado pela Braz Vidros",
  },
  {
    arquivo: "Espelho-2",
    titulo: "Espelho sob medida",
    categoria: "espelhos",
    alt: "Espelho grande sob medida em parede de quarto, instalado pela Braz Vidros",
  },
  {
    arquivo: "Espelhos",
    titulo: "Espelhos",
    categoria: "espelhos",
    alt: "Dois espelhos altos instalados pela Braz Vidros em loja",
  },
  {
    arquivo: "Quadro-de-vidro",
    titulo: "Quadro de vidro",
    categoria: "espelhos",
    alt: "Quadro de vidro branco fixado na parede com botões de inox, instalado pela Braz Vidros",
  },
];

const CATEGORIA_POR_ID = Object.fromEntries(CATEGORIAS.map((c) => [c.id, c]));

export const GALERIA = FOTOS.map((f) => {
  const categoria = CATEGORIA_POR_ID[f.categoria];
  return {
    image: `/projetos/${f.arquivo}.webp`,
    thumb: `/projetos/mini/${f.arquivo}.webp`,
    title: f.titulo,
    alt: f.alt,
    category: categoria.label,
    spec: f.spec ?? categoria.spec,
    destaque: Boolean(f.destaque),
  };
});

export const srcsetDaGaleria = (image) => {
  const nome = /^\/projetos\/([^/]+)\.webp$/.exec(image ?? "")?.[1];
  return nome ? `/projetos/media/${nome}.webp 720w, ${image} 1600w` : undefined;
};
