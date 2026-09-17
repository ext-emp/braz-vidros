import WhatsAppIcon from "./WhatsAppIcon.jsx";
import SectionHeading from "./SectionHeading.jsx";
import {
  waLink,
  PHONE,
  PHONE_HREF,
  ADDRESS,
  mapLink,
} from "../data/content.js";

/*
  Chamada final de orçamento, usada no fim de todas as páginas.

  Nasce como cartão de vidro claro, e não de tinta: na home ela vem logo depois
  do bloco Sobre, que já é um cartão escuro arredondado, e dois escuros seguidos
  faziam a chamada parecer só mais um bloco em vez do lugar de converter.

  `tone="accent"` pinta o cartão de marinho, para onde esse vizinho escuro não
  existe: na página de contato, que fecha com o mapa, a chamada de tinta é o
  único bloco cheio da página e puxa o olho sem disputar com nada.

  A coluna da direita existe para quem não quer WhatsApp: telefone, endereço
  e mapa na mesma altura, sem obrigar a pessoa a ir até a página de contato.
  No celular ela vai para baixo e o filete que separa as duas vira uma linha
  no topo.
*/
export default function CTABand({
  message = "Olá! Quero um orçamento com a Braz Vidros.",
  compact = false,
  tone = "glass",
  eyebrow = "Orçamento sem compromisso",
  title = "Mande a medida, a gente manda o preço",
  text = "Fotos do ambiente e medidas aproximadas já bastam para um primeiro orçamento.",
  cta = "Chamar no WhatsApp",
}) {
  const escuro = tone === "accent";

  return (
    <section className="container-site py-16 md:py-24">
      {/* Sem a coluna da direita o cartão largo ficava com metade vazia, então
          o compacto estreita e centra: o texto e o botão viram um bloco só no
          meio da página, em vez de um canto preenchido e outro solto */}
      <div
        data-reveal
        className={`grid gap-8 rounded-[1.75rem] p-7 sm:p-10 md:gap-12 md:p-12 ${
          escuro ? "bg-accent" : "glass"
        } ${
          compact
            ? "mx-auto max-w-2xl justify-items-center"
            : "md:grid-cols-[1.25fr_minmax(0,1fr)]"
        }`}
      >
        {/* text-center leva junto o botão, que é inline-flex */}
        <div className={compact ? "text-center" : "text-center md:text-left"}>
          {/* O cartão inteiro já entra de uma vez: aqui o cabeçalho não anima
              por conta própria */}
          <SectionHeading
            eyebrow={eyebrow}
            title={title}
            text={text}
            align={compact ? "center" : "left"}
            tone={escuro ? "dark" : "light"}
            reveal={false}
          />
          {/* Sobre o marinho o botão inverte: branco com texto de tinta. O
              brilho do hover não existe em cima do branco, então lá quem
              responde é o fundo */}
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className={`sheen mt-8 inline-flex min-h-14 items-center justify-center gap-2.5 rounded-full px-8 text-sm font-bold duration-300 ${
              escuro
                ? "bg-white text-accent shadow-[0_18px_36px_-18px_rgb(0_0_0/0.55)] transition-colors hover:bg-mist"
                : "bg-accent text-white shadow-[0_18px_36px_-18px_rgb(50_53_96/0.75)] transition-[filter] hover:brightness-110"
            }`}
          >
            <WhatsAppIcon className="h-4.75 w-4.75 fill-current" />
            {cta}
          </a>
        </div>

        {/* Some no celular: lá o botão do WhatsApp já resolve, e telefone e
            endereço repetidos empurravam o rodapé para muito longe. `compact`
            tira a coluna também no desktop, para a página de contato, onde
            esses mesmos dados já são o conteúdo principal */}
        {!compact && (
        <div
          className={`hidden flex-col gap-6 md:flex md:border-l md:pl-12 ${
            escuro ? "md:border-white/20" : "md:border-frost"
          }`}
        >
          <div>
            <p
              className={`mb-1.5 text-xs font-bold tracking-[0.14em] uppercase ${
                escuro ? "text-white/50" : "text-steel"
              }`}
            >
              Telefone
            </p>
            <a
              href={PHONE_HREF}
              className={`font-display inline-flex min-h-11 items-center text-2xl font-semibold hover:underline ${
                escuro ? "text-white" : "text-accent"
              }`}
            >
              {PHONE}
            </a>
          </div>

          <div>
            <p
              className={`mb-1.5 text-xs font-bold tracking-[0.14em] uppercase ${
                escuro ? "text-white/50" : "text-steel"
              }`}
            >
              Onde estamos
            </p>
            <p
              className={`text-sm leading-relaxed ${
                escuro ? "text-white/75" : "text-ink-soft"
              }`}
            >
              {ADDRESS.street}
              <br />
              {ADDRESS.district}, {ADDRESS.city}, {ADDRESS.state}
            </p>
          </div>

          <a
            href={mapLink()}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex min-h-11 items-center text-sm font-bold hover:underline ${
              escuro ? "text-accent-soft" : "text-accent"
            }`}
          >
            Ver no mapa
          </a>
        </div>
        )}
      </div>
    </section>
  );
}
