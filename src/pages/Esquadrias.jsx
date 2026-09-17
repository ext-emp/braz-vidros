import PageHeader from "../components/PageHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import ProcessSteps from "../components/ProcessSteps.jsx";
import CTABand from "../components/CTABand.jsx";
import SectionHeading from "../components/SectionHeading.jsx";
import { SERVICES_ALUMINUM, PORTFOLIO, INSTAGRAM, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Esquadrias() {
  usePageMeta(PAGE_META.esquadrias);
  // Todas as fotos de alumínio: esta é a galeria da especialidade, não uma
  // prévia, desde que a página geral de projetos saiu do ar
  const projects = PORTFOLIO.filter((p) => p.spec === "aluminio");

  return (
    <>
      <PageHeader
        eyebrow="Esquadrias de Alumínio"
        title="Alumínio com precisão de milímetro"
        text="Janelas, portas e fechamentos fabricados na medida exata da sua obra, com perfis de qualidade, vedação correta e acabamento que dura."
      />

      {/* Serviços, fotos e processo, nesta ordem */}
      <section className="bg-mist/60 py-16 md:py-24">
        <div className="container-site">
          <SectionHeading
            eyebrow="Serviços"
            title="O que fazemos em alumínio"
            align="center"
            className="mb-10"
          />
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES_ALUMINUM.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </section>

      {projects.length > 0 && (
        <section className="container-site py-16 md:py-24">
          <SectionHeading
            eyebrow="Projetos em alumínio"
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

      <CTABand message="Olá! Quero um orçamento de esquadrias de alumínio." />
    </>
  );
}
