import { Link } from "react-router-dom";
import { FOCUS } from "../data/content.js";

/* Os dois focos do negócio, com o mesmo peso visual: nenhum engole o outro */
export default function DualFocus() {
  return (
    <section className="container-site py-20 md:py-28">
      <div className="mb-12 grid gap-6 md:mb-16 md:grid-cols-[1.2fr_1fr] md:items-end">
        <div data-reveal>
          <p className="eyebrow mb-3">O que fazemos</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Duas especialidades, <br className="hidden md:block" />
            um só padrão de acabamento
          </h2>
        </div>
        <p data-reveal className="max-w-md text-steel md:justify-self-end">
          Vidro e alumínio andam juntos em quase toda obra. Aqui você resolve os
          dois com a mesma equipe: medição, fabricação e instalação.
        </p>
      </div>

      <div data-reveal-group className="grid gap-6 md:grid-cols-2">
        {FOCUS.map((f) => (
          <Link
            key={f.id}
            to={f.link}
            data-reveal
            className="group relative block overflow-hidden rounded-[1.75rem]"
          >
            <img
              src={f.image}
              alt={f.title}
              loading="lazy"
              className="h-[26rem] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05] md:h-[30rem]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(15deg, rgb(12 22 34 / 0.72) 0%, rgb(12 22 34 / 0.18) 55%, transparent 80%)",
              }}
            />
            <div className="glass-dark absolute inset-x-4 bottom-4 rounded-3xl p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 md:inset-x-6 md:bottom-6 md:p-8">
              <p className="eyebrow mb-2 text-accent-soft">{f.eyebrow}</p>
              <h3 className="font-display mb-3 text-2xl font-semibold text-white md:text-3xl">
                {f.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/80">{f.text}</p>
              <span className="text-sm font-bold text-accent-soft">
                Ver serviços{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
