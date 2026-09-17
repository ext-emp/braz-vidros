import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import CTABand from "../components/CTABand.jsx";
import CommitmentBand from "../components/CommitmentBand.jsx";
import DifferentialsBand from "../components/DifferentialsBand.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { ABOUT, ABOUT_STORY, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Sobre() {
  usePageMeta(PAGE_META.sobre);
  /* Capítulo aberto da história. O primeiro já nasce aberto: quatro títulos
     fechados não dizem a quem chega o que há para ganhar abrindo. -1 fecha
     todos, que é o estado quando a pessoa clica no capítulo que está aberto */
  const [aberto, setAberto] = useState(0);

  return (
    <>
      <PageHeader
        eyebrow={ABOUT.eyebrow}
        title={ABOUT.title}
        text="Vidraçaria e esquadrias de alumínio em Novo Hamburgo e região, com garantia e suporte depois da entrega."
      />

      {/* Nossa história em capítulos que abrem: os quatro títulos ficam à
          vista e o texto só desce quando a pessoa pede. Aberta de uma vez, a
          história era uma parede de oito parágrafos, e a foto do lado sumia
          no primeiro deles */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow={ABOUT_STORY.eyebrow}
            title={ABOUT_STORY.title}
            text={ABOUT_STORY.lede}
            className="mb-10 md:mb-12"
          />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,26rem)_minmax(0,1fr)] lg:items-start lg:gap-16">
            {/* A foto acompanha a rolagem: com um capítulo longo aberto, ela
                sairia da tela e a coluna ficaria vazia */}
            <div data-reveal className="lg:sticky lg:top-28">
              <div className="relative">
                {/* A foto é vertical (3:4) e solta fica alta demais para a
                    coluna grudada; em 4/5 o corte tira só céu e calçada e a
                    placa da loja fica inteira */}
                <img
                  src={ABOUT.image}
                  alt={ABOUT.imageAlt}
                  loading="lazy"
                  className="aspect-4/5 w-full rounded-[1.75rem] object-cover"
                />
                <div className="glass absolute -right-3 -bottom-5 hidden max-w-[15rem] rounded-3xl bg-[linear-gradient(135deg,rgb(255_255_255/0.62),rgb(255_255_255/50%))] p-5 md:block">
                  <p className="font-display text-3xl font-bold text-accent">
                    NH/RS
                  </p>
                  <p className="mt-1 text-xs leading-relaxed text-ink">
                    Atendimento em Novo Hamburgo e região
                  </p>
                </div>
              </div>
            </div>

            <div data-reveal-group>
              {ABOUT_STORY.blocks.map((b, i) => {
                const isAberto = aberto === i;
                return (
                  <div
                    key={b.title}
                    data-reveal
                    className="border-b border-ink/12"
                  >
                    <h3>
                      <button
                        type="button"
                        onClick={() => setAberto(isAberto ? -1 : i)}
                        aria-expanded={isAberto}
                        className="flex min-h-14 w-full cursor-pointer items-center gap-4 py-4 text-left md:gap-5"
                      >
                        <span
                          className={`font-display flex-1 text-xl leading-tight font-semibold transition-colors duration-300 md:text-2xl ${
                            isAberto ? "text-accent" : "text-ink"
                          }`}
                        >
                          {b.title}
                        </span>
                        {/* Mais que vira menos: o traço de pé encolhe até
                            sumir, e é o mesmo desenho nos dois estados */}
                        <svg
                          viewBox="0 0 16 16"
                          aria-hidden="true"
                          className={`h-4 w-4 shrink-0 transition-colors duration-300 ${
                            isAberto ? "text-accent" : "text-steel"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        >
                          <path d="M1 8h14" />
                          <path
                            d="M8 1v14"
                            className={`origin-center transition-transform duration-500 ease-out motion-reduce:transition-none ${
                              isAberto ? "scale-y-0" : "scale-y-100"
                            }`}
                          />
                        </svg>
                      </button>
                    </h3>

                    {/* Altura animada por grid-template-rows: de 0fr a 1fr o
                        navegador interpola a altura real do conteúdo, coisa
                        que `height: auto` não faz */}
                    <div
                      aria-hidden={!isAberto}
                      className={`grid transition-[grid-template-rows] duration-500 ease-out motion-reduce:transition-none ${
                        isAberto ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <div className="pb-7 md:pr-10">
                          {/* Justificado com hifenização: sem quebrar palavra,
                              a linha justificada abre buracos entre as palavras
                              no celular, onde a coluna é estreita. O idioma sai
                              do lang="pt-BR" do documento */}
                          {b.text.map((t, j) => (
                            <p
                              key={j}
                              className="mb-3 max-w-prose text-justify leading-relaxed text-steel hyphens-auto"
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
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fechamento da seção. Fita própria porque no celular ela sangra a
              tela e vira slider, e isso não cabia dentro da página */}
          <CommitmentBand />
        </div>
      </section>

      <DifferentialsBand
        eyebrow="Nosso jeito de trabalhar"
        title="O que você pode esperar da gente"
      />

      <CTABand />
    </>
  );
}
