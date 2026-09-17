import WhatsAppIcon from "./WhatsAppIcon.jsx";
import { waLink } from "../data/content.js";

export default function WhatsAppFloat() {
  return (
    <a
      href={waLink("Olá! Vim pelo site da Braz Vidros.")}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar no WhatsApp"
      className="glass-dark sheen fixed right-5 bottom-5 z-50 flex h-14 w-14 items-center justify-center rounded-full transition-[scale] duration-300 ease-out hover:scale-110 md:right-8 md:bottom-8"
      style={{ background: "linear-gradient(135deg, rgb(37 211 102 / 0.92), rgb(18 140 66 / 0.92))" }}
    >
      <WhatsAppIcon className="h-7 w-7 fill-white" />
    </a>
  );
}
