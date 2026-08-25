/*
  Faixa escura de abertura das páginas internas.
  Também garante fundo escuro atrás da navbar transparente no topo.
*/
export default function PageHeader({ eyebrow, title, text }) {
  return (
    <header className="relative overflow-hidden bg-ink pt-36 pb-16 md:pt-44 md:pb-20">
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-20"
        style={{ background: "radial-gradient(circle, #8ccdeec1 0%, transparent 70%)" }}
      />
      <div className="container-site relative text-center">
        <p data-reveal className="eyebrow mb-3 text-accent-soft">
          {eyebrow}
        </p>
        <h1
          data-reveal
          className="font-display mx-auto max-w-3xl text-4xl leading-[1.05] font-semibold text-white md:text-6xl"
        >
          {title}
        </h1>
        {text && (
          <p data-reveal className="mx-auto mt-5 max-w-xl leading-relaxed text-white/70">
            {text}
          </p>
        )}
      </div>
    </header>
  );
}
