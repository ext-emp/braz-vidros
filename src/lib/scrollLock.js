import { ScrollSmoother } from "gsap/ScrollSmoother";

/*
  Trava o scroll do fundo enquanto um painel está aberto (menu, galeria).
  Só esconder o overflow do body não basta: o ScrollSmoother continuaria
  interpolando o conteúdo até a última posição lida. Devolve a função que solta.
*/
export function lockScroll() {
  const smoother = ScrollSmoother.get();
  smoother?.paused(true);

  const { overflow } = document.body.style;
  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = overflow;
    smoother?.paused(false);
  };
}
