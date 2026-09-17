import Hero from "../components/Hero.jsx";
import DualFocus from "../components/DualFocus.jsx";
import DifferentialsBand from "../components/DifferentialsBand.jsx";
import ProjectShowcase from "../components/ProjectShowcase.jsx";
import AboutBand from "../components/AboutBand.jsx";
import CTABand from "../components/CTABand.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Home() {
  usePageMeta(PAGE_META.home);
  return (
    <>
      <Hero />
      <DualFocus />

      <DifferentialsBand />

      {/* Galeria das oito obras em destaque. O id é o destino do botão
          "Ver projetos" do hero; a lista completa de cada especialidade
          vive nas páginas da vidraçaria e das esquadrias */}
      <section id="projetos" className="container-site py-16 md:py-24">
        <div className="text-center">
          <SectionHeading
            eyebrow="Projetos"
            title="Veja nossos projetos"
            align="center"
          />
          <ProjectShowcase />
        </div>
      </section>

      {/* Quem é a empresa, depois da prova e antes da chamada final */}
      <AboutBand />

      <CTABand />
    </>
  );
}
