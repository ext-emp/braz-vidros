import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import { COOKIE_CATEGORIES } from "../data/legal.js";
import {
  useConsent,
  saveConsent,
  acceptAllConsent,
  rejectAllConsent,
  onOpenCookiePreferences,
} from "../lib/consent.js";
import { lockScroll } from "../lib/scrollLock.js";

/*
  Aviso de cookies em duas camadas:
  - Faixa discreta no rodapé enquanto a pessoa ainda não escolheu. Aceitar e
    recusar têm o mesmo peso visual, como manda a orientação da ANPD.
  - Painel de preferências, aberto pelo botão "Personalizar", pelo rodapé do
    site ou pela Política de Cookies, com uma chave por categoria.

  Tudo em portal no body: dentro do #smooth-content o transform do
  ScrollSmoother viraria a referência do position:fixed e a faixa subiria
  junto com a página.
*/

const reducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function Switch({ checked, onChange, disabled, label }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors duration-300 ${
        checked ? "bg-accent-soft" : "bg-white/25"
      } ${disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"}`}
    >
      {/* `transition-[translate]`: no Tailwind v4 as utilidades translate-*
          escrevem na propriedade `translate`, não em `transform` */}
      <span
        aria-hidden="true"
        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full shadow-sm transition-[translate,background-color] duration-300 ease-out ${
          checked ? "translate-x-5 bg-accent" : "translate-x-0 bg-white"
        }`}
      />
    </button>
  );
}

export default function CookieConsent() {
  const consent = useConsent();
  const [panelOpen, setPanelOpen] = useState(false);
  const [draft, setDraft] = useState(consent.prefs);

  const bannerRef = useRef(null);
  const panelRef = useRef(null);
  const cardRef = useRef(null);

  const bannerVisible = !consent.decided && !panelOpen;

  // O painel sempre abre mostrando o que está valendo agora
  const openPanel = useCallback(() => {
    setDraft({ ...consent.prefs });
    setPanelOpen(true);
  }, [consent.prefs]);

  // Rodapé e Política de Cookies reabrem o painel por evento de janela
  useEffect(() => onOpenCookiePreferences(openPanel), [openPanel]);

  // Enquanto o painel está aberto: Esc fecha e o fundo não rola
  useEffect(() => {
    if (!panelOpen) return;
    const onKey = (e) => e.key === "Escape" && setPanelOpen(false);
    window.addEventListener("keydown", onKey);
    const unlock = lockScroll();
    panelRef.current?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      unlock();
    };
  }, [panelOpen]);

  useGSAP(
    () => {
      if (!bannerVisible || reducedMotion()) return;
      gsap.from(bannerRef.current, {
        y: 24,
        opacity: 0,
        duration: 0.6,
        delay: 0.5,
        ease: "power3.out",
      });
    },
    { dependencies: [bannerVisible] }
  );

  useGSAP(
    () => {
      if (!panelOpen || reducedMotion()) return;
      gsap.from(panelRef.current, { opacity: 0, duration: 0.25, ease: "power2.out" });
      gsap.from(cardRef.current, {
        y: 20,
        scale: 0.97,
        duration: 0.35,
        ease: "power3.out",
      });
    },
    { dependencies: [panelOpen] }
  );

  const savePanel = () => {
    saveConsent(draft);
    setPanelOpen(false);
  };

  const acceptAll = () => {
    acceptAllConsent();
    setPanelOpen(false);
  };

  const rejectAll = () => {
    rejectAllConsent();
    setPanelOpen(false);
  };

  /* Botões sobre o marinho: o cheio no azul claro do logo, o vazado com filete
     branco. Mesmo tamanho nos dois, para aceitar e recusar terem o mesmo peso */
  const btnPrimary =
    "sheen rounded-full bg-accent-soft px-6 py-3 text-sm font-bold text-ink transition-colors duration-300 hover:bg-white";
  const btnGhost =
    "rounded-full border border-white/45 px-6 py-3 text-sm font-bold text-white transition-colors duration-300 hover:border-white hover:bg-white/10";

  return createPortal(
    <>
      {bannerVisible && (
        <aside
          ref={bannerRef}
          aria-label="Aviso de cookies"
          /* Marinho do logo em bloco, como a cápsula da navbar: a faixa nasce
             sobre o hero, e em vidro translúcido o texto sumia na foto.
             Acima do botão do WhatsApp (z-50) e abaixo do menu aberto (z-70) */
          className="fixed right-4 bottom-4 left-4 z-60 rounded-3xl border border-white/15 bg-accent p-5 shadow-[0_18px_44px_rgb(3_10_14_/_0.45)] md:right-auto md:bottom-6 md:left-6 md:max-w-[27rem] md:p-6"
        >
          <p className="font-display text-lg font-semibold text-white">
            Cookies e privacidade
          </p>
          <p className="mt-2 text-sm leading-relaxed text-white/75">
            Usamos cookies para o site funcionar e, se você deixar, para medir
            visitas e exibir o mapa do Google na página de Contato. Nada
            opcional é carregado antes da sua escolha.
          </p>
          <p className="mt-2 text-xs leading-relaxed text-white/60">
            Veja a{" "}
            <Link
              to="/cookies"
              className="font-semibold text-accent-soft hover:underline"
            >
              Política de Cookies
            </Link>{" "}
            e a{" "}
            <Link
              to="/privacidade"
              className="font-semibold text-accent-soft hover:underline"
            >
              Política de Privacidade
            </Link>
            .
          </p>

          <div className="mt-5 flex flex-col gap-2.5 sm:flex-row sm:flex-wrap">
            <button type="button" onClick={acceptAll} className={btnPrimary}>
              Aceitar todos
            </button>
            <button type="button" onClick={rejectAll} className={btnGhost}>
              Recusar opcionais
            </button>
          </div>
          <button
            type="button"
            onClick={openPanel}
            className="mt-3 text-sm font-semibold text-white/70 underline underline-offset-4 transition-colors duration-300 hover:text-accent-soft"
          >
            Personalizar
          </button>
        </aside>
      )}

      {panelOpen && (
        <div
          ref={panelRef}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-label="Preferências de cookies"
          onClick={() => setPanelOpen(false)}
          className="fixed inset-0 z-80 flex items-end justify-center bg-ink/70 p-0 backdrop-blur-sm outline-none sm:items-center sm:p-6"
        >
          <div
            ref={cardRef}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl border border-white/15 bg-accent shadow-2xl sm:max-h-[86dvh] sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-white/15 px-6 py-5 md:px-8">
              <div>
                <p className="eyebrow mb-1 text-accent-soft">Privacidade</p>
                <h2 className="font-display text-2xl font-semibold text-white">
                  Preferências de cookies
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setPanelOpen(false)}
                aria-label="Fechar preferências"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/12 text-xl leading-none text-white transition-colors duration-300 hover:bg-white/25"
              >
                &times;
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-5 md:px-8">
              <p className="text-sm leading-relaxed text-white/75">
                Escolha o que pode ser carregado enquanto você navega. Você pode
                voltar aqui quando quiser pelo link no rodapé do site. Detalhes
                de cada cookie estão na{" "}
                <Link
                  to="/cookies"
                  onClick={() => setPanelOpen(false)}
                  className="font-semibold text-accent-soft hover:underline"
                >
                  Política de Cookies
                </Link>
                .
              </p>

              <ul className="mt-5 space-y-3">
                {COOKIE_CATEGORIES.map((cat) => {
                  const checked = cat.required || draft[cat.key] === true;
                  return (
                    <li
                      key={cat.id}
                      className="rounded-2xl border border-white/12 bg-white/8 p-5"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-semibold text-white">{cat.name}</p>
                          {cat.required && (
                            <p className="mt-0.5 text-xs font-bold tracking-wide text-accent-soft uppercase">
                              Sempre ativos
                            </p>
                          )}
                        </div>
                        <Switch
                          checked={checked}
                          disabled={cat.required}
                          label={`Cookies de ${cat.name}`}
                          onChange={(value) =>
                            setDraft((d) => ({ ...d, [cat.key]: value }))
                          }
                        />
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-white/70">
                        {cat.summary}
                      </p>
                      {cat.note && (
                        <p className="mt-2 text-xs leading-relaxed text-white/55">
                          {cat.note}
                        </p>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            <div className="flex flex-col gap-2.5 border-t border-white/15 px-6 py-5 sm:flex-row sm:justify-end md:px-8">
              <button type="button" onClick={rejectAll} className={btnGhost}>
                Recusar opcionais
              </button>
              <button type="button" onClick={savePanel} className={btnGhost}>
                Salvar escolha
              </button>
              <button type="button" onClick={acceptAll} className={btnPrimary}>
                Aceitar todos
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
}
