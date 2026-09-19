/*
  Medição do site: GA4 e conversões do Google Ads, os dois pelo mesmo gtag.js.

  O que governa este arquivo é a ordem das coisas. Primeiro o Consent Mode v2
  entra na fila do gtag negando tudo, e essa fila é só um array em memória, que
  não faz pedido nenhum para fora. O script do Google só é baixado quando a
  pessoa aceita. E recusar não apenas interrompe o envio: apaga os cookies de
  medição que por acaso já existam no navegador.

  Sem VITE_GA_ID e sem VITE_ADS_ID no build, tudo aqui fica inerte e o banner
  nem chega a aparecer, porque site que não mede não tem o que consentir. Os
  dois IDs são lidos na hora do build, então trocar o .env pede build novo.

  As conversões não saem de formulário, que o site não tem: saem do clique no
  WhatsApp e no telefone. Por isso o ouvinte de clique no fim do arquivo, que
  pega esses links onde quer que estejam, em vez de espalhar chamada de evento
  por oito componentes e esquecer de um na próxima tela que entrar.
*/

const env = import.meta.env;

/* ID de medição do GA4 (G-XXXXXXXXXX) e da conta do Google Ads (AW-000000000) */
export const GA_ID = (env.VITE_GA_ID || "").trim();
export const ADS_ID = (env.VITE_ADS_ID || "").trim();

/* Rótulo de cada conversão dentro da conta do Ads. Sem o rótulo o clique ainda
   vira evento no GA4, mas não conta como conversão no Ads, que é quem precisa
   do sinal para otimizar o lance */
const ADS_ROTULOS = {
  whatsapp: (env.VITE_ADS_LABEL_WHATSAPP || "").trim(),
  telefone: (env.VITE_ADS_LABEL_TELEFONE || "").trim(),
};

export const MEDICAO_ATIVA = Boolean(GA_ID || ADS_ID);

/* Evento de janela que o rodapé dispara para reabrir o banner: evita um
   contexto só para duas telas conversarem */
export const EVENTO_REVER = "bv:rever-consentimento";

const CHAVE = "bv:consentimento";

/* localStorage pode estourar em aba anônima ou com dados de site bloqueados.
   Na dúvida o site trata como "ainda não escolheu", que é o lado seguro */
export function lerConsentimento() {
  try {
    const v = localStorage.getItem(CHAVE);
    return v === "aceito" || v === "recusado" ? v : null;
  } catch {
    return null;
  }
}

function gravarConsentimento(valor) {
  try {
    localStorage.setItem(CHAVE, valor);
  } catch {
    /* Sem onde gravar, a escolha vale só para esta visita */
  }
}

const NEGADO = {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
};

const CONCEDIDO = {
  ad_storage: "granted",
  ad_user_data: "granted",
  ad_personalization: "granted",
  analytics_storage: "granted",
};

/* Precisa ser `function` com `arguments`: é assim que o gtag.js lê a fila que
   foi enfileirada antes dele chegar. Arrow function não tem `arguments` */
function gtag() {
  window.dataLayer.push(arguments);
}

let iniciado = false;
let tagNoDocumento = false;

export function iniciarMedicao() {
  if (!MEDICAO_ATIVA || iniciado || typeof window === "undefined") return;
  iniciado = true;

  window.dataLayer = window.dataLayer || [];

  /* Consent Mode v2 negado antes de qualquer tag. Nada disso vai para a rede
     agora: fica na fila, e é o que o Google lê para saber que pode modelar a
     conversão de quem recusou sem gravar cookie nenhum */
  gtag("consent", "default", {
    ...NEGADO,
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
  gtag("js", new Date());

  ouvirCliquesDeContato();

  /* Quem já aceitou numa visita anterior não vê o banner de novo */
  if (lerConsentimento() === "aceito") carregarTag();
}

function carregarTag() {
  if (tagNoDocumento) return;
  tagNoDocumento = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID || ADS_ID}`;
  document.head.appendChild(s);

  /* send_page_view desligado de propósito: numa SPA só a primeira carga passa
     pelo gtag, e as trocas de rota não gerariam nada. Quem manda o page_view,
     em toda rota, é o pageView() daqui */
  if (GA_ID) gtag("config", GA_ID, { send_page_view: false });
  if (ADS_ID) gtag("config", ADS_ID);
}

export function aceitar() {
  gravarConsentimento("aceito");
  gtag("consent", "update", CONCEDIDO);
  carregarTag();

  /* A rota em que a pessoa aceitou é a página de entrada dela. Sem este
     disparo ela ficaria fora da contagem, porque na carga da página ainda não
     havia consentimento e o page_view foi descartado */
  pageView(window.location.pathname + window.location.search);
}

export function recusar() {
  gravarConsentimento("recusado");
  gtag("consent", "update", NEGADO);
  apagarCookiesDeMedicao();
}

/* Recusa depois de um aceite anterior: interromper o envio não basta, o que já
   está gravado tem que sair. Cada cookie é apagado no host atual e no domínio
   com ponto na frente, que é onde o GA costuma gravar */
function apagarCookiesDeMedicao() {
  const alvo = /^(_ga|_gid|_gat|_gcl_)/;
  const host = window.location.hostname;
  const raiz = "." + host.split(".").slice(-2).join(".");
  const dominios = [host, "." + host, raiz];

  for (const par of document.cookie.split(";")) {
    const nome = par.split("=")[0].trim();
    if (!alvo.test(nome)) continue;
    for (const d of dominios) {
      document.cookie = `${nome}=; max-age=0; path=/; domain=${d}`;
    }
    document.cookie = `${nome}=; max-age=0; path=/`;
  }
}

export function pageView(caminho) {
  if (!GA_ID || lerConsentimento() !== "aceito") return;

  gtag("event", "page_view", {
    page_path: caminho,
    page_location: window.location.href,
    page_title: document.title,
  });
}

/* Nome do evento no GA4 por canal de contato. Prefixo comum para os quatro
   aparecerem juntos no relatório */
const EVENTOS = {
  whatsapp: "contato_whatsapp",
  telefone: "contato_telefone",
  rota: "contato_rota",
  instagram: "contato_instagram",
};

export function registrarContato(canal, origem) {
  if (!MEDICAO_ATIVA || lerConsentimento() !== "aceito") return;

  const nome = EVENTOS[canal];
  if (!nome) return;

  /* `origem` é a rota onde o clique aconteceu: é o que diz depois se quem
     converte vem da home, da página de vidraçaria ou da de esquadrias */
  if (GA_ID) gtag("event", nome, { canal, origem });

  const rotulo = ADS_ROTULOS[canal];
  if (ADS_ID && rotulo) {
    gtag("event", "conversion", { send_to: `${ADS_ID}/${rotulo}` });
  }
}

function classificar(href) {
  if (href.startsWith("tel:")) return "telefone";
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "whatsapp";
  if (href.includes("google.com/maps") || href.includes("maps.app.goo.gl")) return "rota";
  if (href.includes("instagram.com")) return "instagram";
  return null;
}

/*
  Um ouvinte só, na fase de captura, para todos os links de contato do site.
  Captura porque assim o evento é contado mesmo que algum componente venha a
  interromper a propagação do clique.

  Todos esses links abrem em aba nova ou entregam para o aparelho discar, então
  a página não é descarregada e o envio tem tempo de sair sem precisar de
  transport beacon nem de segurar a navegação.
*/
function ouvirCliquesDeContato() {
  document.addEventListener(
    "click",
    (e) => {
      const alvo = e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!alvo) return;

      const canal = classificar(alvo.getAttribute("href") || "");
      if (canal) registrarContato(canal, window.location.pathname);
    },
    true,
  );
}
