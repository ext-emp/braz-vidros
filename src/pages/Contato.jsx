import PageHeader from "../components/PageHeader.jsx";
import CTABand from "../components/CTABand.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import {
  CONTACT_CHANNELS,
  PAGE_META,
  addressLine,
  mapEmbed,
  mapLink,
} from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

/* Um canal. Vira link quando tem `href`, e continua sendo uma caixa comum
   quando é só informação, como o horário de atendimento */
function Canal({ label, value, text, href, external }) {
  const conteudo = (
    <>
      <span className="block text-xs font-bold tracking-widest text-steel uppercase">
        {label}
      </span>
      <span className="font-display mt-1.5 block text-xl font-semibold text-ink">
        {value}
      </span>
      <span className="mt-1.5 block text-sm leading-relaxed text-steel">{text}</span>
    </>
  );

  /* Centrado no celular, onde o cartão ocupa a linha inteira; da grade de
     duas colunas em diante volta a ser alinhado à esquerda */
  const classe =
    "glass sheen group block h-full rounded-3xl p-6 text-center transition-transform duration-500 ease-out sm:text-left";

  if (!href) return <div className={classe}>{conteudo}</div>;

  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`${classe} hover:-translate-y-1.5`}
    >
      {conteudo}
    </a>
  );
}

export default function Contato() {
  usePageMeta(PAGE_META.contato);

  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Peça seu orçamento"
        text="Mande as medidas pelo WhatsApp e a gente responde com o preço."
      />

      {/* Canais à esquerda, foto à direita. A foto ocupa o lugar que numa
          página de contato costuma ser o formulário, que este site não tem
          por ser estático */}
      <section className="container-site py-16 md:py-24">
        <div className="grid items-stretch gap-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Fale com a gente"
              title="Todos os caminhos até a gente"
              text="O WhatsApp é o mais rápido, mas se preferir passar na loja ou acompanhar as obras pelo Instagram, está tudo aqui."
            />

            <div data-reveal-group className="mt-10 grid gap-4 sm:grid-cols-2">
              {CONTACT_CHANNELS.map((c) => (
                <div key={c.label} data-reveal>
                  <Canal {...c} />
                </div>
              ))}
            </div>
          </div>

          {/* Fora no celular: lá ela não faz par com nada, só empurra o mapa
              e o resto da página para baixo. Escondida por display, e não por
              altura zero, então o arquivo nem chega a ser baixado */}
          <div
            data-reveal
            className="hidden overflow-hidden rounded-[1.75rem] md:block"
          >
            <img
              src="/focus/focus-vidracaria.jpg"
              alt="Box de vidro temperado instalado pela Braz Vidros"
              loading="lazy"
              className="h-72 w-full object-cover lg:h-full"
            />
          </div>
        </div>
      </section>

      {/* Mapa de borda a borda: fora do container para sangrar a tela toda */}
      <section className="pb-16 md:pb-24">
        <div data-reveal className="container-site">
          <p className="eyebrow mb-5 text-center">Onde estamos</p>
        </div>

        {/* Sem `loading="lazy"`: o mapa fica abaixo da dobra e, adiado, só
            entraria quando a rolagem chegasse perto. Aqui ele tem que estar
            pronto desde a abertura da página */}
        <div className="h-105 w-full bg-mist/70 md:h-140">
          <iframe
            title={`Mapa: ${addressLine}`}
            src={mapEmbed()}
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="h-full w-full border-0"
          />
        </div>

        <div className="container-site mt-4 flex flex-wrap items-center justify-center gap-3 text-center md:justify-between md:text-left">
          <address className="text-sm text-steel not-italic">{addressLine}</address>
          <a
            href={mapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-accent hover:underline"
          >
            Abrir no Google Maps
          </a>
        </div>
      </section>

      {/* Sem a coluna de telefone e endereço: aqui em cima isso já é o
          conteúdo principal da página. O texto também é próprio: o das outras
          páginas fala em mandar a medida, que é o que o cabeçalho daqui já
          pede, então o fecho fica com o outro caminho, o da visita */}
      <CTABand
        compact
        tone="accent"
        eyebrow="Medição no local"
        title="Prefere que a gente vá até a obra?"
        text="Marque a visita pelo WhatsApp: a gente mede no local e o orçamento sai sem compromisso."
        cta="Marcar uma visita"
        message="Olá! Quero marcar uma medição com a Braz Vidros."
      />
    </>
  );
}
