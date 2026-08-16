import { SERVICES_GLASS, SERVICES_ALUMINUM, waLink } from "../data/content.js";

function ServiceCard({ title, text }) {
  // data-reveal fica no wrapper: o GSAP anima o transform do wrapper e a
  // transição CSS de hover do card não briga com ele
  return (
    <div data-reveal>
      <div className="glass sheen group h-full rounded-3xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5">
        <div className="mb-5 h-10 w-10 rounded-xl bg-accent/15 ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent/25" />
        <h3 className="font-display mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-steel">{text}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <section className="bg-mist/60 py-20 md:py-28">
      <div className="container-site">
        {/* Vidraçaria */}
        <div id="servicos-vidro" className="mb-14 scroll-mt-28">
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div data-reveal>
              <p className="eyebrow mb-3">Vidraçaria</p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Serviços em vidro
              </h2>
            </div>
            <a
              data-reveal
              href={waLink("Olá! Quero um orçamento de vidraçaria.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline md:justify-self-end"
            >
              Orçamento de vidro no WhatsApp →
            </a>
          </div>
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES_GLASS.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>

        {/* Esquadrias */}
        <div id="servicos-aluminio" className="scroll-mt-28">
          <div className="mb-10 grid gap-4 md:grid-cols-[1fr_auto] md:items-end">
            <div data-reveal>
              <p className="eyebrow mb-3">Esquadrias</p>
              <h2 className="font-display text-3xl font-semibold md:text-4xl">
                Serviços em alumínio
              </h2>
            </div>
            <a
              data-reveal
              href={waLink("Olá! Quero um orçamento de esquadrias de alumínio.")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline md:justify-self-end"
            >
              Orçamento de alumínio no WhatsApp →
            </a>
          </div>
          <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES_ALUMINUM.map((s) => (
              <ServiceCard key={s.title} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
