/*
  Texto jurídico do site: a política de privacidade. Fica aqui, junto do resto
  do conteúdo editável, para o cliente conseguir revisar sem mexer em
  componente. Ao mudar qualquer coisa relevante, atualize LEGAL_UPDATED.

  O que carrega de fora são as fontes do layout, o mapa do Google na página de
  Contato, que entra junto com a página sem depender de clique, e, desde
  19/09/2026, o Google Analytics e a medição de conversões do Google Ads, os
  dois atrás do aviso de consentimento.

  Por isso os trechos condicionais abaixo: build sem ID de medição no .env não
  carrega tag nenhuma e nem mostra o banner, e uma política que descrevesse
  cookie inexistente estaria mentindo na direção contrária. A condição lê a
  mesma variável que liga a medição, então os dois nunca saem de sincronia.
*/

import { MEDICAO_ATIVA as medindo } from "../lib/analytics.js";

export const LEGAL_UPDATED = "19 de setembro de 2026";

/* A abertura da seção de cookies é o trecho que mais muda com a medição. O
   resto da seção, que fala das fontes e do mapa, vale nos dois casos */
const COOKIES_ABERTURA = medindo
  ? [
      "Este site não grava cookie próprio antes de você escolher. Na primeira visita aparece um aviso com duas opções de mesmo peso, Aceitar e Recusar, e fechar esse aviso no X vale como recusa. Enquanto não houver aceite, não é só o envio de dados que fica desligado: o programa de medição do Google nem chega a ser baixado pelo seu navegador.",
      "Se você aceitar, passam a funcionar duas ferramentas do Google. O Google Analytics conta visitas, páginas vistas e origem do acesso de forma agregada, e grava os cookies _ga e _ga_ seguido do identificador do site, que duram até dois anos. A medição do Google Ads registra quando uma visita vinda de um anúncio nosso terminou em clique no WhatsApp ou no telefone, e grava o cookie _gcl_au, que dura três meses.",
      "Esses dados servem para uma coisa só: saber quanto do que investimos em divulgação vira pedido de orçamento, e quais páginas ajudam nisso. Não montamos perfil seu, não cruzamos essas informações com o conteúdo das conversas e não usamos nada disso para exibir anúncio perseguindo você pela internet.",
      "Se você recusar, nada é carregado e os cookies de medição que porventura existam são apagados do seu navegador. Para mudar de ideia depois, nos dois sentidos, use o link Cookies no rodapé de qualquer página.",
    ]
  : [
      "Este site não grava cookies próprios no seu navegador, não guarda nada no armazenamento local e não usa nenhuma ferramenta de estatística, publicidade ou rastreamento. Não existe aqui perfil de navegação, e nada do que você faz no site é usado para anúncio.",
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
      medindo
        ? "Dados de navegação gerados automaticamente: endereço IP, tipo de navegador e aparelho, páginas visitadas e horários, registrados pelo servidor que hospeda o site. Se você aceitar os cookies de medição, o Google Analytics e a medição de anúncios do Google Ads passam a registrar também as páginas que você abre e os cliques em WhatsApp e telefone, de forma agregada e sem identificar você pelo nome."
        : "Dados de navegação gerados automaticamente: endereço IP, tipo de navegador e aparelho, páginas visitadas e horários, registrados pelo servidor que hospeda o site. O site não usa nenhuma ferramenta de estatística, publicidade ou rastreamento.",
    ],
  },
  {
    title: "Para que usamos esses dados",
    text: ["Usamos as informações apenas para:"],
    list: [
      "Responder ao seu contato, montar o orçamento e agendar medição e instalação.",
      "Executar o serviço contratado e prestar a garantia e o pós-venda.",
      "Manter o site no ar, seguro e funcionando bem.",
      "Cumprir obrigações fiscais e legais ligadas ao serviço prestado.",
    ],
  },
  {
    title: "Com que base legal",
    text: [
      "Cada uso tem sua base no artigo 7º da LGPD: o seu consentimento, para o contato que você inicia; a execução de contrato e dos procedimentos preliminares, quando você pede orçamento e contrata o serviço; o cumprimento de obrigação legal, para notas fiscais e prazos de guarda; e o legítimo interesse, para manter o site seguro e melhorá-lo, sempre sem tratar dados sensíveis.",
    ],
  },
  {
    title: "Com quem compartilhamos",
    text: [
      medindo
        ? "Não vendemos, alugamos nem cedemos seus dados. O compartilhamento se limita ao necessário para o site e o atendimento funcionarem: a empresa que hospeda o site, o Google (as fontes de texto do layout, o mapa da página de Contato e, havendo o seu aceite, o Google Analytics e a medição de anúncios do Google Ads) e a Meta (WhatsApp e Instagram), quando é por lá que você escolhe conversar com a gente."
        : "Não vendemos, alugamos nem cedemos seus dados. O compartilhamento se limita ao necessário para o site e o atendimento funcionarem: a empresa que hospeda o site, o Google (as fontes de texto do layout e o mapa da página de Contato) e a Meta (WhatsApp e Instagram), quando é por lá que você escolhe conversar com a gente.",
      "Também podemos compartilhar informações se formos obrigados por lei, ordem judicial ou pedido de autoridade competente.",
    ],
  },
  {
    title: "Transferência internacional",
    text: [
      medindo
        ? "Google e Meta processam dados em servidores fora do Brasil. Essa transferência acontece nos termos do artigo 33 da LGPD e das cláusulas de proteção adotadas por essas empresas. No caso do Google, o que sai daqui é o pedido das fontes de texto que o navegador faz para montar a página, o que o Google Maps recebe de quem abre a página de Contato e, se você tiver aceitado os cookies de medição, os dados do Google Analytics e da medição de anúncios. Se preferir não passar por essas plataformas, recuse os cookies e fale com a gente por telefone ou pessoalmente, usando o endereço e o número que ficam no rodapé de todas as páginas."
        : "Google e Meta processam dados em servidores fora do Brasil. Essa transferência acontece nos termos do artigo 33 da LGPD e das cláusulas de proteção adotadas por essas empresas. No caso do Google, o que sai daqui é o pedido das fontes de texto que o navegador faz para montar a página e, na página de Contato, o que o Google Maps recebe de quem abre o mapa. Se preferir não passar por essas plataformas, fale com a gente por telefone ou pessoalmente, usando o endereço e o número que ficam no rodapé de todas as páginas.",
    ],
  },
  {
    title: "Por quanto tempo guardamos",
    text: [
      "As conversas e os dados de orçamento ficam conosco enquanto durar o atendimento e, depois disso, pelo prazo da garantia e pelos prazos legais de guarda de documentos fiscais. Registros de navegação seguem o prazo do artigo 15 do Marco Civil da Internet. Passado o prazo, apagamos ou anonimizamos.",
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
      "Revogar o consentimento a qualquer momento.",
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
    title: "Cookies e conteúdo de terceiros",
    text: [
      ...COOKIES_ABERTURA,
      "As fontes de texto do layout são servidas pelo Google Fonts. Esse pedido informa o seu endereço IP ao Google, sem criar cookie e sem identificar você. A página de Contato mostra a nossa localização num mapa do Google Maps, que é carregado junto com a página: ao abri-la, o Google recebe o seu endereço IP e pode gravar cookie de terceiro no seu navegador, como faria em qualquer visita ao Google Maps. Esse é o único conteúdo de terceiros incorporado ao site, e ele existe só para mostrar onde a loja fica.",
      "Se preferir não passar por isso, não abra a página de Contato: o endereço da loja, o telefone e o WhatsApp também ficam no rodapé de todas as páginas, e o seu navegador permite bloquear cookies de terceiros a qualquer momento.",
      "Os links para WhatsApp, Instagram e Google Maps levam você para fora do site, e o que acontece depois do clique já é responsabilidade dessas plataformas.",
    ],
  },
  {
    title: "Mudanças nesta política",
    text: [
      medindo
        ? "Se esta política mudar, publicamos a versão nova nesta mesma página e atualizamos a data no topo. Mudança que amplie o uso dos seus dados, como uma ferramenta nova de medição ou de publicidade, volta a pedir o seu aceite antes de ser ativada."
        : "Se esta política mudar, publicamos a versão nova nesta mesma página e atualizamos a data no topo. Se um dia o site passar a usar cookies próprios, medição de audiência ou qualquer ferramenta de publicidade, passa a existir aqui um aviso de consentimento, e nada disso é ativado antes de você escolher.",
    ],
  },
];
