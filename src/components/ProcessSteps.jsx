import { PROCESS } from "../data/content.js";

/* Bloco "Como funciona", igual em Vidraçaria e Esquadrias */
export default function ProcessSteps() {
  return (
    <section className="bg-mist/60 py-16 md:py-24">
      <div className="container-site">
        <div data-reveal className="mb-10 text-center">
          <p className="eyebrow mb-3">Como funciona</p>
          <h2 className="font-display text-3xl font-semibold md:text-4xl">
            Do primeiro contato à entrega
          </h2>
        </div>
        <div data-reveal-group className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p) => (
            <div key={p.title} data-reveal>
              <div className="glass h-full rounded-3xl p-6">
                <h3 className="font-display mb-2 text-lg font-semibold">{p.title}</h3>
                <p className="text-sm leading-relaxed text-steel">{p.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
