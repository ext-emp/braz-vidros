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

  // Posição do marcador na chave. Nunca -1: "tudo" é o estado inicial e o
  // primeiro item da lista
  const indice = Math.max(
    PORTFOLIO_FILTROS.findIndex((f) => f.id === filtro),
    0
  );

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
      {/*
        Chave de três posições, e não três pílulas soltas: as opções são
        exclusivas, então elas dividem uma só caixa em partes iguais e o
        marcador desliza de uma para a outra. Assim as três ficam sempre lado
        a lado, sem a terceira cair para a linha de baixo no celular.

        O marcador é um elemento só, posicionado por translateX: a largura é
        um terço da área interna (o padding de 0.25rem de cada lado sai da
        conta), e cada passo é exatamente a própria largura dele.
      */}
      <div
        data-reveal
        role="group"
        aria-label="Filtrar projetos por especialidade"
        className="glass relative mx-auto mt-7 grid w-full max-w-md grid-cols-3 rounded-full p-1 sm:max-w-lg"
      >
        <span
          aria-hidden="true"
          style={{ transform: `translateX(${indice * 100}%)` }}
          className="pointer-events-none absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-accent shadow-[0_8px_18px_-10px_rgb(50_53_96/0.9)] transition-transform duration-400 ease-out motion-reduce:transition-none"
        />
        {PORTFOLIO_FILTROS.map((f) => {
          const ativo = filtro === f.id;
          return (
            <button
              key={f.id}
              type="button"
              onClick={() => setFiltro(f.id)}
              aria-pressed={ativo}
              aria-label={f.label}
              className={`relative z-10 min-h-11 rounded-full px-2 text-[12px] font-bold transition-colors duration-300 sm:text-[13px] ${
                ativo ? "text-white" : "text-steel hover:text-ink"
              }`}
            >
              {/* Rótulo curto no celular, inteiro a partir de sm. O aria-label
                  fica com o inteiro nos dois casos */}
              <span className="sm:hidden">{f.curto}</span>
              <span className="hidden sm:inline">{f.label}</span>
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
