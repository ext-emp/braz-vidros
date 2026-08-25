import { waLink } from "../data/content.js";

/* Chamada final de orçamento usada no fim das páginas internas */
export default function CTABand({ message = "Olá! Quero um orçamento com a Braz Vidros." }) {
  return (
    <section className="container-site py-16 md:py-24">
      <div data-reveal className="relative overflow-hidden rounded-[1.75rem] bg-ink p-10 md:p-14">
        <div
          className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #8cceee 0%, transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            Manda a medida, <br className="md:hidden" />a gente manda o preço
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Fotos do ambiente e medidas aproximadas já bastam para um primeiro
            orçamento, sem compromisso.
          </p>
          <a
            href={waLink(message)}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen mt-8 inline-block rounded-full bg-accent-soft px-9 py-4 text-sm font-bold text-ink transition-[filter] duration-300 hover:brightness-110"
          >
            Chamar no WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
