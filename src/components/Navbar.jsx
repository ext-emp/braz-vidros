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

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
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
          Braz<span className={scrolled ? "text-accent" : "text-accent-soft"}>Vidros</span>
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
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            aria-expanded={open}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full lg:hidden ${
              scrolled ? "glass" : "glass-dark"
            }`}
          >
            <span
              className={`h-0.5 w-5 rounded transition-all duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              } ${open ? "translate-y-1 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded transition-all duration-300 ${
                scrolled ? "bg-ink" : "bg-white"
              } ${open ? "-translate-y-1 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {/* Menu mobile */}
      {open && (
        <div className="container-site mt-2 lg:hidden">
          <ul className="glass flex flex-col gap-1 rounded-3xl p-4">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NavLink
                  to={l.href}
                  className={({ isActive }) =>
                    `block rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-accent"
                        : "text-ink hover:bg-white/60 hover:text-accent"
                    }`
                  }
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
