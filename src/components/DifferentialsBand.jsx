import { useEffect, useRef, useState } from "react";
import { DIFFERENTIALS } from "../data/content.js";

/*
  Faixa de diferenciais em azul do logo. Mesma lista na home e na página
  Sobre, só o par de títulos muda.

  Celular: os quatro pontos viram um slider que passa sozinho, um cartão de
  cada vez. Quem encostar na fita manda: o rodízio para por um minuto para a
  pessoa ler com calma, e ela pode arrastar para o lado quando quiser. Passado
  o minuto sem toque nenhum, ele volta a andar de onde estiver.

  sm em diante: duas colunas, com filete só entre elas, ou seja nos itens 2 e
  4. As classes saem por índice para não ter `border-l` e `border-l-0`
  disputando o mesmo breakpoint.
*/
const FILETE = "border-white/20 sm:border-l sm:pl-6 md:pl-8";
const FILETES = ["", FILETE, "", FILETE];

const INTERVALO = 4500; // tempo de cada cartão na tela
const PAUSA = 60000; // um minuto parado depois que a pessoa interage

export default function DifferentialsBand({
  eyebrow = "Por que a Braz Vidros",
  title = "Do orçamento à instalação",
}) {
  const fitaRef = useRef(null);
  const [ativo, setAtivo] = useState(0);

  useEffect(() => {
    const fita = fitaRef.current;
    if (!fita) return;

    const celular = window.matchMedia("(max-width: 639px)");
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

    let timer = null;
    let raf = 0;
    let pausaAte = 0;
    let visivel = true;

    // Distância entre dois cartões (largura + gap), medida do próprio DOM:
    // assim ela acompanha qualquer mudança de largura de tela
    const passo = () => {
      const [a, b] = fita.children;
      return b ? b.offsetLeft - a.offsetLeft : fita.clientWidth;
    };

    const proximo = () => {
      if (!visivel || Date.now() < pausaAte) return;
      // A folga de 4px cobre o arredondamento do scroll em telas com zoom
      const fim = fita.scrollWidth - fita.clientWidth - 4;
      const alvo = fita.scrollLeft >= fim ? 0 : fita.scrollLeft + passo();
      fita.scrollTo({ left: alvo, behavior: "smooth" });
    };

    const adiar = () => {
      pausaAte = Date.now() + PAUSA;
    };

    // Marcador de posição: lido do scroll, então vale tanto para o rodízio
    // quanto para o arraste da pessoa
    const aoRolar = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setAtivo(Math.round(fita.scrollLeft / passo()));
      });
    };

    const sincronizar = () => {
      clearInterval(timer);
      timer = null;
      if (celular.matches && !semMovimento.matches) {
        timer = setInterval(proximo, INTERVALO);
      } else if (!celular.matches) {
        // Voltando para a grade, a fita não pode ficar rolada pela metade
        fita.scrollLeft = 0;
        setAtivo(0);
      }
    };

    // Fora da tela o rodízio não anda: ninguém está lendo, e ele voltaria
    // do fim já rodado quando a pessoa chegasse na seção
    const observer = new IntersectionObserver(
      ([entrada]) => {
        visivel = entrada.isIntersecting;
      },
      { threshold: 0.2 }
    );
    observer.observe(fita);

    fita.addEventListener("scroll", aoRolar, { passive: true });
    fita.addEventListener("pointerdown", adiar, { passive: true });
    fita.addEventListener("touchstart", adiar, { passive: true });
    fita.addEventListener("wheel", adiar, { passive: true });
    celular.addEventListener("change", sincronizar);
    sincronizar();

    return () => {
      clearInterval(timer);
      cancelAnimationFrame(raf);
      observer.disconnect();
      fita.removeEventListener("scroll", aoRolar);
      fita.removeEventListener("pointerdown", adiar);
      fita.removeEventListener("touchstart", adiar);
      fita.removeEventListener("wheel", adiar);
      celular.removeEventListener("change", sincronizar);
    };
  }, []);

  return (
    <section className="container-site py-16 md:py-24">
      <div
        data-reveal-group
        className="grid gap-8 rounded-[1.75rem] bg-accent p-7 sm:p-9 md:gap-10 md:p-10 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:gap-14"
      >
        <div data-reveal>
          <p className="eyebrow mb-3 text-accent-soft">{eyebrow}</p>
          {/* Corpo pelo vw no celular: o título da home cabe em uma linha */}
          <h2 className="font-display text-[clamp(1.35rem,5.4vw,2.25rem)] leading-tight font-semibold text-white">
            {title}
          </h2>
        </div>

        {/* min-w-0: item de grid nasce com min-width auto, e aí a largura
            mínima da fita (a soma dos quatro cartões) esticaria a faixa para
            fora da tela em vez de virar rolagem interna */}
        <div className="min-w-0">
          <ul
            ref={fitaRef}
            className="no-scrollbar -mx-7 flex snap-x snap-mandatory scroll-px-7 gap-7 overflow-x-auto px-7 pb-1 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-x-8 sm:gap-y-9 sm:overflow-visible sm:px-0 sm:pb-0 md:gap-x-5"
          >
            {DIFFERENTIALS.map((d, i) => (
              <li
                key={d.title}
                data-reveal
                className={`w-full shrink-0 snap-start sm:w-auto sm:shrink ${FILETES[i]}`}
              >
                <h3 className="font-display mb-2 text-base font-semibold text-white md:text-lg">
                  {d.title}
                </h3>
                <p className="text-sm leading-relaxed text-white/70">{d.text}</p>
              </li>
            ))}
          </ul>

          {/* Onde a fita está: só faz sentido enquanto ela é fita */}
          <div aria-hidden="true" className="mt-5 flex gap-1.5 sm:hidden">
            {DIFFERENTIALS.map((d, i) => (
              <span
                key={d.title}
                className={`h-0.75 flex-1 rounded-full transition-colors duration-300 ${
                  i === ativo ? "bg-accent-soft" : "bg-white/25"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
