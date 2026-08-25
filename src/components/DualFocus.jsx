import { Link } from "react-router-dom";
import { FOCUS } from "../data/content.js";

/* Os dois focos do negócio, com o mesmo peso visual: nenhum engole o outro */
export default function DualFocus() {
  return (
    <section className="container-site pt-20 pb-10 md:pt-28 md:pb-14">
      <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
        <div data-reveal>
          <p className="eyebrow mb-3">O que fazemos</p>
          <h2 className="font-display text-4xl font-semibold md:text-5xl">
            Duas especialidades, <br className="hidden md:block" />
            um só padrão de acabamento
          </h2>
        </div>
        <p data-reveal className="mx-auto mt-5 max-w-md text-steel">
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
            {/* Escurecimento uniforme, mesma dose do hero */}
            <div className="absolute inset-0 bg-ink/50" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(15deg, rgb(12 22 34 / 0.72) 0%, rgb(12 22 34 / 0.3) 55%, rgb(12 22 34 / 0.1) 80%)",
              }}
            />
            <div className="glass-dark absolute inset-x-4 bottom-4 rounded-3xl p-6 transition-transform duration-500 ease-out group-hover:-translate-y-1 md:inset-x-6 md:bottom-6 md:p-8">
              <h3 className="font-display mb-3 text-2xl font-semibold text-white md:text-3xl">
                {f.title}
              </h3>
              <p className="mb-4 text-sm leading-relaxed text-white/80">{f.text}</p>
              <span className="text-sm font-bold text-accent-soft">Ver serviços</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
