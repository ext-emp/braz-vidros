import WhatsAppIcon from "./WhatsAppIcon.jsx";
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
      <WhatsAppIcon className="h-7 w-7 fill-white" />
    </a>
  );
}
