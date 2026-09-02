import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROCESS } from "../data/content.js";

/*
  Bloco "Como funciona", igual em Vidraçaria e Esquadrias.

  Linha do tempo em dois formatos, mesma marcação:
  - Celular: trilho de pé, uma linha contínua descendo pela esquerda com os
    pontos alinhados nela. As linhas dos itens se encostam (sem gap na
    vertical, o respiro é o padding de baixo), então o traço corre inteiro.
  - sm em diante: o trilho deita, vira a borda de cima de cada coluna e o
    ponto abre cada passo.

  A animação é própria, não a do pass global de [data-reveal]: aqui a ordem
  importa (trilho, ponto, texto) e os itens não podem entrar todos juntos.
  Por isso o gsap.matchMedia: deitado o traço corre no eixo X, de pé no Y.
*/
export default function ProcessSteps() {
  const rootRef = useRef(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      const q = gsap.utils.selector(rootRef);
      const mm = gsap.matchMedia();

      mm.add({ deitado: "(min-width: 640px)", empe: "(max-width: 639px)" }, (ctx) => {
        const { deitado } = ctx.conditions;

        const tl = gsap.timeline({
          scrollTrigger: { trigger: rootRef.current, start: "top 78%", once: true },
        });

        // Stagger curto: a leitura acompanha o trilho sem virar espera
        tl.from(q("[data-rail]"), {
          ...(deitado
            ? { scaleX: 0, transformOrigin: "left center" }
            : { scaleY: 0, transformOrigin: "center top" }),
          duration: 0.5,
          ease: "power2.out",
          stagger: 0.14,
        })
          .from(
            q("[data-dot]"),
            { scale: 0, opacity: 0, duration: 0.3, ease: "back.out(2)", stagger: 0.14 },
            0.12
          )
          .from(
            q("[data-step]"),
            { y: 16, opacity: 0, duration: 0.5, ease: "power3.out", stagger: 0.14 },
            0.2
          );
      });
    },
    { scope: rootRef }
  );

  return (
    <section ref={rootRef} className="bg-mist/60 py-16 md:py-24">
      <div className="container-site">
        <div data-reveal className="mb-12 text-center md:mb-16">
          <p className="eyebrow mb-3">Como funciona</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Do primeiro contato à entrega
          </h2>
        </div>

        <ol className="grid sm:grid-cols-2 sm:gap-y-9 lg:grid-cols-4 lg:gap-y-0">
          {PROCESS.map((p, i) => (
            <li
              key={p.title}
              className="relative pb-8 pl-8 sm:pt-8 sm:pr-6 sm:pb-0 sm:pl-0 md:pr-8"
            >
              {/* De pé no celular (left-1.25 = centro do ponto), deitado em sm */}
              <span
                data-rail
                aria-hidden="true"
                className="bg-accent/25 absolute top-2 bottom-0 left-1.25 w-px sm:inset-x-0 sm:top-0 sm:bottom-auto sm:h-px sm:w-auto"
              />
              <span
                data-dot
                aria-hidden="true"
                className="bg-accent absolute top-0.75 left-0 z-10 h-2.5 w-2.5 rounded-full sm:-top-1.25"
              />

              {/* Ponto de chegada: fecha o trilho no fim da lista */}
              {i === PROCESS.length - 1 && (
                <>
                  <span
                    data-dot
                    aria-hidden="true"
                    className="bg-accent absolute bottom-0 left-0 z-10 h-2.5 w-2.5 rounded-full sm:hidden"
                  />
                  <span
                    data-dot
                    aria-hidden="true"
                    className="bg-accent absolute -top-1.25 right-0 z-10 hidden h-2.5 w-2.5 rounded-full lg:block"
                  />
                </>
              )}

              <div data-step>
                <p className="text-accent text-xs font-bold tracking-[0.16em] uppercase">
                  Passo {i + 1}
                </p>
                <h3 className="font-display mt-2 mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-steel">{p.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
