import { Link } from "react-router-dom";
import { NAV_LINKS, INSTAGRAM, ABOUT } from "../data/content.js";

export default function Footer() {
  return (
    <footer className="bg-ink">
      <div className="container-site py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-xl font-bold text-white">
              Braz<span className="text-accent-soft">Vidros</span>
            </p>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/60">
              Vidraçaria e esquadrias de alumínio sob medida — medição,
              fabricação e instalação com a mesma equipe.
            </p>
          </div>
          <nav aria-label="Mapa do site">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Páginas</p>
            <ul className="mt-3 space-y-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    to={l.href}
                    className="text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Atendimento</p>
            <p className="mt-3 text-sm leading-relaxed text-white/75">{ABOUT.region}</p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm font-bold text-accent-soft hover:underline"
            >
              @braz_vidross →
            </a>
          </div>
        </div>
        <div className="mt-12 border-t border-white/10 pt-6">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Braz Vidros — Vidraçaria e Esquadrias de Alumínio ·
            Novo Hamburgo/RS
          </p>
        </div>
      </div>
    </footer>
  );
}
