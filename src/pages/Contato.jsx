import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import {
  waLink,
  INSTAGRAM,
  WHATSAPP,
  PAGE_META,
  addressLine,
  mapEmbed,
  mapLink,
} from "../data/content.js";
import { useConsent, saveConsent } from "../lib/consent.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

const phonePretty = `(${WHATSAPP.slice(2, 4)}) ${WHATSAPP.slice(4, 9)}-${WHATSAPP.slice(9)}`;

export default function Contato() {
  usePageMeta(PAGE_META.contato);

  /* O mapa é um iframe do Google e grava cookies de terceiros, então só entra
     depois do aceite da categoria de marketing. Sem aceite, o lugar dele fica
     com o endereço e o link para abrir o mapa fora do site */
  const consent = useConsent();
  const showMap = consent.prefs.marketing === true;
  const enableMap = () => saveConsent({ ...consent.prefs, marketing: true });

  return (
    <>
      <PageHeader
        eyebrow="Contato"
        title="Peça seu orçamento"
        text="Manda as medidas pelo WhatsApp e a gente responde com o preço."
      />

      <section className="container-site py-16 md:py-24">
        <div data-reveal-group className="grid gap-5 md:grid-cols-3">
          <a
            href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="sheen group block rounded-3xl bg-accent-soft p-7 transition-[filter] duration-300 hover:brightness-110"
          >
            <p className="text-xs font-bold tracking-widest text-ink/70 uppercase">WhatsApp</p>
            <p className="font-display mt-2 text-2xl font-semibold text-ink">{phonePretty}</p>
            <p className="mt-4 text-sm font-bold text-ink">Chamar agora</p>
          </a>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            data-reveal
            className="glass sheen group block rounded-3xl p-7"
          >
            <p className="text-xs font-bold tracking-widest text-steel uppercase">Instagram</p>
            <p className="font-display mt-2 text-2xl font-semibold text-ink">@braz_vidross</p>
            <p className="mt-4 text-sm font-bold text-accent">Ver projetos recentes</p>
          </a>

          <div data-reveal>
            <div className="glass h-full rounded-3xl p-7">
              <p className="text-xs font-bold tracking-widest text-steel uppercase">Atendimento</p>
              <p className="font-display mt-2 text-2xl font-semibold text-ink">
                Novo Hamburgo <span className="text-accent">e região</span>
              </p>
              <p className="mt-4 text-sm leading-relaxed text-steel">
                Seg. a sáb., orçamento sem compromisso
              </p>
            </div>
          </div>
        </div>

        {/* Mapa: carrega só quando chega perto, para não pesar a página */}
        <div data-reveal className="mt-10">
          <p className="eyebrow mb-3 text-center">Onde estamos</p>
          <div className="glass overflow-hidden rounded-3xl p-2">
            {showMap ? (
              <iframe
                title={`Mapa: ${addressLine}`}
                src={mapEmbed()}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-85 w-full rounded-[1.25rem] border-0 md:h-110"
              />
            ) : (
              <div className="flex h-85 flex-col items-center justify-center gap-4 rounded-[1.25rem] bg-mist/70 px-6 text-center md:h-110">
                <p className="max-w-md leading-relaxed text-steel">
                  O mapa é carregado pelo Google e grava cookies de terceiros no
                  seu navegador. Para vê-lo aqui dentro, é preciso liberar os
                  cookies de marketing.
                </p>
                <button
                  type="button"
                  onClick={enableMap}
                  className="sheen rounded-full bg-accent px-7 py-3 text-sm font-bold text-white transition-colors duration-300 hover:bg-ink-soft"
                >
                  Liberar e carregar o mapa
                </button>
                <p className="text-xs text-steel">
                  Prefere não liberar? Use o link abaixo para abrir no Google
                  Maps, ou veja a{" "}
                  <Link
                    to="/cookies"
                    className="font-semibold text-accent hover:underline"
                  >
                    Política de Cookies
                  </Link>
                  .
                </p>
              </div>
            )}
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <address className="text-sm text-steel not-italic">{addressLine}</address>
            <a
              href={mapLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-bold text-accent hover:underline"
            >
              Abrir no Google Maps
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
