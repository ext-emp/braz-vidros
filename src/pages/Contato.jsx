import PageHeader from "../components/PageHeader.jsx";
import { waLink, INSTAGRAM, WHATSAPP, ABOUT, PAGE_META } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

const phonePretty = `(${WHATSAPP.slice(2, 4)}) ${WHATSAPP.slice(4, 9)}-${WHATSAPP.slice(9)}`;

export default function Contato() {
  usePageMeta(PAGE_META.contato);
  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Manda a medida, a gente manda o preço"
        text="Fotos do ambiente e medidas aproximadas já bastam para um primeiro orçamento. O atendimento é direto pelo WhatsApp."
      />

      <section className="container-site py-16 md:py-24">
        <div data-reveal-group className="grid gap-5 md:grid-cols-3">
          <a
            href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="sheen group block rounded-3xl bg-accent-soft p-7 transition-[filter] duration-300 hover:brightness-110"
          >
            <p className="text-xs font-bold tracking-widest text-ink/70 uppercase">WhatsApp</p>
            <p className="font-display mt-2 text-2xl font-semibold text-ink">{phonePretty}</p>
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
            className="glass sheen group block rounded-3xl p-7"
          >
            <p className="text-xs font-bold tracking-widest text-steel uppercase">Instagram</p>
            <p className="font-display mt-2 text-2xl font-semibold text-ink">@braz_vidross</p>
            <p className="mt-4 text-sm font-bold text-accent">
              Ver projetos recentes{" "}
              <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </p>
          </a>

          <div data-reveal>
            <div className="glass h-full rounded-3xl p-7">
              <p className="text-xs font-bold tracking-widest text-steel uppercase">Atendimento</p>
              <p className="font-display mt-2 text-2xl font-semibold text-ink">
                Novo Hamburgo <span className="text-accent">e região</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Seg. a sáb., orçamento sem compromisso
              </p>
            </div>
          </div>
        </div>

        <div data-reveal className="glass mt-10 rounded-3xl p-7">
          <p className="text-xs font-bold tracking-wide text-ink uppercase">Região de atendimento</p>
          <p className="mt-2 text-sm leading-relaxed text-steel">{ABOUT.region}</p>
        </div>
      </section>
    </>
  );
}
