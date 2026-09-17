import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FOCUS, SERVICES_GLASS, SERVICES_ALUMINUM } from "../data/content.js";

/* Os serviços de cada especialidade, na ordem em que entram no trilho */
const SERVICES_BY_FOCUS = {
  vidracaria: SERVICES_GLASS,
  esquadrias: SERVICES_ALUMINUM,
};

/* Azul do logo em bloco: a fita de serviços é o que puxa o olho para os
   trabalhos, então ela não desaparece no branco da seção.
   Largura fixa de 205px com o texto centralizado: as pílulas ficam do mesmo
   tamanho, alinhadas em coluna quando a lista quebra em linhas. O padding
   lateral é curto só para o rótulo mais longo caber dentro dos 205px */
const chipClass =
  "flex w-[205px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-accent bg-accent px-2 py-2.5 text-center text-[13px] font-medium text-white shadow-[0_4px_12px_-6px_rgb(50_53_96/0.55)]";

/* Quanto a fita anda por segundo, em px. Igual nas duas para não parecer
   que uma especialidade corre mais que a outra */
const VELOCIDADE = 26;

/*
  Faixa de serviços. No celular os dois grupos idênticos correm em loop e o
  dedo manda: segurar pausa, arrastar move, soltar volta a correr de onde
  parou. A partir de md o loop é desligado, o grupo repetido some e a lista
  vira estática, quebrando em linhas.

  A rolagem é feita no braço (requestAnimationFrame mexendo no transform) em
  vez de animação CSS porque o arraste precisa somar à posição corrente, e o
  transform de uma animação CSS em curso não dá para ler nem continuar.
*/
function ServiceTrack({ items, direction, alinharDireita = false }) {
  const tapeRef = useRef(null);

  useEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const velocidade = direction === "right" ? VELOCIDADE : -VELOCIDADE;

    let ativo = false;
    let raf = 0;
    let ultimo = 0;
    let offset = 0;
    let meiaFita = 0;
    let arrastando = false;
    let inicioX = 0;
    let inicioOffset = 0;

    const aplicar = () => {
      tape.style.transform = `translate3d(${offset}px, 0, 0)`;
    };

    /* Mantém a posição dentro de um ciclo. Como os dois grupos são iguais,
       saltar de um para o outro é invisível */
    const normalizar = (valor) => {
      if (!meiaFita) return 0;
      const n = valor % meiaFita;
      return n > 0 ? n - meiaFita : n;
    };

    const medir = () => {
      meiaFita = tape.scrollWidth / 2;
      offset = normalizar(offset);
      aplicar();
    };

    const passo = (agora) => {
      const dt = ultimo ? Math.min((agora - ultimo) / 1000, 0.05) : 0;
      ultimo = agora;
      if (!arrastando && !semMovimento.matches) {
        offset = normalizar(offset + velocidade * dt);
        aplicar();
      }
      raf = requestAnimationFrame(passo);
    };

    const aoPegar = (e) => {
      arrastando = true;
      inicioX = e.clientX;
      inicioOffset = offset;
      try {
        tape.setPointerCapture(e.pointerId);
      } catch {
        /* navegador sem pointer capture: o arraste ainda funciona */
      }
    };

    const aoMover = (e) => {
      if (!arrastando) return;
      offset = normalizar(inicioOffset + (e.clientX - inicioX));
      aplicar();
    };

    const aoSoltar = (e) => {
      if (!arrastando) return;
      arrastando = false;
      try {
        tape.releasePointerCapture(e.pointerId);
      } catch {
        /* idem */
      }
    };

    const ligar = () => {
      if (ativo) return;
      ativo = true;
      ultimo = 0;
      medir();
      raf = requestAnimationFrame(passo);
      tape.addEventListener("pointerdown", aoPegar);
      tape.addEventListener("pointermove", aoMover);
      tape.addEventListener("pointerup", aoSoltar);
      tape.addEventListener("pointercancel", aoSoltar);
    };

    const desligar = () => {
      if (!ativo) return;
      ativo = false;
      arrastando = false;
      cancelAnimationFrame(raf);
      tape.style.transform = "";
      tape.removeEventListener("pointerdown", aoPegar);
      tape.removeEventListener("pointermove", aoMover);
      tape.removeEventListener("pointerup", aoSoltar);
      tape.removeEventListener("pointercancel", aoSoltar);
    };

    const sincronizar = () => (desktop.matches ? desligar() : ligar());
    const aoRedimensionar = () => {
      if (ativo) medir();
    };

    sincronizar();
    desktop.addEventListener("change", sincronizar);
    window.addEventListener("resize", aoRedimensionar);
    /* As pílulas mudam de largura quando a Manrope entra no lugar da fonte
       de sistema, e aí a metade da fita já não é a mesma */
    if (document.fonts) document.fonts.ready.then(aoRedimensionar);

    return () => {
      desligar();
      desktop.removeEventListener("change", sincronizar);
      window.removeEventListener("resize", aoRedimensionar);
    };
  }, [direction]);

  return (
    <div className="focus-track">
      {/* Só de md para cima: no celular a fita corre por transform e o
          alinhamento do flex não teria efeito nenhum */}
      <div
        ref={tapeRef}
        className={`focus-tape${alinharDireita ? " md:justify-end" : ""}`}
      >
        <div className="focus-group">
          {items.map((s) => (
            <span key={s.title} className={chipClass}>
              {s.title}
            </span>
          ))}
        </div>
        <div className="focus-group focus-group-dup" aria-hidden="true">
          {items.map((s) => (
            <span key={s.title} className={chipClass}>
              {s.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Os dois focos do negócio: vidraçaria e esquadrias */
export default function DualFocus() {
  return (
    <section className="container-site pt-20 pb-16 md:pt-28 md:pb-24">
      {/* Título em cima, apoio logo abaixo: lado a lado a frase de apoio não
          se lia como subtítulo, parecia outro bloco de texto */}
      <div
        data-reveal-group
        className="mb-10 border-b border-ink/12 pb-6 text-center md:mb-16 md:pb-7 md:text-left"
      >
        <div data-reveal>
          <p className="eyebrow mb-3">O que fazemos</p>
          {/* Mesmo degrau de abertura do SectionHeading (tamanho "md") */}
          <h2 className="font-display text-[28px] leading-tight font-semibold md:text-5xl">
            Duas especialidades, <br className="hidden md:block" />
            um só padrão de acabamento
          </h2>
        </div>
        <p
          data-reveal
          className="mx-auto mt-4 max-w-md leading-relaxed text-steel md:mx-0 md:mt-5"
        >
          Vidro e alumínio andam juntos em quase toda obra.
          <br /> Aqui você resolve os dois com a mesma equipe.
        </p>
      </div>

      <div className="flex flex-col gap-14 md:gap-20">
        {FOCUS.map((f, i) => {
          const fotoPrimeiro = i % 2 === 0;
          /*
            De lg para cima a coluna de texto tem a largura exata da fita de
            serviços, 418px, que são duas pílulas de 205 mais os 8 do vão.
            Assim o texto começa e termina junto com as pílulas e a foto fica
            com todo o resto, sem sobra em nenhuma das duas pontas. Mudou a
            largura da pílula, muda este número.

            Entre md e lg a divisão volta a ser meio a meio: com 418px fixos
            numa tela de 768 sobrariam 230px para a foto, que tem 420 de
            altura e viraria uma tira em pé.
          */
          return (
            <div
              key={f.id}
              data-reveal-group
              className={`md:grid md:grid-cols-2 md:items-center md:gap-14 ${
                fotoPrimeiro
                  ? "lg:grid-cols-[minmax(0,1fr)_418px]"
                  : "lg:grid-cols-[418px_minmax(0,1fr)]"
              }`}
            >
              <div
                data-reveal
                className={`mb-6 overflow-hidden rounded-3xl shadow-[0_20px_44px_-24px_rgb(12_22_34/0.45)] md:mb-0 md:rounded-[1.75rem] ${
                  fotoPrimeiro ? "" : "md:order-2"
                }`}
              >
                <img
                  src={f.image}
                  alt={f.title}
                  loading="lazy"
                  className="h-[280px] w-full object-cover md:h-[420px]"
                />
              </div>

              {/* Com a foto à direita, o texto encosta nela: alinhado à
                  esquerda sobrava um vão entre a fita de serviços e a foto */}
              <div
                data-reveal
                className={`text-center ${fotoPrimeiro ? "md:text-left" : "md:text-right"}`}
              >
                {/* 34px e não 38: em 38 "Esquadrias de Alumínio" não cabe nos
                    418px da coluna e quebra em duas linhas */}
                <h3 className="font-display mb-3 text-[26px] leading-tight font-semibold md:text-[34px]">
                  {f.title}
                </h3>

                <p className="mx-auto mb-6 max-w-[480px] text-[15px] leading-relaxed text-steel md:mx-0">
                  {f.text}
                </p>

                <ServiceTrack
                  items={SERVICES_BY_FOCUS[f.id]}
                  direction={fotoPrimeiro ? "left" : "right"}
                  alinharDireita={!fotoPrimeiro}
                />

                <Link
                  to={f.link}
                  className="inline-flex min-h-11 items-center text-sm font-bold text-accent hover:underline"
                >
                  {f.linkText}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
