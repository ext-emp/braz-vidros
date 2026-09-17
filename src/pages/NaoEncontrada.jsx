import { Link } from "react-router-dom";
import { NAV_LINKS, PAGE_META, waLink } from "../data/content.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

/*
  Endereço que não existe. Em vez de devolver a home calada, que é o que
  acontecia antes, a página assume o erro e entrega as saídas: voltar ao
  início, ver os trabalhos e a lista das outras rotas.

  Faixa escura, e não clara como o resto do conteúdo do site, porque a barra
  do topo é transparente com texto branco enquanto ninguém rolou a página.
  Numa abertura clara os links dela sumiriam, que é a mesma razão de o
  PageHeader das outras páginas internas ser escuro.

  O `noindex` vem do PAGE_META, que também mantém esta rota fora do sitemap.
*/

/* Os destinos do rodapé da página: as rotas do menu, menos a home, que já é
   o botão principal */
const ATALHOS = NAV_LINKS.filter((l) => l.href !== "/");

const WA_MESSAGE = "Olá! Vim pelo site da Braz Vidros.";

export default function NaoEncontrada() {
  usePageMeta(PAGE_META.naoEncontrada);

  return (
    <section className="relative flex items-center overflow-hidden bg-ink pt-36 pb-20 md:min-h-[82vh] md:pt-44 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, #8ccdeec1 0%, transparent 70%)",
        }}
      />

      <div className="container-site relative">
        <div className="md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,auto)] md:items-center md:gap-10">
          {/* Centralizado no celular, onde a coluna é estreita e o texto fica
              melhor no eixo; alinhado à esquerda a partir de md, quando o
              número entra ao lado */}
          <div data-reveal-group className="text-center md:text-left">
            <p
              data-reveal
              className="mb-4 text-[0.78rem] font-bold tracking-[0.18em] text-accent-soft uppercase"
            >
              Erro 404
            </p>

            <h1
              data-reveal
              className="font-display text-[44px] leading-[1.03] font-semibold text-white md:text-[64px]"
            >
              Página não
              <br />
              <span className="text-accent-soft">encontrada</span>
            </h1>

            <p
              data-reveal
              className="mx-auto mt-5 max-w-md leading-relaxed text-white/70 md:mx-0"
            >
              O endereço que você abriu não existe ou mudou de lugar. Volte ao
              início ou veja os trabalhos que já entregamos em Novo Hamburgo e
              região.
            </p>

            <div
              data-reveal
              className="mt-8 flex flex-wrap justify-center gap-3 md:justify-start"
            >
              <Link
                to="/"
                className="sheen inline-flex min-h-14 items-center justify-center rounded-full bg-accent-soft px-8 text-sm font-bold text-ink transition-colors duration-300 hover:bg-white"
              >
                Voltar ao início
              </Link>

              <Link
                to="/vidracaria"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/45 px-8 text-sm font-semibold text-white transition-colors duration-300 hover:border-white hover:bg-white/10"
              >
                Ver nossos trabalhos
              </Link>
            </div>

            <div
              data-reveal
              className="mt-10 border-t border-white/15 pt-6 md:mt-12"
            >
              <p className="mb-3 text-[0.72rem] font-bold tracking-[0.18em] text-white/45 uppercase">
                Ou vá direto para
              </p>
              <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 md:justify-start">
                {ATALHOS.map((l) => (
                  <li key={l.href}>
                    <Link
                      to={l.href}
                      className="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <a
                    href={waLink(WA_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center text-sm text-white/75 transition-colors duration-300 hover:text-accent-soft"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Número como ilustração: decorativo para o leitor de tela, e some
              no celular, onde ele roubaria a altura do conteúdo */}
          <p
            aria-hidden="true"
            className="font-display hidden leading-none font-semibold text-white/10 select-none md:block md:text-[clamp(9rem,17vw,15rem)]"
          >
            404
          </p>
        </div>
      </div>
    </section>
  );
}
