import { Link } from "react-router-dom";
import { NAV_LINKS, INSTAGRAM, ABOUT, WHATSAPP, waLink } from "../data/content.js";

const phonePretty = `(${WHATSAPP.slice(2, 4)}) ${WHATSAPP.slice(4, 9)}-${WHATSAPP.slice(9)}`;

const FOOTER_SERVICES = [
  { label: "Box de banheiro", to: "/vidracaria" },
  { label: "Espelhos sob medida", to: "/vidracaria" },
  { label: "Sacadas de vidro", to: "/vidracaria" },
  { label: "Guarda-corpo", to: "/vidracaria" },
  { label: "Janelas de alumínio", to: "/esquadrias" },
  { label: "Portas e fechamentos", to: "/esquadrias" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      {/* Vida ambiente: brilho azul difuso, mesmo padrão das faixas escuras */}
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full opacity-15"
        style={{ background: "radial-gradient(circle, #8cceee 0%, transparent 70%)" }}
      />

      <div className="container-site relative py-14 md:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
          {/* Marca */}
          <div>
            <p className="font-display text-2xl font-bold text-white">
              Braz<span className="text-accent-soft">Vidros</span>
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
              Vidraçaria e esquadrias de alumínio sob medida — medição,
              fabricação e instalação com a mesma equipe, em Novo Hamburgo e
              região.
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href={waLink("Olá! Vim pelo site da Braz Vidros.")}
                target="_blank"
                rel="noopener noreferrer"
                className="sheen rounded-full bg-accent-soft px-6 py-3 text-sm font-bold text-ink transition-[filter] duration-300 hover:brightness-110"
              >
                Pedir orçamento
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram da Braz Vidros"
                className="glass-dark flex h-11 w-11 items-center justify-center rounded-full transition-[filter] duration-300 hover:brightness-150"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
                  <path d="M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.62 2.2 15.24 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2m0-2.2C8.74 0 8.33 0 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67 0 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84m0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4m7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44" />
                </svg>
              </a>
            </div>
          </div>

          {/* Páginas */}
          <nav aria-label="Mapa do site">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Páginas</p>
            <ul className="mt-4 space-y-2.5">
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

          {/* Serviços */}
          <nav aria-label="Serviços">
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Serviços</p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER_SERVICES.map((s) => (
                <li key={s.label}>
                  <Link
                    to={s.to}
                    className="text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contato */}
          <div>
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase">Contato</p>
            <ul className="mt-4 space-y-2.5 text-sm text-white/75">
              <li>
                <a
                  href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-accent-soft hover:underline"
                >
                  WhatsApp {phonePretty}
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-accent-soft">
                  @braz_vidross
                </a>
              </li>
              <li className="pt-2 leading-relaxed text-white/60">{ABOUT.region}</li>
              <li className="text-white/60">Seg. a sáb. — orçamento sem compromisso</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Barra inferior: direitos + crédito de desenvolvimento */}
      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-start justify-between gap-2 py-5 sm:flex-row sm:items-center">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Braz Vidros. Todos os direitos reservados.
          </p>
          <a
            href="https://www.instagram.com/extechsolucoes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 transition-colors duration-300 hover:text-accent-soft"
          >
            Desenvolvido por <span className="font-semibold">ExTech Soluções</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
