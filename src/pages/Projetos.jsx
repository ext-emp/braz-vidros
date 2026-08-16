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
          <div data-reveal className="flex flex-wrap gap-2">
            {PORTFOLIO_CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                aria-pressed={cat === c}
                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  cat === c
                    ? "bg-ink text-white"
                    : "glass text-steel hover:-translate-y-0.5 hover:text-ink"
                }`}
              >
                {c}
              </button>
            ))}
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
