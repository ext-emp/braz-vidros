import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { HERO_SLIDES } from "../data/content.js";

const SLIDE_SECONDS = 9;

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
  // z-index 1: mesmo nível do fundo e abaixo do escurecimento (z-2), pra
  // foto não clarear durante a transição
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
  const busyRef = useRef(false);
  const firstRunRef = useRef(true);
  const goToRef = useRef(() => {});

  const slide = HERO_SLIDES[active];

  const { contextSafe } = useGSAP({ scope: rootRef });

  const goTo = contextSafe(async (next) => {
    if (busyRef.current || next === active) return;
    busyRef.current = true;

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

    gsap.from(tiles, {
      opacity: 0,
      x: () => gsap.utils.random(-140, 140),
      y: () => gsap.utils.random(-140, 140),
      rotation: () => gsap.utils.random(-24, 24),
      scale: () => gsap.utils.random(1.5, 2.4),
      duration: 1.05,
      ease: "power3.out",
      stagger: { amount: 0.85, grid: [rows, cols], from: "edges" },
      onComplete: () => {
        // O overlay pronto é idêntico ao novo fundo: troca por baixo e
        // dissolve o overlay em vez de remover num frame só (sem travada)
        bgRef.current.style.backgroundImage = `url(${target.image})`;
        gsap.set(bgRef.current, { scale: 1 });
        setActive(next);
        gsap.to(overlay, {
          opacity: 0,
          duration: 0.35,
          ease: "power1.inOut",
          onComplete: () => overlay.remove(),
        });
      },
    });
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
        // Camada secundária: o painel de vidro chega antes do conteúdo.
        // Stagger por "amount" (não "each"): tempo total fixo não importa
        // o tamanho do texto, então uma etiqueta longa não atrasa tudo.
        tl.from(panel, { y: 18, opacity: 0, duration: 0.4, ease: "power3.out" })
          // Etiqueta: letra a letra, girando de -90° por trás da máscara (sentido reverso)
          .from(
            chars,
            {
              xPercent: -110,
              rotation: -90,
              duration: 0.4,
              ease: "power3.out",
              stagger: { amount: 0.22, from: "end" },
            },
            "-=0.2"
          )
          // Título: linhas deslizam da esquerda sob máscara
          .from(
            lines,
            { xPercent: -115, duration: 0.5, ease: "power3.out", stagger: 0.07 },
            "-=0.25"
          )
          // CTA sobe suave por último
          .from(cta, { y: 20, opacity: 0, duration: 0.32, ease: "power3.out", stagger: 0.05 }, "-=0.22");
      }

      // Ambiente: Ken Burns lento durante a vida do slide
      if (!reduced) {
        gsap.fromTo(
          bgRef.current,
          { scale: 1 },
          { scale: 1.07, duration: SLIDE_SECONDS + 2, ease: "none" }
        );
      }

      // Autoplay: avança sozinho, mas sem indicador visual — o clique
      // manual nos dots sempre pode interromper e pular pra qualquer slide
      const timer = gsap.delayedCall(SLIDE_SECONDS + (reduced ? 0 : 1.2), () =>
        goToRef.current((active + 1) % HERO_SLIDES.length)
      );
      return () => timer.kill();
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
        {/* Opacidade suave e uniforme sobre toda a foto */}
        <div className="pointer-events-none absolute inset-0 z-[2] bg-ink/50" />
        {/* Scrim extra para legibilidade atrás do texto: acima do mosaico, abaixo do texto */}
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{
            background:
              "linear-gradient(75deg, rgb(12 22 34 / 0.65) 0%, rgb(12 22 34 / 0.3) 45%, rgb(12 22 34 / 0.1) 70%)",
          }}
        />

        {/* Painel de vidro com o texto */}
        <div className="absolute inset-0 z-[4] flex items-end">
          <div className="container-site pb-14 md:pb-20">
            <div
              key={active}
              ref={panelRef}
              className="glass-dark max-w-2xl rounded-3xl p-6 sm:p-8 md:p-10"
            >
              <p data-exit className="eyebrow mb-4 text-accent-soft" aria-label={slide.label}>
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
                /* No celular o corpo acompanha a largura da tela (clamp), então
                   cada linha do título cabe inteira e não quebra em três */
                className="font-display text-[clamp(1.65rem,7vw,2.25rem)] leading-[1.08] font-semibold text-white sm:text-5xl md:text-6xl lg:text-7xl"
              >
                {slide.title.map((line, i) => (
                  <span key={i} className="block overflow-hidden pb-1">
                    <span data-line className="block will-change-transform">
                      {line}
                    </span>
                  </span>
                ))}
              </h1>
              {/* Grade de duas colunas no celular: os botões saem exatamente do
                  mesmo tamanho. A partir de sm voltam à largura natural */}
              <div
                data-exit
                className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-nowrap sm:items-center sm:gap-4"
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
                  className="glass-dark block w-full rounded-full px-3 py-3.5 text-center text-xs font-semibold whitespace-nowrap text-white transition-[filter] duration-300 hover:brightness-150 sm:w-auto sm:px-8 sm:py-4 sm:text-sm"
                >
                  Ver projetos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Controles */}
        <div className="absolute right-5 bottom-5 z-[5] flex items-center gap-3 md:right-8 md:bottom-8">
          {HERO_SLIDES.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Ir para o slide ${i + 1}: ${s.label}`}
              className={`h-2.5 rounded-full transition-all duration-500 ${
                i === active ? "w-8 bg-accent-soft" : "glass-dark w-2.5 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
