/*
  Textos jurídicos do site: política de privacidade e política de cookies.
  Ficam aqui, junto do resto do conteúdo editável, para o cliente conseguir
  revisar sem mexer em componente.

  Ao mudar qualquer coisa relevante, atualize LEGAL_UPDATED. E se entrar uma
  ferramenta nova que use cookies, suba também o VERSION em src/lib/consent.js:
  é o que faz o site pedir o consentimento outra vez.
*/

export const LEGAL_UPDATED = "2 de setembro de 2026";

/*
  As categorias do painel de preferências.
  `key` é o que casa com src/lib/consent.js. Necessários não têm key porque
  não podem ser desligados.
*/
export const COOKIE_CATEGORIES = [
  {
    id: "necessarios",
    name: "Necessários",
    required: true,
    summary:
      "Mantêm o site funcionando e guardam a sua escolha aqui. Sem eles a página não se lembra do que você respondeu neste aviso.",
    items: [
      {
        name: "bv:consent",
        provider: "Braz Vidros (este site)",
        purpose:
          "Guarda quais categorias de cookies você aceitou ou recusou. Fica no armazenamento local do navegador, não é enviado a ninguém.",
        duration: "6 meses",
      },
    ],
  },
  {
    id: "estatisticas",
    key: "analytics",
    name: "Estatísticas",
    required: false,
    summary:
      "Contam de forma agregada quais páginas são mais visitadas e por onde as pessoas chegam, para melhorarmos o site.",
    note: "Hoje o site não carrega nenhuma ferramenta de estatística. Se passarmos a usar, ela só será ativada depois do seu aceite nesta categoria.",
    items: [
      {
        name: "_ga, _ga_*",
        provider: "Google Analytics",
        purpose:
          "Distingue visitantes e sessões para gerar relatórios de audiência. Reservado para uso futuro.",
        duration: "até 2 anos",
      },
    ],
  },
  {
    id: "marketing",
    key: "marketing",
    name: "Marketing e conteúdo de terceiros",
    required: false,
    summary:
      "Liberam conteúdos hospedados por outras empresas dentro do site e permitem medir campanhas. É o que carrega o mapa do Google na página de Contato.",
    items: [
      {
        name: "NID, SOCS e afins",
        provider: "Google Maps",
        purpose:
          "Mapa incorporado na página de Contato. Enquanto esta categoria estiver desligada, mostramos no lugar dele um link para abrir o mapa direto no Google.",
        duration: "até 6 meses",
      },
    ],
  },
];

export const PRIVACY_SECTIONS = [
  {
    title: "Quem é o responsável pelos seus dados",
    text: [
      "A Braz Vidros, vidraçaria e esquadrias de alumínio com sede na R. Oswaldo Artur Hartz, 776, bairro Canudos, Novo Hamburgo/RS, é a controladora dos dados pessoais tratados neste site, nos termos da Lei Geral de Proteção de Dados (Lei 13.709/2018).",
      "Para falar sobre privacidade, pedir uma cópia dos seus dados ou solicitar a exclusão deles, use o WhatsApp (51) 99547-5761 ou procure a gente no endereço acima. O mesmo canal atende como encarregado pelo tratamento de dados pessoais.",
    ],
  },
  {
    title: "Quais dados tratamos",
    text: [
      "Este site não tem formulário de cadastro nem área de login. Só tratamos dois tipos de dado:",
    ],
    list: [
      "Dados que você mesmo envia quando decide falar com a gente: nome, telefone, endereço da obra, fotos e medidas enviadas pelo WhatsApp ou pelo Instagram, além do conteúdo da conversa.",
      "Dados de navegação gerados automaticamente: endereço IP, tipo de navegador e aparelho, páginas visitadas e horários, registrados pelo servidor que hospeda o site e, se você autorizar, por ferramentas de estatística.",
    ],
  },
  {
    title: "Para que usamos esses dados",
    text: ["Usamos as informações apenas para:"],
    list: [
      "Responder ao seu contato, montar o orçamento e agendar medição e instalação.",
      "Executar o serviço contratado e prestar a garantia e o pós-venda.",
      "Manter o site no ar, seguro e funcionando bem.",
      "Entender de forma agregada como o site é usado, quando você aceita os cookies de estatística.",
      "Cumprir obrigações fiscais e legais ligadas ao serviço prestado.",
    ],
  },
  {
    title: "Com que base legal",
    text: [
      "Cada uso tem sua base no artigo 7º da LGPD: o seu consentimento, para os cookies opcionais e para o contato que você inicia; a execução de contrato e dos procedimentos preliminares, quando você pede orçamento e contrata o serviço; o cumprimento de obrigação legal, para notas fiscais e prazos de guarda; e o legítimo interesse, para manter o site seguro e melhorá-lo, sempre sem tratar dados sensíveis.",
    ],
  },
  {
    title: "Com quem compartilhamos",
    text: [
      "Não vendemos, alugamos nem cedemos seus dados. O compartilhamento se limita ao necessário para o site e o atendimento funcionarem: a empresa que hospeda o site, o Google (fontes de texto e o mapa da página de Contato, este último só depois do seu aceite) e a Meta (WhatsApp e Instagram), quando é por lá que você escolhe conversar com a gente.",
      "Também podemos compartilhar informações se formos obrigados por lei, ordem judicial ou pedido de autoridade competente.",
    ],
  },
  {
    title: "Transferência internacional",
    text: [
      "Google e Meta processam dados em servidores fora do Brasil. Essa transferência acontece nos termos do artigo 33 da LGPD e das cláusulas de proteção adotadas por essas empresas. Se você não quiser esse tratamento, mantenha a categoria de marketing desligada e fale com a gente por telefone ou pessoalmente.",
    ],
  },
  {
    title: "Por quanto tempo guardamos",
    text: [
      "As conversas e os dados de orçamento ficam conosco enquanto durar o atendimento e, depois disso, pelo prazo da garantia e pelos prazos legais de guarda de documentos fiscais. Registros de navegação seguem o prazo do artigo 15 do Marco Civil da Internet. A sua escolha de cookies fica no seu navegador por 6 meses. Passado o prazo, apagamos ou anonimizamos.",
    ],
  },
  {
    title: "Segurança",
    text: [
      "O site é servido por conexão criptografada (HTTPS) e o acesso às conversas e aos dados de clientes é restrito a quem trabalha no atendimento e na instalação. Nenhum sistema é infalível, mas mantemos medidas técnicas e administrativas compatíveis com o porte da empresa e com o tipo de dado tratado.",
    ],
  },
  {
    title: "Seus direitos",
    text: [
      "O artigo 18 da LGPD garante que você pode, a qualquer momento e sem custo:",
    ],
    list: [
      "Confirmar se tratamos dados seus e pedir acesso a eles.",
      "Corrigir dados incompletos, inexatos ou desatualizados.",
      "Pedir a anonimização, o bloqueio ou a eliminação de dados desnecessários ou tratados fora da lei.",
      "Pedir a portabilidade dos dados a outro fornecedor.",
      "Eliminar os dados tratados com base no seu consentimento, respeitadas as guardas legais.",
      "Saber com quem compartilhamos seus dados.",
      "Revogar o consentimento, inclusive o de cookies, a qualquer momento.",
      "Se opor a um tratamento feito com base no legítimo interesse.",
    ],
    after: [
      "Basta pedir pelo WhatsApp (51) 99547-5761. Respondemos em até 15 dias. Se preferir, você também pode reclamar diretamente à Autoridade Nacional de Proteção de Dados (ANPD).",
    ],
  },
  {
    title: "Crianças e adolescentes",
    text: [
      "O site é voltado a quem contrata serviços de vidraçaria e esquadrias e não é dirigido a menores de 18 anos. Não coletamos dados de crianças e adolescentes de forma consciente. Se isso acontecer por engano, avise a gente e apagamos.",
    ],
  },
  {
    title: "Cookies",
    text: [
      "O uso de cookies e tecnologias parecidas está detalhado na Política de Cookies, onde você também consegue rever ou mudar as categorias que aceitou.",
    ],
  },
  {
    title: "Mudanças nesta política",
    text: [
      "Se esta política mudar, publicamos a versão nova nesta mesma página e atualizamos a data no topo. Quando a mudança envolver novas ferramentas com cookies, o aviso de consentimento aparece outra vez para você escolher de novo.",
    ],
  },
];

export const COOKIE_SECTIONS_INTRO = [
  {
    title: "O que são cookies",
    text: [
      "Cookies são arquivos pequenos que um site guarda no seu navegador para lembrar de alguma coisa entre uma página e outra. Junto deles existem tecnologias parecidas, como o armazenamento local, que é justamente onde este site guarda a sua escolha aqui embaixo.",
      "Nem todo cookie serve para rastrear alguém. Uns só fazem o site funcionar, outros contam visitas e outros vêm de empresas de fora, quando o site mostra um conteúdo hospedado por elas.",
    ],
  },
  {
    title: "Como este site usa",
    text: [
      "Quando você abre o site pela primeira vez, nada opcional é carregado: só entra em funcionamento depois que você aceita. Recusar não tira nenhuma função essencial da página, e a única diferença visível é o mapa da página de Contato, que fica no lugar substituído por um link.",
    ],
  },
];

export const COOKIE_SECTIONS_OUTRO = [
  {
    title: "Como mudar sua escolha depois",
    text: [
      "É só clicar no botão acima e ajustar as categorias, quantas vezes quiser. A escolha nova passa a valer na hora e substitui a anterior.",
      "Você também pode apagar ou bloquear cookies pelas configurações do próprio navegador, no menu de privacidade. Se limpar os dados do site, a sua escolha some junto e o aviso aparece de novo na próxima visita.",
    ],
  },
  {
    title: "Cookies de terceiros",
    text: [
      "Os cookies das categorias opcionais são criados pelas empresas donas de cada ferramenta, e são elas que definem a duração e a finalidade deles. Ao aceitar essas categorias, você também está sujeito às políticas de privacidade dessas empresas.",
      "Os links para WhatsApp, Instagram e Google Maps levam você para fora do site. O que acontece depois do clique é responsabilidade dessas plataformas.",
    ],
  },
  {
    title: "Por quanto tempo vale",
    text: [
      "A sua escolha fica guardada por 6 meses. Depois disso perguntamos outra vez, para o consentimento continuar atual. Se o site passar a usar alguma ferramenta nova com cookies, perguntamos antes do prazo.",
    ],
  },
];
