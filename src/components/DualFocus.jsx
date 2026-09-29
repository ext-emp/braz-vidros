import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FOCUS, SERVICES_GLASS, SERVICES_ALUMINUM } from "../data/content.js";
import { srcsetDaGaleria } from "../data/galeria.js";

const FOTO_SIZES =
  "(min-width: 1024px) 678px, (min-width: 768px) calc(50vw - 3.75rem), calc(100vw - 2.5rem)";

/* Os serviços de cada especialidade, na ordem em que entram no trilho */
const SERVICES_BY_FOCUS = {
  vidracaria: SERVICES_GLASS,
  esquadrias: SERVICES_ALUMINUM,
};

const chipClass =
  "flex min-h-11 w-[205px] shrink-0 items-center justify-center whitespace-nowrap rounded-full border border-accent bg-accent px-2 py-2.5 text-center text-[13px] font-medium text-white shadow-[0_4px_12px_-6px_rgb(50_53_96/0.55)] transition-colors duration-300 hover:border-ink hover:bg-ink";

/* Quanto a fita anda por segundo, em px. Igual nas duas para não parecer
   que uma especialidade corre mais que a outra */
const VELOCIDADE = 26;

/* A partir de quantos px o gesto deixa de ser toque e vira arraste. Abaixo
   disso o clique passa e a pílula leva para a página da especialidade */
const LIMIAR_ARRASTE = 6;

function ServiceTrack({ items, to, destino, direction, alinharDireita = false }) {
  const tapeRef = useRef(null);

  useEffect(() => {
    const tape = tapeRef.current;
    if (!tape) return;

    const desktop = window.matchMedia("(min-width: 768px)");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
    const velocidade = direction === "right" ? VELOCIDADE : -VELOCIDADE;

    let ativo = false;
    let raf = 0;
    let observador = null;
    let ultimo = 0;
    let offset = 0;
    let meiaFita = 0;
    let arrastando = false;
    let inicioX = 0;
    let inicioOffset = 0;
    // O gesto passou do limiar: era arraste, não toque numa pílula
    let moveu = false;
    // Alguma pílula está com o foco do teclado
    let focado = false;

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
      if (!arrastando && !focado && !semMovimento.matches) {
        offset = normalizar(offset + velocidade * dt);
        aplicar();
      }
      raf = requestAnimationFrame(passo);
    };

    /* A captura do ponteiro só é pedida quando o gesto vira arraste, e não
       aqui: capturado desde o pointerdown, o clique de um toque parado passa
       a ser entregue à fita em vez da pílula, e o link nunca navega */
    const aoPegar = (e) => {
      arrastando = true;
      moveu = false;
      inicioX = e.clientX;
      inicioOffset = offset;
    };

    const aoMover = (e) => {
      if (!arrastando) return;
      const dx = e.clientX - inicioX;
      if (!moveu && Math.abs(dx) > LIMIAR_ARRASTE) {
        moveu = true;
        // Daqui em diante o gesto é da fita, mesmo que o dedo saia dela
        try {
          tape.setPointerCapture(e.pointerId);
        } catch {
          /* navegador sem pointer capture: o arraste ainda funciona */
        }
      }
      offset = normalizar(inicioOffset + dx);
      aplicar();
    };

    const aoSoltar = (e) => {
      if (!arrastando) return;
      arrastando = false;
      try {
        if (tape.hasPointerCapture(e.pointerId)) tape.releasePointerCapture(e.pointerId);
      } catch {
        /* idem */
      }
    };

    /* Arrastar a fita não pode navegar. Na captura, antes do link ver o
       evento, e só quando o gesto passou do limiar: um toque parado em cima
       da pílula segue valendo como clique */
    const aoClicar = (e) => {
      // detail 0 é o clique disparado pelo Enter no teclado, que nunca é
      // arraste: sem esta guarda um arraste anterior bloquearia a navegação
      if (!moveu || e.detail === 0) return;
      e.preventDefault();
      e.stopPropagation();
    };

    /* Fita andando com uma pílula em foco levaria o alvo do teclado para
       fora da janela do trilho */
    const aoFocar = () => {
      focado = true;
    };
    const aoDesfocar = () => {
      focado = false;
    };

    const aoRedimensionar = () => {
      if (ativo) medir();
    };

    const ligar = () => {
      if (ativo) return;
      ativo = true;
      ultimo = 0;
      observador = new ResizeObserver(aoRedimensionar);
      observador.observe(tape);
      if (tape.firstElementChild) observador.observe(tape.firstElementChild);
      raf = requestAnimationFrame(passo);
      tape.addEventListener("pointerdown", aoPegar);
      tape.addEventListener("pointermove", aoMover);
      tape.addEventListener("pointerup", aoSoltar);
      tape.addEventListener("pointercancel", aoSoltar);
      tape.addEventListener("click", aoClicar, true);
      tape.addEventListener("focusin", aoFocar);
      tape.addEventListener("focusout", aoDesfocar);
    };

    const desligar = () => {
      if (!ativo) return;
      ativo = false;
      arrastando = false;
      moveu = false;
      focado = false;
      cancelAnimationFrame(raf);
      observador?.disconnect();
      observador = null;
      tape.style.transform = "";
      tape.removeEventListener("pointerdown", aoPegar);
      tape.removeEventListener("pointermove", aoMover);
      tape.removeEventListener("pointerup", aoSoltar);
      tape.removeEventListener("pointercancel", aoSoltar);
      tape.removeEventListener("click", aoClicar, true);
      tape.removeEventListener("focusin", aoFocar);
      tape.removeEventListener("focusout", aoDesfocar);
    };

    const sincronizar = () => (desktop.matches ? desligar() : ligar());

    sincronizar();
    desktop.addEventListener("change", sincronizar);

    return () => {
      desligar();
      desktop.removeEventListener("change", sincronizar);
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
            <Link
              key={s.title}
              to={to}
              /* Sem isto o navegador entende o arraste da fita com o mouse
                 como arrastar o link e abre o fantasma da URL */
              draggable={false}
              aria-label={`${s.title}, ver em ${destino}`}
              className={chipClass}
            >
              {s.title}
            </Link>
          ))}
        </div>
        {/* Cópia só para o loop: fora da leitura e fora da ordem de tabulação,
            senão a mesma lista de serviços aparece duas vezes */}
        <div className="focus-group focus-group-dup" aria-hidden="true">
          {items.map((s) => (
            <Link
              key={s.title}
              to={to}
              draggable={false}
              tabIndex={-1}
              className={chipClass}
            >
              {s.title}
            </Link>
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
        {/* Uma frase por linha. Os spans em bloco no lugar do <br /> deixam cada
            frase equilibrar as próprias linhas com o text-balance: no celular a
            primeira quebrava deixando só "obra." embaixo */}
        <p
          data-reveal
          className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-steel md:mx-0 md:mt-5"
        >
          <span className="block">Vidro e alumínio andam juntos em quase toda obra.</span>
          <span className="block">Aqui você resolve os dois com a mesma equipe.</span>
        </p>
      </div>

      <div className="flex flex-col gap-14 md:gap-20">
        {FOCUS.map((f, i) => {
          const fotoPrimeiro = i % 2 === 0;
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
                  srcSet={srcsetDaGaleria(f.image)}
                  sizes={FOTO_SIZES}
                  alt={f.imageAlt ?? f.title}
                  loading="lazy"
                  // Ponto do recorte do object-cover; sem ele, centro
                  style={{ objectPosition: f.imagePosition }}
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

                {/* Cada fita leva para a página do seu próprio card */}
                <ServiceTrack
                  items={SERVICES_BY_FOCUS[f.id]}
                  to={f.link}
                  destino={f.title}
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
