import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProjectGrid from "./ProjectGrid.jsx";
import {
  PORTFOLIO_DESTAQUE,
  PORTFOLIO_FILTROS,
  INSTAGRAM,
} from "../data/content.js";

/*
  Galeria da home: as oito obras em destaque com um filtro por especialidade.
  O filtro mora aqui, e não na página, porque a grade precisa de estado e a
  Home segue sendo só a montagem das seções.
*/
export default function ProjectShowcase() {
  const [filtro, setFiltro] = useState("tudo");

  const projects =
    filtro === "tudo"
      ? PORTFOLIO_DESTAQUE
      : PORTFOLIO_DESTAQUE.filter((p) => p.spec === filtro);

  // Filtrar tira uma linha da grade e encurta a página: sem remedir, os
  // gatilhos das seções seguintes ficam presos na altura antiga. Só a partir
  // da segunda renderização: a primeira medição é do App
  const montado = useRef(false);
  useEffect(() => {
    if (!montado.current) {
      montado.current = true;
      return;
    }
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [filtro]);

  return (
    <>
      <div
        data-reveal
        role="group"
        aria-label="Filtrar projetos por especialidade"
        className="mt-7 flex flex-wrap items-center justify-center gap-2.5"
      >
        {PORTFOLIO_FILTROS.map((f) => {
          const ativo = filtro === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              aria-pressed={ativo}
              className={`sheen min-h-11 rounded-full px-5 text-[13px] font-bold transition-colors duration-300 ${
                ativo
                  ? "border border-accent bg-accent text-white"
                  : "glass text-steel hover:text-ink"
              }`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Quem revela é o wrapper, uma vez só. A grade fica fora do
          data-reveal porque a lista dela muda a cada clique no filtro */}
      <div data-reveal className="mt-10">
        <ProjectGrid items={projects} reveal={false} />
      </div>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
        <Link to="/vidracaria" className="text-sm font-bold text-accent hover:underline">
          Ver tudo em vidraçaria
        </Link>
        <Link to="/esquadrias" className="text-sm font-bold text-accent hover:underline">
          Ver tudo em esquadrias
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
    </>
  );
}
