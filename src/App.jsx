import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import DualFocus from "./components/DualFocus.jsx";
import Services from "./components/Services.jsx";
import Portfolio from "./components/Portfolio.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const rootRef = useRef(null);

  // Motion pass: reveals de scroll — assinatura única (subida curta + fade, power3.out)
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

      // Grupos: filhos [data-reveal] entram em cascata (orçamento de stagger < 400ms)
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
    { scope: rootRef }
  );

  return (
    <div ref={rootRef}>
      <Navbar />
      <main>
        <Hero />
        <DualFocus />
        <Services />
        <Portfolio />
        <About />
        <Contact />
      </main>
      <WhatsAppFloat />
    </div>
  );
}
