/*
  Ícones dos serviços: traço simples, herdam a cor do container (currentColor).
  A chave vem do campo `icon` de cada serviço em content.js.
*/
const ICONS = {
  // Cabine com painel fixo, porta e a base do box embaixo
  box: (
    <>
      <rect x="4" y="3.5" width="16" height="15" rx="1.5" />
      <path d="M13 3.5v15" />
      <path d="M10.8 10v2.8" />
      <path d="M3 20.5h18" />
    </>
  ),
  // Espelho redondo no pé, com o brilho na borda
  espelho: (
    <>
      <circle cx="12" cy="10" r="6.5" />
      <path d="M9 7.5 11.5 5" />
      <path d="M12 16.5v4" />
      <path d="M8.5 20.5h7" />
    </>
  ),
  // Sacada vista de fora: laje embaixo e o vidro fechando o vão
  sacada: (
    <>
      <path d="M5 17.5V7h14v10.5" />
      <path d="M12 7v10.5" />
      <path d="M2.5 17.5h19" />
      <path d="M2.5 20.5h19" />
    </>
  ),
  // Degraus com o corrimão e os montantes que prendem o vidro
  guardaCorpo: (
    <>
      <path d="M3 21h4v-4h4v-4h4v-4h4" />
      <path d="M4.5 15.5 19.5 3.5" />
      <path d="M7 17v-3.5" />
      <path d="M15 9v-1.9" />
    </>
  ),
  // Telha inclinada sobre dois pilares. A inclinação é o que separa este
  // ícone do quiosque, que tem telhado de duas águas
  cobertura: (
    <>
      <path d="M2.5 11 21.5 7" />
      <path d="M2.5 14 21.5 10" />
      <path d="M5 13.5V21" />
      <path d="M19 10.5V21" />
    </>
  ),
  // Quiosque: telhado de duas águas, pilares e o balcão
  quiosque: (
    <>
      <path d="M2 10.5 12 4l10 6.5" />
      <path d="M5.5 10.5V21" />
      <path d="M18.5 10.5V21" />
      <path d="M5.5 15.5h13" />
    </>
  ),
  // Janela deitada, quatro folhas e o peitoril embaixo. O formato largo é o
  // que a diferencia da porta, que é alta e estreita
  janela: (
    <>
      <rect x="3" y="5" width="18" height="12" rx="1.5" />
      <path d="M12 5v12" />
      <path d="M3 11h18" />
      <path d="M2 19.5h20" />
    </>
  ),
  // Porta em pé sobre a linha do piso, com o eixo no meio e não na lateral,
  // que é o que faz dela uma pivotante
  porta: (
    <>
      <rect x="6" y="2.5" width="12" height="18" rx="1" />
      <path d="M12 2.5v18" />
      <path d="M9.2 11.3v1.8" />
      <path d="M14.8 11.3v1.8" />
      <path d="M3 20.5h18" />
    </>
  ),
  // Fachada comercial: as faixas de vidro e a entrada embaixo
  fachada: (
    <>
      <path d="M4 21V4.5A1.5 1.5 0 0 1 5.5 3h13A1.5 1.5 0 0 1 20 4.5V21" />
      <path d="M3 21h18" />
      <path d="M8 8h8" />
      <path d="M8 12h8" />
      <path d="M10 21v-4.5h4V21" />
    </>
  ),
  // Trena, que é o que abre toda obra sob medida
  medida: (
    <>
      <rect x="2.5" y="11" width="19" height="9.5" rx="3" />
      <circle cx="8.5" cy="15.75" r="2.5" />
      <path d="M15 11V5.5h6" />
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
