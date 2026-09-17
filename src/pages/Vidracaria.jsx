import PageHeader from "../components/PageHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import ProcessSteps from "../components/ProcessSteps.jsx";
import CTABand from "../components/CTABand.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { SERVICES_GLASS, PORTFOLIO, INSTAGRAM, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Vidracaria() {
  usePageMeta(PAGE_META.vidracaria);
  // Todas as fotos de vidraçaria: esta é a galeria da especialidade, não uma
  // prévia, desde que a página geral de projetos saiu do ar
  const projects = PORTFOLIO.filter((p) => p.spec === "vidro");

  return (
    <>
      <PageHeader
        eyebrow="Vidraçaria"
        title="Vidro sob medida, do box à fachada"
        text="Vidro temperado de procedência, cortado na medida exata do seu ambiente e instalado pela mesma equipe que fez o orçamento."
      />

      {/* Serviços, fotos e processo, nesta ordem */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Serviços"
            title="O que fazemos em vidro"
            align="center"
            className="mb-10"
          />
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_GLASS.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="container-site py-16 md:py-24">
          <SectionHeading
            eyebrow="Projetos em vidro"
            title="Trabalhos instalados"
            align="center"
            className="mb-10"
          />
          <ProjectGrid items={projects} columns="sm:grid-cols-2 lg:grid-cols-3" />
          <div data-reveal className="mt-8 text-center">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              Mais no Instagram
            </a>
          </div>
        </section>
      )}

      <ProcessSteps />

      <CTABand message="Olá! Quero um orçamento de vidraçaria." />
    </>
  );
}
