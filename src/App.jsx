import { useLayoutEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { useGSAP } from "@gsap/react";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import WhatsAppFloat from "./components/WhatsAppFloat.jsx";
import CookieConsent from "./components/CookieConsent.jsx";

import Home from "./pages/Home.jsx";
import Vidracaria from "./pages/Vidracaria.jsx";
import Esquadrias from "./pages/Esquadrias.jsx";
import Sobre from "./pages/Sobre.jsx";
import Contato from "./pages/Contato.jsx";
import Privacidade from "./pages/Privacidade.jsx";
import Cookies from "./pages/Cookies.jsx";
import NaoEncontrada from "./pages/NaoEncontrada.jsx";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function App() {
  const rootRef = useRef(null);
  // `key` muda a cada navegação, `pathname` só quando o destino é outro: o
  // topo vale para as duas coisas, inclusive clicar na logo já estando na home
  const { pathname, key } = useLocation();

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

  /*
    Cada troca de rota abre a página nova no topo.

    Um `scrollTo(0)` sozinho não segurava no celular: para remedir, o
    ScrollTrigger guarda a posição do scroller, zera, mede e devolve o que
    guardou, e essa devolução chegava depois do nosso salto, jogando a rota
    nova de volta para a altura em que a anterior tinha ficado. No desktop o
    problema não aparecia porque quem escreve a posição a cada frame é o
    ScrollSmoother, e o alvo dele já era o topo.

    Daí a ordem: esquecer a posição guardada (clearScrollMemory), remedir e
    reafirmar o topo, inclusive no frame seguinte, que é quando cai uma
    remedição adiada.

    Em layout effect, antes da pintura: assim a página nova nunca chega a
    aparecer na altura da anterior, e os reveals da rota, que são registrados
    logo depois, já medem com a tela no topo.
  */
  useLayoutEffect(() => {
    const irAoTopo = () => {
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(0, false);
      else window.scrollTo(0, 0);
    };

    irAoTopo();
    // "manual" também tira do navegador a restauração no voltar/avançar, que
    // chega fora de hora e desfaz o salto
    ScrollTrigger.clearScrollMemory("manual");
    ScrollTrigger.refresh();
    irAoTopo();

    const id = requestAnimationFrame(irAoTopo);
    return () => cancelAnimationFrame(id);
  }, [key]);

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
              <Route path="/privacidade" element={<Privacidade />} />
              <Route path="/cookies" element={<Cookies />} />
              {/* Endereço que não existe cai na página de erro, não na home:
                  home no lugar de 404 devolve 200 com conteúdo certo para um
                  endereço errado, e o buscador trata isso como duplicata */}
              <Route path="*" element={<NaoEncontrada />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </div>
      <WhatsAppFloat />
      <CookieConsent />
    </div>
  );
}
