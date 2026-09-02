import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";
import { HERO_SLIDES, HERO_STATS } from "../data/content.js";

/* Leva à faixa de projetos da própria home. Quando o ScrollSmoother está
   ativo quem manda na posição é ele, e não o scroll nativo */
function verProjetos() {
  const alvo = document.getElementById("projetos");
  if (!alvo) return;
  const suave = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(alvo, suave);
  else alvo.scrollIntoView({ behavior: suave ? "smooth" : "auto" });
}

const SLIDE_SECONDS = 9;

// Duração do mosaico: stagger (0,85) + a peça mais lenta (1,05)
const MOSAIC_SECONDS = 1.9;

// Em que ponto do mosaico o texto do novo slide entra
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
  const statsRef = useRef(null);
  const busyRef = useRef(false);
  // Estado do mosaico de entrada. Em ref, não em state: o React 19 em
  // StrictMode monta duas vezes no dev, e a ref sobrevive à segunda passada
  const introRef = useRef({ started: false, done: false });
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

  /*
    Monta `imageUrl` em mosaico por cima do palco e devolve a timeline.
    `onAssembled` roda com as peças já no lugar, antes do overlay dissolver:
    é a hora de trocar o fundo por baixo, porque nesse instante os dois são
    a mesma imagem e a troca não aparece.
  */
  const playMosaic = (imageUrl, onAssembled) => {
    // 17×17 no desktop, 8×8 no mobile (performance)
    const small = window.innerWidth < 768;
    const cols = small ? 8 : 17;
    const rows = small ? 8 : 17;
    const { overlay, tiles } = buildMosaic(stageRef.current, imageUrl, cols, rows);

    const tl = gsap.timeline({
      onComplete: () => {
        onAssembled?.();
        // Dissolve em vez de remover num frame só (sem travada)
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

    return tl;
  };

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

    const tl = playMosaic(target.image, () => {
      bgRef.current.style.backgroundImage = `url(${target.image})`;
      gsap.set(bgRef.current, { scale: 1 });
    });

    // Texto entra com o mosaico ainda assentando: as peças que faltam são as
    // do centro, atrás da foto, então o fundo já está estável
    tl.call(() => setActive(next), null, TEXT_LEAD);
  });
  goToRef.current = goTo;

  const playIntro = contextSafe(async (imageUrl) => {
    await preload(imageUrl);
    if (!stageRef.current) return;
    playMosaic(imageUrl, () => {
      bgRef.current.style.backgroundImage = `url(${imageUrl})`;
      introRef.current.done = true;
      busyRef.current = false;
    });
  });

  /*
    Entrada do site: a primeira foto se monta pelo mesmo mosaico das trocas,
    em vez de já aparecer pronta com só o texto animando.
    O fundo começa vazio (o palco é escuro): se ficasse com a foto, ela
    apareceria inteira atrás das peças e não sobraria efeito nenhum.
  */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (introRef.current.started) return;
    introRef.current.started = true;
    busyRef.current = true;
    bgRef.current.style.backgroundImage = "none";
    playIntro(HERO_SLIDES[0].image);
  }, { scope: rootRef });

  // Entrada do texto + autoplay, roda a cada troca de slide
  useGSAP(
    () => {
      const panel = panelRef.current;
      const chars = panel.querySelectorAll("[data-char]");
      const lines = panel.querySelectorAll("[data-line]");
      const cta = panel.querySelectorAll("[data-cta]");
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      // Enquanto o mosaico de entrada não terminou, este é o primeiro slide
      const first = !introRef.current.done;

      if (reduced) {
        gsap.set([panel, chars, lines, cta], { clearProps: "all", opacity: 1 });
        busyRef.current = false;
      } else {
        const tl = gsap.timeline({
          // Na primeira visita o texto espera o mesmo tempo que espera numa
          // troca: entra com o mosaico de entrada ainda assentando
          delay: first ? TEXT_LEAD : 0,
          // No primeiro run quem destrava é o mosaico de entrada, que termina
          // depois do texto
          onComplete: () => {
            if (!first) busyRef.current = false;
          },
        });
        /*
          Posições absolutas em vez de encadeadas: as camadas se sobrepõem
          sem perder a ordem de leitura.
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

        /*
          Os números fecham a entrada, na mesma assinatura do CTA.
          Só na primeira montagem: eles não mudam de slide, então animar a
          cada troca faria a faixa piscar de nove em nove segundos.
        */
        if (first && statsRef.current) {
          tl.from(
            statsRef.current.querySelectorAll("[data-stat]"),
            { y: 24, opacity: 0, duration: 0.45, ease: "power3.out", stagger: 0.08 },
            0.46
          );
        }
      }

      // Ambiente: Ken Burns lento durante a vida do slide. Na primeira visita
      // só começa depois do mosaico de entrada, senão o fundo já estaria
      // ampliado quando o overlay dissolve e a troca daria um pulo
      if (!reduced) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1 },
          {
            scale: 1.07,
            duration: SLIDE_SECONDS + 2,
            ease: "none",
            delay: first ? MOSAIC_SECONDS : 0,
          }
        );
      }

      // O primeiro slide ganha o adiantamento do texto de volta: nas trocas o
      // relógio só começa quando o texto entra, aqui ele começa na montagem
      const total =
        SLIDE_SECONDS + (reduced ? 0 : 1.2) + (first && !reduced ? TEXT_LEAD : 0);

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
        {/* Acima do mosaico (z-1): segura a legibilidade durante a transição */}
        <div className="hero-scrim pointer-events-none absolute inset-0 z-[3]" />

        <div className="absolute inset-0 z-[4] flex items-center">
          <div className="container-hero">
            <div key={active} ref={panelRef} className="max-w-[44rem]">
              <p data-exit className="eyebrow mb-5 text-accent-soft" aria-label={slide.label}>
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
                <button
                  data-cta
                  type="button"
                  onClick={verProjetos}
                  className="block w-full rounded-full border border-white/45 px-3 py-3.5 text-center text-xs font-semibold whitespace-nowrap text-white transition-colors duration-300 hover:border-white sm:w-auto sm:px-7 sm:py-4 sm:text-[0.9375rem]"
                >
                  Ver projetos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Fora do painel animado: os números não mudam de slide */}
        <div className="absolute inset-x-0 bottom-28 z-[4] lg:bottom-22">
          <div className="container-hero flex lg:justify-end">
            <ul ref={statsRef} className="flex items-end gap-8 sm:gap-12 lg:gap-14">
              {HERO_STATS.map((s) => (
                <li key={s.label} data-stat className="text-center">
                  <p className="font-display text-3xl leading-none font-semibold text-white lg:text-4xl">
                    {s.value}
                  </p>
                  <p className="mt-2 text-xs text-white/60">{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* No celular fica centralizado na base; no desktop vira coluna à
            direita, longe do canto inferior onde mora o botão flutuante do
            WhatsApp */}
        <div
          ref={pagerRef}
          role="tablist"
          aria-label="Banners"
          className="absolute inset-x-0 bottom-10 z-[5] flex flex-row items-center justify-center gap-3.5 lg:inset-x-auto lg:right-8 lg:bottom-52 lg:flex-col lg:items-end"
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
