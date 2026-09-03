import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import LegalSections from "../components/LegalSections.jsx";
import { PAGE_META } from "../data/content.js";
import {
  COOKIE_CATEGORIES,
  COOKIE_SECTIONS_INTRO,
  COOKIE_SECTIONS_OUTRO,
  LEGAL_UPDATED,
} from "../data/legal.js";
import { useConsent, openCookiePreferences } from "../lib/consent.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

/* Uma linha do detalhamento de cada cookie */
function Field({ label, children }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[8.5rem_1fr] sm:gap-4">
      <dt className="text-xs font-bold tracking-wide text-steel uppercase sm:pt-0.5">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-ink/80">{children}</dd>
    </div>
  );
}

export default function Cookies() {
  usePageMeta(PAGE_META.cookies);
  const consent = useConsent();

  const statusOf = (cat) =>
    cat.required
      ? "Sempre ativos"
      : consent.prefs[cat.key]
        ? "Ativos"
        : "Desativados";

  return (
    <>
      <PageHeader
        eyebrow="Cookies"
        title="Política de Cookies"
        text="O que o site guarda no seu navegador, por quê, e como mudar isso a qualquer momento."
      />

      <section className="container-site py-14 md:py-20">
        <p data-reveal className="mb-10 text-sm text-steel">
          Última atualização: {LEGAL_UPDATED}
        </p>

        <LegalSections sections={COOKIE_SECTIONS_INTRO} />

        {/* Painel de escolha: o mesmo do aviso, aberto por evento */}
        <div data-reveal className="glass mt-10 rounded-3xl p-6 md:p-8">
          <p className="eyebrow mb-2">Sua escolha</p>
          <p className="max-w-prose leading-relaxed text-ink">
            {consent.decided
              ? "Você já respondeu ao aviso de cookies neste navegador. O estado de cada categoria está logo abaixo, e dá para mudar quando quiser."
              : "Você ainda não respondeu ao aviso neste navegador. Enquanto isso, nenhum cookie opcional é carregado."}
          </p>
          {consent.decided && consent.updatedAt && (
            <p className="mt-2 text-sm text-steel">
              Registrada em{" "}
              {new Date(consent.updatedAt).toLocaleDateString("pt-BR")}, válida
              por 6 meses.
            </p>
          )}
          <button
            type="button"
            onClick={openCookiePreferences}
            className="sheen mt-5 rounded-full bg-accent px-7 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-ink-soft"
          >
            Gerenciar preferências
          </button>
        </div>

        {/* Detalhamento por categoria */}
        <div data-reveal-group className="mt-10 space-y-5">
          {COOKIE_CATEGORIES.map((cat) => (
            <article
              key={cat.id}
              data-reveal
              className="rounded-3xl border border-frost bg-white/60 p-6 md:p-8"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h2 className="font-display text-xl font-semibold text-ink md:text-2xl">
                  {cat.name}
                </h2>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    cat.required || consent.prefs[cat.key]
                      ? "bg-accent/10 text-accent"
                      : "bg-mist text-steel"
                  }`}
                >
                  {statusOf(cat)}
                </span>
              </div>

              <p className="mt-3 max-w-prose leading-relaxed text-steel">
                {cat.summary}
              </p>
              {cat.note && (
                <p className="mt-2 max-w-prose text-sm leading-relaxed text-steel/80">
                  {cat.note}
                </p>
              )}

              <ul className="mt-5 space-y-4">
                {cat.items.map((item) => (
                  <li
                    key={item.name}
                    className="rounded-2xl bg-mist/60 p-5"
                  >
                    <dl className="space-y-2">
                      <Field label="Cookie">
                        <span className="font-semibold text-ink">{item.name}</span>
                      </Field>
                      <Field label="Quem cria">{item.provider}</Field>
                      <Field label="Para que serve">{item.purpose}</Field>
                      <Field label="Duração">{item.duration}</Field>
                    </dl>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <div className="mt-10">
          <LegalSections sections={COOKIE_SECTIONS_OUTRO} />
        </div>

        <p data-reveal className="mt-10 text-sm text-steel">
          Para o tratamento de dados em geral, veja a{" "}
          <Link
            to="/privacidade"
            className="font-semibold text-accent hover:underline"
          >
            Política de Privacidade
          </Link>
          .
        </p>
      </section>
    </>
  );
}
