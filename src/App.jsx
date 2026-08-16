import { useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";

import Home from "./pages/Home.jsx";
import Vidracaria from "./pages/Vidracaria.jsx";
import Esquadrias from "./pages/Esquadrias.jsx";
import Projetos from "./pages/Projetos.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const rootRef = useRef(null);
  const { pathname } = useLocation();

  // Cada troca de rota volta ao topo
  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div ref={rootRef}>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vidracaria" element={<Vidracaria />} />
          <Route path="/esquadrias" element={<Esquadrias />} />
          <Route path="/projetos" element={<Projetos />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/contato" element={<Contato />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFloat />
    </div>
  );
}
