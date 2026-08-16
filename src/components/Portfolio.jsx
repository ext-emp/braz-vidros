import { useState } from "react";
import { PORTFOLIO, PORTFOLIO_CATEGORIES, INSTAGRAM } from "../data/content.js";

export default function Portfolio() {
  const [cat, setCat] = useState("Todos");
  const items = cat === "Todos" ? PORTFOLIO : PORTFOLIO.filter((p) => p.category === cat);

  return (
    <section id="projetos" className="container-site scroll-mt-24 py-20 md:py-28">
      <div className="mb-10 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div data-reveal>
          <p className="eyebrow mb-3">Projetos</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Trabalho instalado, <br className="hidden md:block" />
            não render de catálogo
          </h2>
        </div>
        <a
          data-reveal
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold text-accent hover:underline md:justify-self-end"
        >
          Mais projetos no Instagram →
        </a>
      </div>

      <div data-reveal className="mb-8 flex flex-wrap gap-2">
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

      <div data-reveal className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((p) => (
          <figure
            key={p.title}
            className="group relative overflow-hidden rounded-3xl"
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <figcaption className="glass-dark absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl px-4 py-3 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <p className="text-sm font-semibold text-white">{p.title}</p>
              <p className="text-xs text-accent-soft">{p.category}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
