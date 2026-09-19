import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  MEDICAO_ATIVA,
  EVENTO_REVER,
  lerConsentimento,
  aceitar,
  recusar,
} from "../lib/analytics.js";

/*
  Aviso de consentimento da LGPD.

  Só existe em build com ID de medição preenchido: sem tag para carregar não há
  o que consentir, e um banner pedindo autorização para nada seria só ruído.

  Três regras que a tela precisa cumprir, e que também estão na política:
  aceitar e recusar têm o mesmo peso visual, fechar no X vale como recusa, e o
  rodapé tem link permanente para rever a escolha, que chega aqui pelo evento
  de janela EVENTO_REVER.

  Fica acima do botão flutuante do WhatsApp no celular (bottom-24) para não
  cobrir a principal chamada do site enquanto a pessoa decide.
*/
export default function BannerCookies() {
  const [aberto, setAberto] = useState(false);
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (!MEDICAO_ATIVA) return;

    if (lerConsentimento() === null) setAberto(true);

    const reabrir = () => setAberto(true);
    window.addEventListener(EVENTO_REVER, reabrir);
    return () => window.removeEventListener(EVENTO_REVER, reabrir);
  }, []);

  /* Entrada em dois passos: monta fora de posição e sobe no frame seguinte,
     senão a transição não tem de onde partir */
  useEffect(() => {
    if (!aberto) {
      setVisivel(false);
      return;
    }
    const id = requestAnimationFrame(() => setVisivel(true));
    return () => cancelAnimationFrame(id);
  }, [aberto]);

  if (!MEDICAO_ATIVA || !aberto) return null;

  /* Fechar basta: o efeito acima devolve `visivel` para falso, e é isso que
     faz o banner voltar a subir com animação se for reaberto pelo rodapé */
  const decidir = (acao) => {
    acao();
    setAberto(false);
  };

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      className={`glass-dark fixed inset-x-5 bottom-24 z-60 rounded-2xl p-5 transition-[opacity,transform] duration-500 ease-out motion-reduce:transition-none md:inset-x-auto md:bottom-8 md:left-8 md:max-w-md md:p-6 ${
        visivel ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      <button
        type="button"
        onClick={() => decidir(recusar)}
        aria-label="Fechar o aviso, o mesmo que recusar"
        className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full text-white/60 transition-colors duration-300 hover:bg-white/10 hover:text-white"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          className="h-4 w-4"
          aria-hidden="true"
        >
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>

      <p className="pr-8 text-sm font-bold text-white">Cookies de medição</p>

      <p className="mt-2 text-sm leading-relaxed text-white/75">
        Usamos cookies do Google para saber como as pessoas chegam até aqui e
        quais páginas levam a um pedido de orçamento. Nada é carregado antes de
        você escolher, e a escolha pode ser mudada depois.
      </p>

      {/* Mesmo tamanho, mesma forma e mesmo peso de fonte nos dois botões: a
          LGPD não admite recusa escondida em letra miúda */}
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={() => decidir(aceitar)}
          className="sheen flex-1 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
        >
          Aceitar
        </button>
        <button
          type="button"
          onClick={() => decidir(recusar)}
          className="flex-1 rounded-full border border-white/35 bg-white/12 px-5 py-2.5 text-sm font-bold text-white transition-colors duration-300 hover:bg-white/22"
        >
          Recusar
        </button>
      </div>

      {/* Sem fechar o banner: quem vai ler a política ainda não escolheu, e
          fechar aqui deixaria a pessoa sem aviso e sem decisão registrada */}
      <Link
        to="/privacidade"
        className="mt-4 inline-block text-xs text-white/55 underline-offset-4 transition-colors duration-300 hover:text-accent-soft hover:underline"
      >
        Ler a Política de Privacidade
      </Link>
    </div>
  );
}
