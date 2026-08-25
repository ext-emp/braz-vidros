import PageHeader from "../components/PageHeader.jsx";
import ServiceCard from "../components/ServiceCard.jsx";
import ProjectGrid from "../components/ProjectGrid.jsx";
import ProcessSteps from "../components/ProcessSteps.jsx";
import CTABand from "../components/CTABand.jsx";
import { SERVICES_GLASS, PORTFOLIO, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

const GLASS_CATEGORIES = ["Box", "Espelhos", "Sacadas", "Guarda-corpo", "Policarbonato"];

export default function Vidracaria() {
  usePageMeta(PAGE_META.vidracaria);
  const projects = PORTFOLIO.filter((p) => GLASS_CATEGORIES.includes(p.category)).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow="Vidraçaria"
        title="Vidro sob medida, do box à fachada"
        text="Vidro temperado e laminado de procedência, cortado na medida exata do seu ambiente e instalado pela mesma equipe que fez o orçamento."
      />

      <section className="container-site py-16 md:py-24">
        <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES_GLASS.map((s) => (
            <ServiceCard key={s.title} {...s} />
          ))}
        </div>
      </section>

      <ProcessSteps />

      {projects.length > 0 && (
        <section className="container-site py-16 md:py-24">
          <div data-reveal className="mb-10 text-center">
            <p className="eyebrow mb-3">Projetos em vidro</p>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">
              Instalações recentes
            </h2>
          </div>
          <ProjectGrid items={projects} />
        </section>
      )}

      <CTABand message="Olá! Quero um orçamento de vidraçaria." />
    </>
  );
}
