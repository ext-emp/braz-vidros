import SectionHeading from "./SectionHeading.jsx";

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
      <div className="container-site relative">
        <SectionHeading
          as="h1"
          eyebrow={eyebrow}
          title={title}
          text={text}
          align="center"
          tone="dark"
          size="lg"
        />
      </div>
    </header>
  );
}
