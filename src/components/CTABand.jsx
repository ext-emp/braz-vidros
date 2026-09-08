import WhatsAppIcon from "./WhatsAppIcon.jsx";
import {
  waLink,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  mapLink,
} from "../data/content.js";

/*
  Chamada final de orçamento, usada no fim de todas as páginas.

  É um cartão de vidro claro, e não de tinta: na home ela vem logo depois do
  bloco Sobre, que já é um cartão escuro arredondado, e dois escuros seguidos
  faziam a chamada parecer só mais um bloco em vez do lugar de converter.

  A coluna da direita existe para quem não quer WhatsApp: telefone, endereço
  e mapa na mesma altura, sem obrigar a pessoa a ir até a página de contato.
  No celular ela vai para baixo e o filete que separa as duas vira uma linha
  no topo.
*/
export default function CTABand({
  message = "Olá! Quero um orçamento com a Braz Vidros.",
  compact = false,
}) {
  return (
    <section className="container-site py-16 md:py-24">
      <div
        data-reveal
        className={`glass grid gap-8 rounded-[1.75rem] p-7 sm:p-10 md:gap-12 md:p-12 ${
          compact ? "" : "md:grid-cols-[1.25fr_minmax(0,1fr)]"
        }`}
      >
        <div>
          <p className="eyebrow mb-3">Orçamento sem compromisso</p>
          <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
            Manda a medida, a gente manda o preço
          </h2>
          <p className="mt-4 max-w-md leading-relaxed text-steel">
            Fotos do ambiente e medidas aproximadas já bastam para um primeiro
            orçamento.
          </p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full bg-accent px-8 text-sm font-bold text-white shadow-[0_18px_36px_-18px_rgb(50_53_96/0.75)] transition-[filter] duration-300 hover:brightness-110"
          >
            <WhatsAppIcon className="h-4.75 w-4.75 fill-current" />
            Chamar no WhatsApp
          </a>
        </div>

        {/* Some no celular: lá o botão do WhatsApp já resolve, e telefone e
            endereço repetidos empurravam o rodapé para muito longe. `compact`
            tira a coluna também no desktop, para a página de contato, onde
            esses mesmos dados já são o conteúdo principal */}
        {!compact && (
        <div className="hidden flex-col gap-6 md:flex md:border-l md:border-frost md:pl-12">
          <div>
            <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-steel uppercase">
              Telefone
            </p>
            <a
              href={PHONE_HREF}
              className="font-display inline-flex min-h-11 items-center text-2xl font-semibold text-accent hover:underline"
            >
              {PHONE}
            </a>
          </div>

          <div>
            <p className="mb-1.5 text-xs font-bold tracking-[0.14em] text-steel uppercase">
              Onde estamos
            </p>
            <p className="text-sm leading-relaxed text-ink-soft">
              {ADDRESS.street}
              <br />
              {ADDRESS.district}, {ADDRESS.city}, {ADDRESS.state}
            </p>
          </div>

          <a
            href={mapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-11 items-center text-sm font-bold text-accent hover:underline"
          >
            Ver no mapa
          </a>
        </div>
        )}
      </div>
    </section>
  );
}
