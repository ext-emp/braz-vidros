import { useCallback, useEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/*
  Galeria em tela cheia das fotos de projeto.
  Navegação: setas na tela, teclado (← → Esc) e arrastar com o dedo/mouse.
  A foto entra deslizando do lado de onde veio, então a direção do gesto
  bate com a direção do movimento.
*/
export default function Lightbox({ items, index, onClose, onIndexChange }) {
  const rootRef = useRef(null);
  const frameRef = useRef(null);
  const dirRef = useRef(1); // 1 = veio da direita, -1 = da esquerda
  const dragRef = useRef(null);

  const total = items.length;
  const item = items[index];

  const go = useCallback(
    (step) => {
      if (total < 2) return;
      dirRef.current = step;
      onIndexChange((index + step + total) % total);
    },
    [index, total, onIndexChange]
  );

  // Teclado + trava do scroll do fundo enquanto a galeria está aberta
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    rootRef.current?.focus();

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [go, onClose]);

  // Pré-carrega vizinhas: a troca não pisca esperando a rede
  useEffect(() => {
    if (total < 2) return;
    [(index + 1) % total, (index - 1 + total) % total].forEach((i) => {
      const img = new Image();
      img.src = items[i].image;
    });
  }, [index, items, total]);

  // Abertura do painel
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.from(rootRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
      gsap.from(frameRef.current, { scale: 0.94, duration: 0.35, ease: "power3.out" });
    },
    { scope: rootRef }
  );

  // Troca de foto: entra do lado de onde veio
  useGSAP(
    () => {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) return;
      gsap.fromTo(
        frameRef.current,
        { xPercent: dirRef.current * 12, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 0.35, ease: "power3.out" }
      );
    },
    { dependencies: [index], scope: rootRef }
  );

  // Arrastar para o lado (dedo ou mouse)
  const onPointerDown = (e) => {
    dragRef.current = { x: e.clientX, y: e.clientY };
  };
  const onPointerUp = (e) => {
    const start = dragRef.current;
    dragRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    // Só conta como swipe se for claramente horizontal
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
  };

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      role="dialog"
      aria-modal="true"
      aria-label={`Foto ${index + 1} de ${total}: ${item.title}`}
      onClick={onClose}
      /* Corredor lateral reservado a partir de sm: a foto nunca passa por
         baixo das setas. No celular a navegação vai para a barra de baixo */
      className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-ink/95 p-4 backdrop-blur-sm outline-none sm:px-24 sm:py-8"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Fechar galeria"
        className="glass-dark absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full text-xl leading-none text-white transition-transform duration-300 hover:scale-110 md:top-6 md:right-6"
      >
        &times;
      </button>

      {total > 1 && (
        <>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Foto anterior"
            className="glass-dark absolute left-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full text-2xl leading-none text-white transition-transform duration-300 hover:scale-110 sm:flex md:left-6 md:h-14 md:w-14"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Próxima foto"
            className="glass-dark absolute right-4 z-10 hidden h-12 w-12 items-center justify-center rounded-full text-2xl leading-none text-white transition-transform duration-300 hover:scale-110 sm:flex md:right-6 md:h-14 md:w-14"
          >
            &#8250;
          </button>
        </>
      )}

      {/* Clique dentro da foto não fecha: só o fundo fecha */}
      <div
        ref={frameRef}
        onClick={(e) => e.stopPropagation()}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="flex max-w-5xl flex-col items-center gap-4 select-none"
      >
        <img
          src={item.image}
          alt={item.title}
          draggable={false}
          className="max-h-[56vh] w-auto rounded-2xl object-contain shadow-2xl sm:max-h-[72vh]"
        />
        <div className="glass-dark rounded-2xl px-5 py-3 text-center">
          <p className="text-sm font-semibold text-white">{item.title}</p>
          <p className="text-xs text-accent-soft">
            {item.category} &middot; {index + 1} de {total}
          </p>
        </div>
      </div>

      {/* Navegação do celular: fora da foto, embaixo da legenda */}
      {total > 1 && (
        <div className="mt-5 flex items-center gap-4 sm:hidden">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(-1);
            }}
            aria-label="Foto anterior"
            className="glass-dark flex h-12 w-12 items-center justify-center rounded-full text-2xl leading-none text-white"
          >
            &#8249;
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              go(1);
            }}
            aria-label="Próxima foto"
            className="glass-dark flex h-12 w-12 items-center justify-center rounded-full text-2xl leading-none text-white"
          >
            &#8250;
          </button>
        </div>
      )}
    </div>
  );
}
