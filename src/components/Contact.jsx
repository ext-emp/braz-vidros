import { waLink, INSTAGRAM, WHATSAPP } from "../data/content.js";

const phonePretty = `(${WHATSAPP.slice(2, 4)}) ${WHATSAPP.slice(4, 9)}-${WHATSAPP.slice(9)}`;

export default function Contact() {
  return (
    <section id="contato" className="scroll-mt-24 p-3 md:p-5">
      <div className="relative overflow-hidden rounded-[1.75rem] bg-ink py-20 md:py-28">
        {/* Vida ambiente: brilho accent difuso no fundo */}
        <div
          className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #8cceee 0%, transparent 70%)" }}
        />
        <div className="container-site relative">
          <div className="max-w-2xl">
            <p data-reveal className="eyebrow mb-3 text-accent-soft">
              Contato
            </p>
            <h2 data-reveal className="font-display text-4xl font-semibold text-white md:text-6xl">
              Manda a medida, <br />a gente manda o preço
            </h2>
            <p data-reveal className="mt-5 max-w-lg leading-relaxed text-white/70">
              Fotos do ambiente e medidas aproximadas já bastam para um primeiro
              orçamento. O atendimento é direto pelo WhatsApp.
            </p>
          </div>

          <div data-reveal-group className="mt-12 grid gap-5 md:grid-cols-3">
            <a
              href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="sheen group block rounded-3xl bg-accent-soft p-7 transition-[filter] duration-300 hover:brightness-110"
            >
              <p className="text-xs font-bold tracking-widest text-ink/70 uppercase">
                WhatsApp
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-ink">
                {phonePretty}
              </p>
              <p className="mt-4 text-sm font-bold text-ink">
                Chamar agora{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>

            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              className="glass-dark group block rounded-3xl p-7 transition-[filter] duration-300 hover:brightness-125"
            >
              <p className="text-xs font-bold tracking-widest text-white/60 uppercase">
                Instagram
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-white">
                @braz_vidross
              </p>
              <p className="mt-4 text-sm font-bold text-accent-soft">
                Ver projetos recentes{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </p>
            </a>

            <div data-reveal className="glass-dark rounded-3xl p-7">
              <p className="text-xs font-bold tracking-widest text-white/60 uppercase">
                Atendimento
              </p>
              <p className="font-display mt-2 text-2xl font-semibold text-white">
                Novo Hamburgo <span className="text-accent-soft">e região</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-white/70">
                Seg. a sáb., orçamento sem compromisso
              </p>
            </div>
          </div>

          <div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row sm:items-center">
            <p className="font-display text-lg font-bold text-white">
              Braz<span className="text-accent-soft">Vidros</span>
            </p>
            <p className="text-xs text-white/50">
              © {new Date().getFullYear()} Braz Vidros — Vidraçaria e Esquadrias de
              Alumínio · Novo Hamburgo/RS
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
