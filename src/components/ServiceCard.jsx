/*
  Ícones dos serviços: traço simples, herdam a cor do container (currentColor).
  A chave vem do campo `icon` de cada serviço em content.js.
*/
const ICONS = {
  box: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M12 3v18" />
      <path d="M14.5 12h2" />
    </>
  ),
  espelho: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="6" />
      <path d="M8.5 10.5 12 7" />
      <path d="M8.5 14.5 14 9" />
    </>
  ),
  sacada: (
    <>
      <path d="M3 8h18" />
      <path d="M3 19h18" />
      <path d="M4 8v11" />
      <path d="M12 8v11" />
      <path d="M20 8v11" />
    </>
  ),
  guardaCorpo: (
    <>
      <path d="M4 20h4v-4h4v-4h4V8h4" />
      <path d="M4 15 20 5" />
    </>
  ),
  cobertura: (
    <>
      <path d="M3 10 12 5l9 5" />
      <path d="M3 10h18" />
      <path d="M6 10v4" />
      <path d="M18 10v4" />
    </>
  ),
  quiosque: (
    <>
      <path d="M3 10 12 4l9 6" />
      <path d="M5 10v10" />
      <path d="M19 10v10" />
      <path d="M5 20h14" />
    </>
  ),
  janela: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 12h18" />
      <path d="M12 3v18" />
    </>
  ),
  porta: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M15.5 12h1" />
    </>
  ),
  fachada: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 3v18" />
      <path d="M15 3v18" />
      <path d="M3 9h18" />
      <path d="M3 15h18" />
    </>
  ),
  medida: (
    <>
      <rect x="2" y="8" width="20" height="8" rx="1.5" />
      <path d="M7 8v3" />
      <path d="M12 8v4" />
      <path d="M17 8v3" />
    </>
  ),
};

export default function ServiceCard({ title, text, icon }) {
  // data-reveal fica no wrapper: o GSAP anima o transform do wrapper e a
  // transição CSS de hover do card não briga com ele
  return (
    <div data-reveal>
      <div className="glass sheen group h-full rounded-3xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5">
        <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-accent/15 text-accent ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent/25">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            {ICONS[icon] ?? ICONS.medida}
          </svg>
        </div>
        <h3 className="font-display mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-steel">{text}</p>
      </div>
    </div>
  );
}
