import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import DualFocus from "../components/DualFocus.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import CTABand from "../components/CTABand.jsx";
import { PORTFOLIO, PAGE_META, DIFFERENTIALS } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Home() {
  usePageMeta(PAGE_META.home);
  return (
    <>
      <Hero />
      <DualFocus />

      {/* Por que a Braz Vidros */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site">
          <div data-reveal className="mb-10">
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
        <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
          <div data-reveal>
            <p className="eyebrow mb-3">Projetos</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Trabalho instalado, não render de catálogo
            </h2>
          </div>
          <Link
            data-reveal
            to="/projetos"
            className="text-sm font-bold text-accent hover:underline md:justify-self-end"
          >
            Ver todos os projetos
          </Link>
        </div>
        <ProjectGrid items={PORTFOLIO.slice(0, 4)} />
      </section>

      <CTABand />
    </>
  );
}
