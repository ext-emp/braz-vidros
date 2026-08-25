import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import DualFocus from "../components/DualFocus.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import CTABand from "../components/CTABand.jsx";
import {
  PORTFOLIO,
  PAGE_META,
  DIFFERENTIALS,
  SERVICES_GLASS,
  SERVICES_ALUMINUM,
} from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

const SERVICE_GROUPS = [
  {
    title: "Vidraçaria",
    items: SERVICES_GLASS,
    link: "/vidracaria",
    linkText: "Ver tudo em vidraçaria",
  },
  {
    title: "Esquadrias de alumínio",
    items: SERVICES_ALUMINUM,
    link: "/esquadrias",
    linkText: "Ver tudo em esquadrias",
  },
];

export default function Home() {
  usePageMeta(PAGE_META.home);
  return (
    <>
      <Hero />
      <DualFocus />

      {/* Lista dos serviços na home. É resumo, não substituto: cada página
          continua com o conteúdo completo e o texto que o Google indexa */}
      <section className="container-site pb-20 md:pb-28">
        <div data-reveal-group className="grid gap-5 md:grid-cols-2">
          {SERVICE_GROUPS.map((g) => (
            <div key={g.title} data-reveal>
              <div className="glass flex h-full flex-col rounded-3xl p-7 text-center md:p-8">
                <h3 className="font-display mb-5 text-xl font-semibold md:text-2xl">
                  {g.title}
                </h3>
                {/* Lista com divisórias: linhas de altura igual, sem o recorte
                    irregular que as etiquetas soltas faziam ao quebrar */}
                <ul className="mb-6 divide-y divide-ink/8 border-y border-ink/8">
                  {g.items.map((s) => (
                    <li key={s.title} className="py-2.5 text-sm text-steel">
                      {s.title}
                    </li>
                  ))}
                </ul>
                <Link
                  to={g.link}
                  className="mt-auto text-sm font-bold text-accent hover:underline"
                >
                  {g.linkText}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Por que a Braz Vidros */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site">
          <div data-reveal className="mb-10 text-center">
            <p className="eyebrow mb-3">Por que a Braz Vidros</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Do orçamento à instalação, sem intermediário
            </h2>
          </div>
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {DIFFERENTIALS.map((d) => (
              <div key={d.title} data-reveal>
                <div className="glass h-full rounded-3xl p-6">
                  <h3 className="font-display mb-2 text-lg font-semibold">{d.title}</h3>
                  <p className="text-sm leading-relaxed text-steel">{d.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prévia de projetos */}
      <section className="container-site py-16 md:py-24">
        <div className="mb-10 text-center">
          <div data-reveal>
            <p className="eyebrow mb-3">Projetos</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Trabalho instalado, não render de catálogo
            </h2>
          </div>
          <Link data-reveal to="/projetos" className="mt-4 inline-block text-sm font-bold text-accent hover:underline">
            Ver todos os projetos
          </Link>
        </div>
        <ProjectGrid items={PORTFOLIO.slice(0, 4)} />
      </section>

      <CTABand />
    </>
  );
}
