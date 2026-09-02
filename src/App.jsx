import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";

import Home from "./pages/Home.jsx";
import Vidracaria from "./pages/Vidracaria.jsx";
import Esquadrias from "./pages/Esquadrias.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const rootRef = useRef(null);
  const { pathname } = useLocation();

  /*
    Scroll suave do GSAP: a rolagem nativa continua sendo a fonte da posição,
    o ScrollSmoother só interpola o transform do #smooth-content atrás dela.
    Criado uma vez, fora do ciclo de rotas.
    Só no desktop: aparelho de toque já tem inércia própria, e lá o scroll
    nativo também é quem esconde a barra de endereço do navegador.
  */
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (ScrollTrigger.isTouch === 1) return;
    // Guarda contra a montagem dupla do StrictMode no dev
    if (ScrollSmoother.get()) return;
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.1,
      effects: true,
    });
  }, []);

  // Cada troca de rota volta ao topo. Com o smoother ativo quem manda na
  // posição é ele; e o refresh remede a página nova antes dos reveals
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) smoother.scrollTo(0, false);
    else window.scrollTo(0, 0);
    ScrollTrigger.refresh();
  }, [pathname]);

  // Motion pass: reveals de scroll, assinatura única (subida curta + fade, power3.out).
  // Depende de pathname: re-registra os triggers a cada página.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // clearProps ao final: libera o transform inline do GSAP para os
      // hovers CSS (translate/scale) dos cards voltarem a funcionar
      gsap.utils.toArray("[data-reveal-group]").forEach((group) => {
        const items = group.querySelectorAll("[data-reveal]");
        gsap.fromTo(
          items,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.09,
            clearProps: "transform",
            scrollTrigger: { trigger: group, start: "top 82%", once: true },
          }
        );
      });

      // Elementos soltos
      gsap.utils.toArray("[data-reveal]").forEach((el) => {
        if (el.closest("[data-reveal-group]")) return;
        gsap.fromTo(
          el,
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            clearProps: "transform",
            scrollTrigger: { trigger: el, start: "top 85%", once: true },
          }
        );
      });
    },
    { scope: rootRef, dependencies: [pathname] }
  );

  return (
    // Navbar e botão do WhatsApp ficam fora do #smooth-wrapper: o smoother
    // aplica transform no conteúdo, e position:fixed lá dentro passaria a
    // se posicionar pelo conteúdo, não pela tela
    <div ref={rootRef}>
      <Navbar />
      <div id="smooth-wrapper">
        <div id="smooth-content">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vidracaria" element={<Vidracaria />} />
              <Route path="/esquadrias" element={<Esquadrias />} />
              <Route path="/sobre" element={<Sobre />} />
              <Route path="/contato" element={<Contato />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <WhatsAppFloat />
    </div>
  );
}
