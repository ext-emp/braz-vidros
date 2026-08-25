import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, waLink } from "../data/content.js";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Enquanto o painel está aberto: Esc fecha e o fundo não rola
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
    };
  }, [open]);

  return (
    // Com o painel aberto o header sobe de camada para cobrir o botão
    // flutuante do WhatsApp, que também vive em z-50
    <header
      className={`fixed inset-x-0 top-0 transition-all duration-500 ${open ? "z-70" : "z-50"} ${
        scrolled ? "px-3 pt-3 md:px-5 md:pt-4" : "px-3 pt-5 md:px-5 md:pt-8"
      }`}
    >
      <nav
        className="container-site flex items-center justify-between rounded-full border-none bg-[#8cceee26] px-5 py-3 shadow-none backdrop-blur-lg transition-all duration-500 md:px-4"
        aria-label="Navegação principal"
      >
        <Link
          to="/"
          className={`font-display text-xl font-bold tracking-tight transition-colors duration-500 ${
            scrolled ? "text-ink" : "text-white"
          }`}
        >
          Braz
          <span className={scrolled ? "text-accent" : "text-accent-soft"}>
            Vidros
          </span>
        </Link>

        <ul className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <NavLink
                to={l.href}
                className={({ isActive }) =>
                  `text-sm font-semibold transition-colors duration-300 ${
                    scrolled
                      ? isActive
                        ? "text-accent"
                        : "text-steel hover:text-accent"
                      : isActive
                        ? "text-accent-soft"
                        : "text-white/85 hover:text-accent-soft"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a
            href={waLink("Olá! Vim pelo site da Braz Vidros.")}
            target="_blank"
            rel="noopener noreferrer"
            className="sheen hidden rounded-full bg-accent px-6 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-accent-soft hover:text-ink sm:inline-block"
          >
            Orçamento
          </a>
          {/* Três traços: o do meio some e os de fora viram X ao abrir */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1 rounded-full lg:hidden ${
              scrolled ? "glass" : "glass-dark"
            }`}
          >
            <span
              className={`h-0.5 w-5 rounded transition-all duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              } ${open ? "translate-y-1.5 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded transition-all duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              } ${open ? "scale-x-0 opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded transition-all duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              } ${open ? "-translate-y-1.5 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Painel lateral: entra deslizando da direita, não é dropdown.
          Fica sempre montado para a saída também ser animada */}
      <div
        onClick={() => setOpen(false)}
        aria-hidden="true"
        className={`fixed inset-0 bg-ink/70 backdrop-blur-sm transition-opacity duration-500 lg:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />
      <aside
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed top-0 right-0 flex h-dvh w-[min(20rem,85vw)] flex-col bg-ink px-6 py-6 shadow-2xl transition-transform duration-500 ease-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between">
          <Link
            to="/"
            tabIndex={open ? 0 : -1}
            className="font-display text-xl font-bold tracking-tight text-white"
          >
            Braz<span className="text-accent-soft">Vidros</span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Fechar menu"
            className="glass-dark flex h-10 w-10 items-center justify-center rounded-full text-xl leading-none text-white transition-transform duration-300 hover:scale-110"
          >
            &times;
          </button>
        </div>

        <ul className="mt-8 flex-1 overflow-y-auto">
          {NAV_LINKS.map((l) => (
            <li key={l.href} className="border-b border-white/10">
              <NavLink
                to={l.href}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `font-display block py-4 text-2xl font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-accent-soft"
                      : "text-white hover:text-accent-soft"
                  }`
                }
              >
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <a
          href={waLink("Olá! Vim pelo site da Braz Vidros.")}
          target="_blank"
          rel="noopener noreferrer"
          tabIndex={open ? 0 : -1}
          className="sheen mt-6 block rounded-full bg-accent-soft px-8 py-4 text-center text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
        >
          Solicitar orçamento
        </a>
      </aside>
    </header>
  );
}
