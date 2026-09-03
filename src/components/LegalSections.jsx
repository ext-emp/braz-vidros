/*
  Corpo das páginas legais (privacidade e cookies).
  Cada seção tem título, parágrafos, uma lista opcional e um fecho opcional
  depois da lista, que é o formato dos textos em src/data/legal.js.
*/
export default function LegalSections({ sections }) {
  return (
    <div data-reveal-group className="space-y-10">
      {sections.map((s) => (
        <section key={s.title} data-reveal>
          <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
            {s.title}
          </h2>
          {s.text?.map((p, i) => (
            <p
              key={i}
              className="mt-3 max-w-prose leading-relaxed text-steel hyphens-auto"
            >
              {p}
            </p>
          ))}
          {s.list && (
            <ul className="mt-4 max-w-prose space-y-2.5">
              {s.list.map((item, i) => (
                <li
                  key={i}
                  className="flex gap-3 leading-relaxed text-steel"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {s.after?.map((p, i) => (
            <p
              key={i}
              className="mt-4 max-w-prose leading-relaxed text-steel hyphens-auto"
            >
              {p}
            </p>
          ))}
        </section>
      ))}
    </div>
  );
}
