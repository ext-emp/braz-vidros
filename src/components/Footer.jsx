import { Link } from "react-router-dom";
import {
  NAV_LINKS,
  INSTAGRAM,
  WHATSAPP,
  waLink,
  addressLine,
  addressShort,
  mapLink,
} from "../data/content.js";
import { openCookiePreferences } from "../lib/consent.js";

const phonePretty = `(${WHATSAPP.slice(2, 4)}) ${WHATSAPP.slice(4, 9)}-${WHATSAPP.slice(9)}`;

const FOOTER_SERVICES = [
  { label: "Box de banheiro", to: "/vidracaria" },
  { label: "Espelhos sob medida", to: "/vidracaria" },
  { label: "Sacadas de vidro", to: "/vidracaria" },
  { label: "Guarda-corpo", to: "/vidracaria" },
  { label: "Janelas de alumínio", to: "/esquadrias" },
  { label: "Portas e fechamentos", to: "/esquadrias" },
];

const iconProps = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "1.7",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
};

function IconPhone() {
  return (
    <svg {...iconProps} className="h-4 w-4 shrink-0 text-accent-soft">
      <path d="M6.5 3h3l1.5 4-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A17 17 0 0 1 4.5 5.2 2 2 0 0 1 6.5 3Z" />
    </svg>
  );
}

function IconPin() {
  return (
    <svg {...iconProps} className="mt-0.5 h-4 w-4 shrink-0 text-accent-soft">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function IconWhats() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-accent-soft"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.2-.4-4.5-1.2l-.3-.2-3 .8.8-3-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.7-5.6c-.3-.1-1.6-.8-1.9-.9-.2-.1-.4-.1-.6.1l-.8 1c-.2.2-.3.2-.5.1a6.7 6.7 0 0 1-3.4-3c-.2-.3 0-.5.1-.6l.5-.6c.1-.1.1-.3.2-.4 0-.2 0-.3-.1-.4l-.8-2c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.4.1-.7.3-.2.3-.9.9-.9 2.2s1 2.6 1.1 2.8c.1.2 1.9 2.9 4.6 4 .6.3 1.1.4 1.5.6.6.2 1.2.2 1.7.1.5-.1 1.6-.7 1.8-1.3.2-.6.2-1.2.2-1.3-.1-.1-.3-.2-.6-.3Z" />
    </svg>
  );
}

const IG_PATH =
  "M12 2.2c3.2 0 3.6 0 4.8.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-.9 1.38c-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58 0-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.2 15.62 2.2 15.24 2.2 12s0-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.2 8.8 2.2 12 2.2m0-2.2C8.74 0 8.33 0 7.05.07 5.78.13 4.9.33 4.14.63a5.9 5.9 0 0 0-2.13 1.38A5.9 5.9 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05 0 8.33 0 8.74 0 12s0 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.8.72 1.48 1.38 2.13a5.9 5.9 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 24 8.74 24 12 24s3.67 0 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.9 5.9 0 0 0 2.13-1.38 5.9 5.9 0 0 0 1.38-2.13c.3-.76.5-1.64.56-2.91.07-1.28.07-1.69.07-4.95s0-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.9 5.9 0 0 0-1.38-2.13A5.9 5.9 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67 0 15.26 0 12 0m0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84m0 10.15A4 4 0 1 1 16 12a4 4 0 0 1-4 4m7.85-10.4a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink">
      <div
        className="pointer-events-none absolute -bottom-40 -left-32 h-96 w-96 rounded-full opacity-15"
        style={{
          background: "radial-gradient(circle, #8ccdeec1 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative py-14 md:py-20">
        {/*
          Uma marcação, duas leituras. No celular empilha na ordem pedida:
          marca, contato, as duas listas lado a lado e a chamada por último.
          No lg vira as quatro colunas do modelo, com `order` recolocando o
          contato no fim da linha e o alinhamento voltando para a esquerda.
        */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 text-center lg:grid-cols-[1.5fr_1fr_1fr_1.4fr] lg:gap-x-10 lg:text-left">
          {/* Marca */}
          <div className="order-1 col-span-2 lg:col-span-1">
            <img
              src="/logo-braz-vidros-2.png"
              alt="Braz Vidros"
              width={647}
              height={141}
              loading="lazy"
              className="mx-auto h-7 w-auto brightness-0 invert lg:mx-0 lg:h-8"
            />
            <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-white/60 lg:mx-0 lg:max-w-xs">
              Ambientes mais claros e mais seguros, com vidro e alumínio de
              procedência.
            </p>
          </div>

          {/* Contato: logo abaixo da marca no celular, última coluna no desktop */}
          <div className="order-2 col-span-2 lg:order-4 lg:col-span-1">
            <p className="hidden text-xs font-bold tracking-widest text-white/50 uppercase lg:block">
              Contato
            </p>
            <ul className="flex flex-col items-center gap-3 text-sm lg:mt-4 lg:items-start">
              {/* No celular esta linha daria em dobro com o botão do fim */}
              <li className="hidden lg:block">
                <a
                  href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-white/75 transition-colors duration-300 hover:text-accent-soft"
                >
                  <IconWhats />
                  Falar no WhatsApp
                </a>
              </li>
              <li>
                <a
                  href={waLink("Olá! Quero um orçamento com a Braz Vidros.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-xs text-white transition-colors duration-300 hover:text-accent-soft lg:text-sm lg:text-white/75"
                >
                  <IconPhone />
                  {phonePretty}
                </a>
              </li>
              <li>
                <a
                  href={mapLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex max-w-sm items-start gap-2.5 text-white/70 transition-colors duration-300 hover:text-accent-soft"
                >
                  <IconPin />
                  <address className="text-left text-xs leading-relaxed not-italic lg:text-sm">
                    <span className="lg:hidden">{addressShort}</span>
                    <span className="hidden lg:inline">{addressLine}</span>
                  </address>
                </a>
              </li>
            </ul>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram da Braz Vidros"
              className="glass-dark mx-auto mt-6 flex h-11 w-11 items-center justify-center rounded-full transition-[filter] duration-300 hover:brightness-150 lg:mx-0"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5 fill-white"
                aria-hidden="true"
              >
                <path d={IG_PATH} />
              </svg>
            </a>
          </div>

          {/*
            No celular as duas listas vivem dentro deste par de largura fixa e
            centralizado, então o bloco fica no meio da tela de verdade. No lg
            o `contents` dissolve o invólucro e cada nav volta a ser coluna da
            grade externa, na ordem do modelo.
          */}
          <div className="order-3 col-span-2 mx-auto grid w-full max-w-sm grid-cols-[repeat(2,minmax(0,auto))] gap-x-6 lg:contents">
            {/* Navegação */}
            <nav aria-label="Mapa do site" className="lg:order-2">
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase">
                Navegação
              </p>
              <ul className="mt-4 space-y-2.5">
                {NAV_LINKS.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Serviços */}
            <nav aria-label="Serviços" className="lg:order-3">
              <p className="text-xs font-bold tracking-widest text-white/50 uppercase">
                Serviços
              </p>
              <ul className="mt-4 space-y-2.5">
                {FOOTER_SERVICES.map((s) => (
                  <li key={s.label}>
                    <Link
                      to={s.to}
                      className="text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                    >
                      {s.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Chamada final, só no celular: no desktop ela vira a linha de
              WhatsApp da coluna de contato */}
          <div className="order-5 col-span-2 flex justify-center lg:hidden">
            <a
              href={waLink("Olá! Vim pelo site da Braz Vidros.")}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen inline-block rounded-full bg-accent-soft px-7 py-3 text-center text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
            >
              Solicitar orçamento
            </a>
          </div>
        </div>
      </div>

      {/* Barra inferior: direitos, links legais e crédito de desenvolvimento */}
      <div className="relative border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 text-center lg:flex-row lg:gap-6 lg:text-left">
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} Braz Vidros. Todos os direitos
            reservados.
          </p>

          {/* Consentimento revogável a qualquer momento, como pede a LGPD:
              o botão reabre o mesmo painel do aviso de cookies */}
          <nav
            aria-label="Privacidade"
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-white/50"
          >
            <Link
              to="/privacidade"
              className="transition-colors duration-300 hover:text-accent-soft"
            >
              Política de Privacidade
            </Link>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <Link
              to="/cookies"
              className="transition-colors duration-300 hover:text-accent-soft"
            >
              Política de Cookies
            </Link>
            <span aria-hidden="true" className="text-white/25">
              &middot;
            </span>
            <button
              type="button"
              onClick={openCookiePreferences}
              className="transition-colors duration-300 hover:text-accent-soft"
            >
              Preferências de cookies
            </button>
          </nav>

          <a
            href="https://www.instagram.com/extechsolucoes/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-white/50 transition-colors duration-300 hover:text-accent-soft"
          >
            Desenvolvido por{" "}
            <span className="font-semibold">ExTech Soluções</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
