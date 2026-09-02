import { Link } from "react-router-dom";
import Hero from "../components/Hero.jsx";
import DualFocus from "../components/DualFocus.jsx";
import DifferentialsBand from "../components/DifferentialsBand.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import CTABand from "../components/CTABand.jsx";
import { PORTFOLIO, PAGE_META, INSTAGRAM } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Home() {
  usePageMeta(PAGE_META.home);
  return (
    <>
      <Hero />
      <DualFocus />

      <DifferentialsBand />

      {/* Prévia de projetos. O id é o destino do botão "Ver projetos" do hero;
          a galeria completa vive nas páginas de cada especialidade */}
      <section id="projetos" className="container-site py-16 md:py-24">
        <div className="mb-10 text-center">
          <div data-reveal>
            <p className="eyebrow mb-3">Projetos</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Veja nossos projetos
            </h2>
          </div>
          <div data-reveal className="mt-4 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/vidracaria" className="text-sm font-bold text-accent hover:underline">
              Projetos em vidro
            </Link>
            <Link to="/esquadrias" className="text-sm font-bold text-accent hover:underline">
              Projetos em alumínio
            </Link>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              Mais no Instagram
            </a>
          </div>
        </div>
        <ProjectGrid items={PORTFOLIO.slice(0, 4)} />
      </section>

      <CTABand />
    </>
  );
}
