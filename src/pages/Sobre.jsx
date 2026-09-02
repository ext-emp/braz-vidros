import PageHeader from "../components/PageHeader.jsx";
import CTABand from "../components/CTABand.jsx";
import { ABOUT, ABOUT_STORY, DIFFERENTIALS, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Sobre() {
  usePageMeta(PAGE_META.sobre);
  return (
    <>
      <PageHeader
        eyebrow={ABOUT.eyebrow}
        title={ABOUT.title}
        text="Vidraçaria e esquadrias de alumínio com a mesma equipe do orçamento à instalação, e suporte também depois da entrega."
      />

      <section className="container-site grid items-center gap-10 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="relative">
          <img
            src={ABOUT.image}
            alt="Equipe da Braz Vidros em instalação"
            loading="lazy"
            className="w-full rounded-[1.75rem] object-cover"
          />
          <div className="glass absolute -right-3 -bottom-5 hidden max-w-[15rem] rounded-3xl p-5 md:block">
            <p className="font-display text-3xl font-bold text-accent">NH/RS</p>
            <p className="mt-1 text-xs leading-relaxed text-steel">
              Atendimento em Novo Hamburgo e região
            </p>
          </div>
        </div>
        <div>
          {ABOUT.text.map((t, i) => (
            <p
              key={i}
              data-reveal
              className="mb-4 max-w-prose leading-relaxed text-steel hyphens-auto text-justify"
            >
              {t}
            </p>
          ))}
        </div>
      </section>

      {/* Nossa história: coluna de título fixa à esquerda no desktop e o
          relato correndo à direita, marcado por um filete no acento */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site grid gap-10 lg:grid-cols-[19rem_1fr] lg:gap-16">
          <div data-reveal className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-3">{ABOUT_STORY.eyebrow}</p>
            <h2 className="font-display text-3xl leading-tight font-semibold md:text-4xl">
              {ABOUT_STORY.title}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-steel">{ABOUT_STORY.lede}</p>
          </div>

          <div data-reveal-group className="space-y-10">
            {ABOUT_STORY.blocks.map((b) => (
              <div key={b.title} data-reveal className="border-l-2 border-accent/25 pl-6 md:pl-8">
                <h3 className="font-display mb-3 text-xl font-semibold md:text-2xl">{b.title}</h3>
                {b.text.map((t, i) => (
                  <p
                    key={i}
                    className="mb-3 max-w-prose leading-relaxed text-steel hyphens-auto text-justify"
                  >
                    {t}
                  </p>
                ))}
                {b.highlight && (
                  <p className="font-display mt-5 text-xl font-semibold text-accent md:text-2xl">
                    {b.highlight}
                  </p>
                )}
              </div>
            ))}

            <p
              data-reveal
              className="glass rounded-3xl p-6 leading-relaxed font-semibold md:p-7 md:text-lg"
            >
              {ABOUT_STORY.closing}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container-site">
          <div data-reveal className="mb-10 text-center">
            <p className="eyebrow mb-3">Nosso jeito de trabalhar</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              O que você pode esperar da gente
            </h2>
          </div>
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2">
            {DIFFERENTIALS.map((d) => (
              <div key={d.title} data-reveal>
                <div className="glass h-full rounded-3xl p-7">
                  <h3 className="font-display mb-2 text-xl font-semibold">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-steel">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  );
}
