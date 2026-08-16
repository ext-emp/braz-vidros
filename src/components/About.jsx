import { ABOUT } from "../data/content.js";

export default function About() {
  return (
    <section id="sobre" className="bg-mist/60 scroll-mt-24 py-20 md:py-28">
      <div className="container-site grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
        <div data-reveal className="relative">
          <img
            src={ABOUT.image}
            alt="Equipe da Braz Vidros em instalação"
            loading="lazy"
            className="w-full rounded-[1.75rem] object-cover"
          />
          <div className="glass absolute -right-3 -bottom-5 hidden max-w-[15rem] rounded-3xl p-5 md:block">
            <p className="font-display text-3xl font-bold text-accent">NH/RS</p>
            <p className="mt-1 text-xs leading-relaxed text-steel">
              Atendimento em Novo Hamburgo e região
            </p>
          </div>
        </div>

        <div>
          <p data-reveal className="eyebrow mb-3">
            {ABOUT.eyebrow}
          </p>
          <h2 data-reveal className="font-display mb-6 text-4xl font-semibold md:text-5xl">
            {ABOUT.title}
          </h2>
          {ABOUT.text.map((t, i) => (
            <p key={i} data-reveal className="mb-4 max-w-prose leading-relaxed text-steel">
              {t}
            </p>
          ))}
          <div data-reveal className="glass mt-6 rounded-2xl px-5 py-4">
            <p className="text-xs font-bold tracking-wide text-ink uppercase">
              Região de atendimento
            </p>
            <p className="mt-1 text-sm text-steel">{ABOUT.region}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
