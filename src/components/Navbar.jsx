import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { NAV_LINKS, PHONE, PHONE_HREF, waLink } from "../data/content.js";
import { lockScroll } from "../lib/scrollLock.js";

/*
  Header em dois estados:
  - Topo: barra transparente sobre o hero, sem caixa nem fundo.
  - Depois do scroll: a barra do topo some e uma cápsula escura entra
    deslizando de cima, com telefone e botão de orçamento.
*/

// Ponto da troca de estado
const SCROLL_THRESHOLD = 90;

const WA_MESSAGE = "Olá! Vim pelo site da Braz Vidros.";

/* A arte da logo é escura, então o filtro a achata em branco. Serve aos dois
   estados: sobre o hero e dentro da cápsula, que também é escura */
function Logo({ className = "h-6", tabIndex }) {
  return (
    <Link
      to="/"
      tabIndex={tabIndex}
      aria-label="Braz Vidros, página inicial"
      className="shrink-0"
    >
      <img
        src="/logo-braz-vidros-2.png"
        alt="Braz Vidros"
        width={647}
        height={141}
        className={`${className} w-auto brightness-0 invert`}
      />
    </Link>
  );
}

/* Três traços: o do meio some e os de fora viram X ao abrir. Aparece nas duas
   barras, senão o botão de fechar some junto com a barra do topo */
function MenuButton({ open, onClick }) {
  const bar = "h-0.5 w-5 rounded bg-white transition-all duration-300";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={open ? "Fechar menu" : "Abrir menu"}
      aria-expanded={open}
      className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1 rounded-full bg-white/12 lg:hidden"
    >
      <span className={`${bar} ${open ? "translate-y-1.5 rotate-45" : ""}`} />
      <span className={`${bar} ${open ? "scale-x-0 opacity-0" : ""}`} />
      <span className={`${bar} ${open ? "-translate-y-1.5 -rotate-45" : ""}`} />
    </button>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    // Leitura do scroll agrupada num frame: o evento dispara muito mais do
    // que a tela redesenha
    let ticking = false;
    const update = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      setScrolled(y > SCROLL_THRESHOLD);
      ticking = false;
    };
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Enquanto o painel está aberto: Esc fecha e o fundo não rola
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const unlock = lockScroll();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [open]);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 ${
      isActive
        ? "font-semibold text-accent-soft"
        : "text-white/85 hover:text-white"
    }`;

  return (
    // Com o painel aberto o header sobe de camada para cobrir o botão
    // flutuante do WhatsApp, que também vive em z-50
    // A faixa do header é transparente e cobre o topo de todas as páginas;
    // sem pointer-events-none ela engoliria cliques do conteúdo por baixo.
    // Cada barra reativa o clique só onde de fato desenha algo
    <header
      className={`pointer-events-none fixed inset-x-0 top-0 ${open ? "z-70" : "z-50"}`}
      aria-label="Navegação principal"
    >
      {/* Estado topo: transparente sobre o hero */}
      <div
        /* Mesmo recuo lateral do .container-site: alinha a logo com o hero */
        className={`px-5 py-[26px] transition-opacity duration-300 md:px-24 ${
          scrolled
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <nav className="flex items-center justify-between gap-6">
          <Logo className="h-6 md:h-8" tabIndex={scrolled ? -1 : 0} />

          <div className="flex items-center gap-[clamp(1rem,2vw,1.875rem)]">
            <ul className="hidden items-center gap-[clamp(1rem,2vw,1.875rem)] text-sm lg:flex">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <NavLink
                    to={l.href}
                    tabIndex={scrolled ? -1 : 0}
                    className={linkClass}
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <a
              href={waLink(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={scrolled ? -1 : 0}
              className="hidden rounded-full border border-white/45 px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:border-white sm:inline-block"
            >
              Orçamento
            </a>
            <MenuButton open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>
      </div>

      {/* Estado scroll: cápsula que entra de cima */}
      <div
        /* `translate` e não `transform`: no Tailwind v4 as utilidades
           translate-* escrevem na propriedade `translate`, e listar
           `transform` aqui deixaria o deslize sem animação */
        className={`absolute inset-x-0 top-0 px-5 py-3 transition-[opacity,translate] duration-300 md:px-8 ${
          scrolled
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-full opacity-0"
        }`}
      >
        {/* Azul do logo em bloco, sem backdrop-filter: a cápsula é opaca, então
            não há o que desfocar por trás dela */}
        <nav className="mx-auto flex max-w-[73.75rem] items-center justify-between gap-6 rounded-full border border-white/15 bg-accent py-2 pr-2.5 pl-5 shadow-[0_18px_44px_rgb(3_10_14_/_0.45)] sm:pl-6.5">
          <Logo className="h-6" tabIndex={scrolled ? 0 : -1} />

          <ul className="hidden items-center gap-[26px] text-[13.5px] lg:flex">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <NavLink
                  to={l.href}
                  tabIndex={scrolled ? 0 : -1}
                  className={linkClass}
                >
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-4 sm:gap-[18px]">
            <a
              href={PHONE_HREF}
              tabIndex={scrolled ? 0 : -1}
              className="hidden text-[13.5px] font-bold text-white/90 transition-colors duration-200 hover:text-white lg:block"
            >
              {PHONE}
            </a>
            <a
              href={waLink(WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={scrolled ? 0 : -1}
              className="hidden rounded-full bg-[#f7fafb] px-5 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:bg-accent-soft sm:inline-block"
            >
              Orçamento
            </a>
            <MenuButton open={open} onClick={() => setOpen(!open)} />
          </div>
        </nav>
      </div>

      {/* Menu em tela cheia: logo e fechar em cima, os destinos em serifada
          grande separados por filete, e a chamada presa embaixo. Sem painel
          lateral e sem véu: a tela toda é o menu, então nada do fundo disputa
          atenção. Fica sempre montado para a saída também ser animada */}
      <aside
        aria-label="Menu"
        aria-hidden={!open}
        className={`fixed inset-0 flex h-dvh flex-col overflow-y-auto bg-ink px-6 pt-6 pb-8 transition-[opacity,translate] duration-400 ease-out sm:px-10 lg:hidden ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-3 opacity-0"
        }`}
      >
        {/* Mesmo brilho de acento das faixas escuras do site, para o fundo do
            menu não ser um retângulo chapado */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full opacity-25"
          style={{
            background: "radial-gradient(circle, #8cceee 0%, transparent 70%)",
          }}
        />

        <div className="relative flex items-center justify-between">
          <Logo className="h-7" tabIndex={open ? 0 : -1} />
          <button
            type="button"
            onClick={() => setOpen(false)}
            tabIndex={open ? 0 : -1}
            aria-label="Fechar menu"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors duration-300 hover:bg-white/20"
          >
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className="h-4 w-4"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6 6 18" />
            </svg>
          </button>
        </div>

        <ul className="relative mt-8 border-t border-white/12">
          {NAV_LINKS.map((l) => (
            <li key={l.href} className="border-b border-white/12">
              <NavLink
                to={l.href}
                tabIndex={open ? 0 : -1}
                className={({ isActive }) =>
                  `font-display block py-5 text-[28px] leading-tight font-semibold transition-colors duration-300 ${
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

        {/* mt-auto prende o bloco no rodapé em tela alta, e o pt-10 garante o
            respiro quando a lista já ocupa tudo */}
        <div className="relative mt-auto pt-10">
          <a
            href={PHONE_HREF}
            tabIndex={open ? 0 : -1}
            className="block text-center text-sm font-bold text-white/80 transition-colors duration-300 hover:text-accent-soft"
          >
            {PHONE}
          </a>
          <a
            href={waLink(WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            tabIndex={open ? 0 : -1}
            className="sheen mt-4 block rounded-full bg-accent-soft px-8 py-4 text-center text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
          >
            Solicitar orçamento
          </a>
        </div>
      </aside>
    </header>
  );
}
