import { useSyncExternalStore } from "react";

/*
  Consentimento de cookies (LGPD, Lei 13.709/2018).

  Regras que o modelo segue:
  - Nada opcional carrega antes do aceite. Só a categoria "necessários" roda
    sem escolha, e ela guarda apenas a própria preferência.
  - Recusar é tão fácil quanto aceitar: o banner tem os dois botões lado a
    lado, com o mesmo peso.
  - A escolha vale 6 meses. Depois disso o banner volta, que é a renovação
    periódica que a ANPD recomenda.
  - Trocar a versão (VERSION) invalida o que estava salvo e pergunta de novo:
    é o que fazer quando entrar uma ferramenta nova no site.

  A preferência mora no localStorage, não num cookie: assim o próprio
  mecanismo de consentimento não precisa de consentimento.
*/

const STORAGE_KEY = "bv:consent";
const VERSION = 1;
const MAX_AGE_MS = 180 * 24 * 60 * 60 * 1000; // 6 meses

const NONE = { analytics: false, marketing: false };
const ALL = { analytics: true, marketing: true };

const UNDECIDED = { decided: false, updatedAt: null, prefs: NONE };

function readStored() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw);
    if (saved?.v !== VERSION || !saved.ts) return null;
    if (Date.now() - saved.ts > MAX_AGE_MS) return null;
    return {
      decided: true,
      updatedAt: saved.ts,
      prefs: {
        analytics: saved.prefs?.analytics === true,
        marketing: saved.prefs?.marketing === true,
      },
    };
  } catch {
    // Navegador em aba anônima ou com armazenamento bloqueado: sem escolha salva
    return null;
  }
}

let state = readStored() ?? UNDECIDED;
const listeners = new Set();

function commit(next) {
  state = next;
  listeners.forEach((fn) => fn());
  // Evento de janela para quem não é React (um script de terceiro, por exemplo)
  window.dispatchEvent(new CustomEvent("bv:consent", { detail: next }));
}

export function getConsent() {
  return state;
}

/* Só as categorias opcionais entram aqui: as necessárias não são negociáveis */
export function saveConsent(prefs) {
  const ts = Date.now();
  const next = {
    decided: true,
    updatedAt: ts,
    prefs: {
      analytics: prefs.analytics === true,
      marketing: prefs.marketing === true,
    },
  };
  try {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ v: VERSION, ts, prefs: next.prefs })
    );
  } catch {
    // Sem armazenamento a escolha vale só para esta visita
  }
  commit(next);
}

export const acceptAllConsent = () => saveConsent(ALL);
export const rejectAllConsent = () => saveConsent(NONE);

/* Apaga a escolha e traz o banner de volta */
export function resetConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* nada a limpar */
  }
  commit(UNDECIDED);
}

function subscribe(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useConsent() {
  return useSyncExternalStore(subscribe, getConsent, () => UNDECIDED);
}

/* Portão para carregar qualquer coisa opcional: allows("marketing") && ... */
export function allows(category) {
  return state.prefs[category] === true;
}

/*
  O rodapé e a política de cookies precisam reabrir o painel, e nenhum dos dois
  é vizinho do componente. Um evento de janela resolve sem contexto global.
*/
const PREFS_EVENT = "bv:cookie-preferences";

export function openCookiePreferences() {
  window.dispatchEvent(new Event(PREFS_EVENT));
}

export function onOpenCookiePreferences(handler) {
  window.addEventListener(PREFS_EVENT, handler);
  return () => window.removeEventListener(PREFS_EVENT, handler);
}
