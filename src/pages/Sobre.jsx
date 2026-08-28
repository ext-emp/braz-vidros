import PageHeader from "../components/PageHeader.jsx";
import CTABand from "../components/CTABand.jsx";
import { ABOUT, DIFFERENTIALS, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Sobre() {
  usePageMeta(PAGE_META.sobre);
  return (
    <>
      <PageHeader
        eyebrow={ABOUT.eyebrow}
        title={ABOUT.title}
        text="Vidraçaria e esquadrias de alumínio com a mesma equipe do orçamento à instalação."
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
            <p key={i} data-reveal className="mb-4 max-w-prose leading-relaxed text-steel">
              {t}
            </p>
          ))}
        </div>
      </section>

      <section className="bg-mist/60 py-16 md:py-24">
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
