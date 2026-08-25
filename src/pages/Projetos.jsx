import { useState } from "react";
import PageHeader from "../components/PageHeader.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import CTABand from "../components/CTABand.jsx";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, INSTAGRAM, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Projetos() {
  usePageMeta(PAGE_META.projetos);
  const [cat, setCat] = useState("Todos");
  const items = cat === "Todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === cat);

  return (
    <>
      <PageHeader
        eyebrow="Projetos"
        title="Trabalho instalado, não render de catálogo"
        text="Uma amostra do que saiu da nossa bancada e foi parar em casas, apartamentos e comércios de Novo Hamburgo e região."
      />

      <section className="container-site py-16 md:py-24">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          {/* Trilho horizontal: os filtros correm para o lado em vez de
              quebrar em três linhas. A sangria negativa deixa o primeiro e o
              último encostarem na borda da tela ao rolar */}
          <div
            data-reveal
            className="no-scrollbar -mx-5 w-[calc(100%+2.5rem)] snap-x snap-mandatory overflow-x-auto px-5 md:mx-0 md:w-auto md:px-0"
          >
            <div className="flex w-max gap-2">
              {PORTFOLIO_CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCat(c)}
                  aria-pressed={cat === c}
                  className={`shrink-0 snap-start rounded-full px-5 py-2.5 text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                    cat === c
                      ? "bg-ink text-white"
                      : "glass text-steel hover:-translate-y-0.5 hover:text-ink"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>
          <a
            data-reveal
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-accent hover:underline"
          >
            Mais no Instagram
          </a>
        </div>
        <ProjectGrid items={items} />
      </section>

      <CTABand />
    </>
  );
}
