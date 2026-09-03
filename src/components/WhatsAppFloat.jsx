import { waLink } from "../data/content.js";
import { useConsent } from "../lib/consent.js";

export default function WhatsAppFloat() {
  /* No celular o aviso de cookies ocupa a largura toda do rodapé e passaria
     por cima deste botão. Enquanto a pessoa não escolhe, ele sai de cena;
     no desktop o aviso fica à esquerda e os dois convivem */
  const { decided } = useConsent();

  return (
    <a
      href={waLink("Olá! Vim pelo site da Braz Vidros.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      aria-hidden={!decided ? "true" : undefined}
      tabIndex={!decided ? -1 : undefined}
      className={`glass-dark sheen fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-[scale,opacity] duration-300 ease-out hover:scale-110 md:right-8 md:bottom-8 ${
        decided
          ? ""
          : "max-md:pointer-events-none max-md:scale-75 max-md:opacity-0"
      }`}
      style={{ background: "linear-gradient(135deg, rgb(37 211 102 / 0.92), rgb(18 140 66 / 0.92))" }}
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden="true">
        <path d="M12.04 2c-5.46 0-9.9 4.44-9.9 9.9 0 1.75.46 3.45 1.32 4.95L2.05 22l5.3-1.39a9.87 9.87 0 0 0 4.69 1.19h.01c5.46 0 9.9-4.44 9.9-9.9 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2m0 1.67c2.2 0 4.27.86 5.82 2.42a8.2 8.2 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24m-3.53 4.44c-.16 0-.43.06-.66.31-.22.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.47-.07 1.46-.6 1.67-1.18.2-.57.2-1.07.14-1.17-.06-.11-.22-.17-.47-.29-.25-.13-1.46-.72-1.69-.8-.22-.09-.39-.13-.55.12-.17.25-.64.8-.78.97-.14.16-.29.18-.53.06-.25-.13-1.05-.39-2-1.23-.73-.66-1.23-1.47-1.38-1.72-.14-.25-.01-.38.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.43-.06-.13-.55-1.34-.76-1.84-.2-.48-.4-.42-.55-.42h-.49z" />
      </svg>
    </a>
  );
}
