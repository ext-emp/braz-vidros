import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO_SLIDES, HERO_STATS } from "../data/content.js";

const SLIDE_SECONDS = 9;

// Em que ponto do mosaico (que dura ~1,9s) o texto do novo slide entra
const TEXT_LEAD = 1;

/*
  Efeito do hero decodificado do tema Archipark (Slider Revolution 6.4.6):
  - Transição em mosaico: a foto fatiada numa grade de peças que se montam
    das bordas para o centro, cada uma com rotação/escala/offset próprios.
  - Texto em 3 camadas mascaradas: etiqueta letra a letra, título deslizante e CTA.
  - ~9s por slide, zoom lento ambiente (Ken Burns) na foto de fundo.
  Recriado com GSAP puro (stagger grid + from:"edges").
*/

function buildMosaic(container, imageUrl, cols, rows) {
  const W = container.clientWidth;
  const H = container.clientHeight;
  const tileW = W / cols;
  const tileH = H / rows;
  // Sangria de 1px em cada lado: as peças se sobrepõem e as frestas
  // de subpixel não deixam a foto anterior vazar em linhas finas
  const bleed = 1;
  const overlay = document.createElement("div");
  // z-index 1: mesmo nível do fundo e abaixo do scrim (z-3), pra foto não
  // clarear durante a transição
  overlay.style.cssText = "position:absolute;inset:0;z-index:1;overflow:hidden;";
  const tiles = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const left = c * tileW - bleed;
      const top = r * tileH - bleed;
      const tile = document.createElement("div");
      tile.style.cssText =
        `position:absolute;left:${left}px;top:${top}px;` +
        `width:${tileW + bleed * 2}px;height:${tileH + bleed * 2}px;` +
        "overflow:hidden;will-change:transform,opacity;outline:1px solid transparent;";
      const inner = document.createElement("div");
      inner.style.cssText =
        `position:absolute;width:${W}px;height:${H}px;left:${-left}px;top:${-top}px;` +
        `background-image:url(${imageUrl});background-size:cover;background-position:center;`;
      tile.appendChild(inner);
      overlay.appendChild(tile);
      tiles.push(tile);
    }
  }
  container.appendChild(overlay);
  return { overlay, tiles };
}

function preload(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
    setTimeout(resolve, 2500); // nunca travar a transição por causa de rede
  });
}

export default function Hero() {
  const [active, setActive] = useState(0);
  const rootRef = useRef(null);
  const stageRef = useRef(null);
  const bgRef = useRef(null);
  const panelRef = useRef(null);
  const pagerRef = useRef(null);
  const busyRef = useRef(false);
  const firstRunRef = useRef(true);
  const goToRef = useRef(() => {});
  const timerRef = useRef(null);

  const slide = HERO_SLIDES[active];

  /*
    Zera os três trilhos e mata o que estiver animando neles.
    O kill é obrigatório: useGSAP com `dependencies` só reverte no unmount,
    não a cada troca, então sem ele o tween do slide que saiu continua
    escrevendo scaleX e a barra antiga enche junto com a nova.
  */
  const resetFills = () => {
    const fills = pagerRef.current?.querySelectorAll("[data-fill]");
    if (!fills?.length) return null;
    gsap.killTweensOf(fills);
    gsap.set(fills, { scaleX: 0, transformOrigin: "0% 50%" });
    return fills;
  };

  /* Mesma história do autoplay: o timer do slide anterior sobreviveria à
     troca e dispararia depois, pulando o banner sozinho */
  const stopAutoplay = () => {
    timerRef.current?.kill();
    timerRef.current = null;
  };

  const { contextSafe } = useGSAP({ scope: rootRef });

  const goTo = contextSafe(async (next) => {
    if (busyRef.current || next === active) return;
    busyRef.current = true;

    // Já no clique, não ao fim da transição: ela leva ~2s, e nesse meio
    // tempo a barra do slide que está saindo continuaria enchendo
    stopAutoplay();
    resetFills();

    const target = HERO_SLIDES[next];
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Saída do texto atual: fade escalonado, acelerando (easing de saída)
    gsap.to(panelRef.current.querySelectorAll("[data-exit]"), {
      y: -22,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in",
      stagger: 0.055,
    });

    await preload(target.image);

    if (reduced) {
      // Sem mosaico: crossfade simples
      const fader = document.createElement("div");
      fader.style.cssText =
        `position:absolute;inset:0;z-index:1;opacity:0;` +
        `background-image:url(${target.image});background-size:cover;background-position:center;`;
      stageRef.current.appendChild(fader);
      gsap.to(fader, {
        opacity: 1,
        duration: 0.5,
        onComplete: () => {
          bgRef.current.style.backgroundImage = `url(${target.image})`;
          fader.remove();
          setActive(next);
        },
      });
      return;
    }

    // Congela o Ken Burns da foto antiga: fundo parado atrás do mosaico
    gsap.killTweensOf(bgRef.current);

    // Mosaico: 17×17 no desktop, 8×8 no mobile (performance)
    const small = window.innerWidth < 768;
    const cols = small ? 8 : 17;
    const rows = small ? 8 : 17;
    const { overlay, tiles } = buildMosaic(stageRef.current, target.image, cols, rows);

    const tl = gsap.timeline({
      onComplete: () => {
        // O overlay pronto é idêntico ao novo fundo: troca por baixo e
        // dissolve o overlay em vez de remover num frame só (sem travada)
        bgRef.current.style.backgroundImage = `url(${target.image})`;
        gsap.set(bgRef.current, { scale: 1 });
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: "power1.inOut",
          onComplete: () => overlay.remove(),
        });
      },
    });

    tl.from(tiles, {
      opacity: 0,
      x: () => gsap.utils.random(-140, 140),
      y: () => gsap.utils.random(-140, 140),
      rotation: () => gsap.utils.random(-24, 24),
      scale: () => gsap.utils.random(1.5, 2.4),
      duration: 1.05,
      ease: "power3.out",
      stagger: { amount: 0.85, grid: [rows, cols], from: "edges" },
    });

    // O texto novo entra com o mosaico ainda assentando. Esperar o fim dele
    // (1,9s) mais a entrada deixava o título quase 2,5s fora da tela depois
    // da troca. As peças que faltam são as do centro, atrás da foto, então
    // o texto já tem fundo estável quando aparece
    tl.call(() => setActive(next), null, TEXT_LEAD);
  });
  goToRef.current = goTo;

  // Entrada do texto + autoplay, roda a cada troca de slide
  useGSAP(
    () => {
      const panel = panelRef.current;
      const chars = panel.querySelectorAll("[data-char]");
      const lines = panel.querySelectorAll("[data-line]");
      const cta = panel.querySelectorAll("[data-cta]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const first = firstRunRef.current;
      firstRunRef.current = false;

      if (reduced) {
        gsap.set([panel, chars, lines, cta], { clearProps: "all", opacity: 1 });
        busyRef.current = false;
      } else {
        const tl = gsap.timeline({
          delay: first ? 0.15 : 0,
          onComplete: () => (busyRef.current = false),
        });
        /*
          Posições absolutas em vez de encadeadas: antes cada camada começava
          onde a anterior acabava, e o título era o terceiro da fila, saindo
          só aos 0,57s. Agora as três se sobrepõem e ele parte quase junto
          com a etiqueta, sem perder a ordem de leitura.
          Stagger por "amount" (não "each"): tempo total fixo não importa o
          tamanho do texto, então uma etiqueta longa não atrasa tudo.
        */
        tl.from(panel, { y: 18, opacity: 0, duration: 0.35, ease: "power3.out" }, 0)
          // Etiqueta: letra a letra, girando de -90° por trás da máscara (sentido reverso)
          .from(
            chars,
            {
              xPercent: -110,
              rotation: -90,
              duration: 0.35,
              ease: "power3.out",
              stagger: { amount: 0.18, from: "end" },
            },
            0.04
          )
          // Título: linhas deslizam da esquerda sob máscara
          .from(
            lines,
            { xPercent: -115, duration: 0.45, ease: "power3.out", stagger: 0.06 },
            0.1
          )
          // CTA sobe suave por último
          .from(cta, { y: 20, opacity: 0, duration: 0.3, ease: "power3.out", stagger: 0.05 }, 0.34);
      }

      // Ambiente: Ken Burns lento durante a vida do slide
      if (!reduced) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1 },
          { scale: 1.07, duration: SLIDE_SECONDS + 2, ease: "none" }
        );
      }

      const total = SLIDE_SECONDS + (reduced ? 0 : 1.2);

      // Trilho do slide corrente: enche no mesmo tempo do autoplay, então a
      // barra é o próprio relógio da troca. scaleX em vez de width para a
      // animação ficar no compositor
      const fills = resetFills();
      if (fills) {
        if (reduced) gsap.set(fills[active], { scaleX: 1 });
        else gsap.to(fills[active], { scaleX: 1, duration: total, ease: "none" });
      }

      stopAutoplay();
      timerRef.current = gsap.delayedCall(total, () =>
        goToRef.current((active + 1) % HERO_SLIDES.length)
      );
      return stopAutoplay;
    },
    { dependencies: [active], scope: rootRef }
  );

  return (
    <section id="inicio" ref={rootRef}>
      <div
        ref={stageRef}
        className="relative h-[100svh] min-h-[540px] overflow-hidden bg-ink"
      >
        {/* Fundo (camada base) */}
        <div
          ref={bgRef}
          className="absolute inset-0 z-[1] bg-cover bg-center will-change-transform"
          style={{ backgroundImage: `url(${HERO_SLIDES[0].image})` }}
          role="img"
          aria-label={slide.label}
        />
        {/* Sem card e sem escurecimento uniforme: todo o contraste do texto
            vem deste degradê, que pesa na margem esquerda e deixa a foto
            limpa do centro para a direita. Como fica acima do mosaico (z-1),
            também segura a legibilidade durante a transição */}
        <div className="hero-scrim pointer-events-none absolute inset-0 z-[3]" />

        {/* Texto sem caixa por baixo: ancorado à esquerda e centrado na
            vertical. Os números ficam numa camada própria, no rodapé */}
        <div className="absolute inset-0 z-[4] flex items-center">
          <div className="container-hero">
            <div key={active} ref={panelRef} className="max-w-[40rem]">
              <p data-exit className="eyebrow mb-5 text-accent-soft" aria-label={slide.label}>
                {/* Risquinho que abre a etiqueta */}
                <span
                  aria-hidden="true"
                  className="mr-3 inline-block h-px w-[26px] bg-accent-soft align-middle"
                />
                {slide.label.split("").map((ch, i) => (
                  <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden="true">
                    <span
                      data-char
                      className="inline-block will-change-transform"
                      style={{ transformOrigin: "0% 100%" }}
                    >
                      {ch === " " ? " " : ch}
                    </span>
                  </span>
                ))}
              </p>
              <h1
                data-exit
                /* Serifada em peso médio: o título é a voz do hero, agora sem
                   caixa nem sombra para apoiá-lo. O clamp cresce por vw, então
                   cada linha cabe inteira e não quebra em três no celular */
                className="font-display text-[clamp(2.15rem,6.2vw,4.6rem)] leading-[1.03] font-medium tracking-[-0.015em] text-white"
              >
                {slide.title.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-1">
                    <span data-line className="block will-change-transform">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              <p
                data-exit
                data-cta
                className="mt-5 max-w-[29rem] text-[1.0625rem] leading-[1.55] text-white/70"
              >
                {slide.lede}
              </p>
              {/* Grade de duas colunas no celular: os botões saem exatamente do
                  mesmo tamanho. A partir de sm voltam à largura natural */}
              <div
                data-exit
                className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-nowrap sm:items-center sm:gap-3.5"
              >
                <a
                  data-cta
                  href={slide.cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sheen block w-full rounded-full bg-accent-soft px-3 py-3.5 text-center text-xs font-bold tracking-wide whitespace-nowrap text-ink transition-colors duration-300 hover:bg-white sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
                >
                  {slide.cta.text}
                </a>
                {/* hover sem transform: transição CSS de transform brigaria
                    com a animação de entrada do GSAP neste mesmo elemento */}
                <Link
                  data-cta
                  to="/projetos"
                  className="block w-full rounded-full border border-white/45 px-3 py-3.5 text-center text-xs font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:border-white sm:w-auto sm:px-7 sm:py-4 sm:text-[0.9375rem]"
                >
                  Ver projetos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Números da casa: camada própria colada no rodapé, fora do painel
            animado porque não mudam de slide. À direita no desktop, alinhados
            com o texto no celular */}
        <div className="absolute inset-x-0 bottom-28 z-[4] lg:bottom-22">
          <div className="container-hero flex lg:justify-end">
            <ul className="flex items-end gap-8 sm:gap-12 lg:gap-14">
              {HERO_STATS.map((s) => (
                <li key={s.label}>
                  <p className="font-display text-3xl leading-none font-semibold text-white lg:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-white/60">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Paginação: coluna à direita no desktop, linha à esquerda no
            celular. Nos dois casos fica fora do canto inferior direito, que
            é onde mora o botão flutuante do WhatsApp */}
        <div
          ref={pagerRef}
          role="tablist"
          aria-label="Banners"
          className="absolute bottom-10 left-5 z-[5] flex flex-row items-center gap-3.5 lg:right-8 lg:bottom-52 lg:left-auto lg:flex-col lg:items-end"
        >
          {HERO_SLIDES.map((s, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              onClick={() => goTo(i)}
              aria-label={`Ir para o slide ${i + 1}: ${s.label}`}
              className={`flex items-center gap-3 py-1 text-[0.8125rem] font-semibold tracking-[0.04em] transition-colors duration-200 ${
                i === active ? "text-white" : "text-white/45 hover:text-white"
              }`}
            >
              {/* O número só cabe no desktop, onde a lista é vertical */}
              <span aria-hidden="true" className="hidden lg:block">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="block h-[3px] w-10 overflow-hidden bg-white/25 lg:h-0.5 lg:w-11.5">
                <span data-fill className="block h-full w-full origin-left bg-accent-soft" />
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
