import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading.jsx";
import { ABOUT_HOME, HERO_STATS } from "../data/content.js";

/*
  Quem é a empresa, em faixa escura, no fim da home. Mesma família visual do
  CTABand: cartão em tinta, cantos de 1.75rem e o halo em azul claro no canto.

  A foto entra por cima no celular e vira a coluna da direita a partir de md.
  O degradê acompanha: sobe do rodapé da foto no celular, onde o texto vem
  logo abaixo, e vem da esquerda no desktop, onde ele vem ao lado.
*/
export default function AboutBand() {
  return (
    <section className="container-site py-16 md:py-24">
      <div
        data-reveal
        className="relative overflow-hidden rounded-[1.75rem] bg-ink md:grid md:grid-cols-[1.15fr_minmax(0,1fr)]"
      >
        <div
          className="pointer-events-none absolute -right-20 -bottom-24 h-72 w-72 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, #8cceee 0%, transparent 70%)" }}
        />

        {/* h-56 no celular; a partir de md quem dá a altura é a coluna do
            texto, e a foto se estica sozinha por ser item de grid */}
        <div className="relative h-56 md:order-2 md:h-auto">
          <img
            src={ABOUT_HOME.image}
            alt={ABOUT_HOME.imageAlt}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="about-scrim absolute inset-0" />
        </div>

        {/* text-center leva junto o link do fim, que é inline-flex */}
        {/* 24px de recuo lateral no celular, não 32: são 16px a mais de
            largura útil, que é o que falta para os três números caberem
            lado a lado com a legenda numa linha só */}
        <div className="relative px-6 py-8 text-center sm:p-10 md:order-1 md:p-14 md:text-left">
          {/* O cartão inteiro já entra de uma vez: aqui o cabeçalho não anima
              por conta própria */}
          <SectionHeading
            eyebrow={ABOUT_HOME.eyebrow}
            title={ABOUT_HOME.title}
            text={ABOUT_HOME.text}
            tone="dark"
            reveal={false}
          />

          {/* Os três numa linha só, de borda a borda do cartão. Cada coluna
              com a largura do próprio rótulo, e não um terço fixo: "1 ano" é
              curto e devolve para os vizinhos o que não usa.

              Os rótulos somam 25,7em, que nos 12px de projeto passam da
              largura de qualquer celular. Por isso o corpo acompanha a tela
              até o teto de 12px, e o nowrap garante a linha única.

              Número centrado sobre a legenda, como na faixa do hero: o valor
              é mais curto que o rótulo, e pela esquerda cada par ficava com
              um encaixe diferente */}
          <ul className="mt-8 flex justify-between gap-x-2 border-t border-white/15 pt-7 sm:flex-wrap sm:justify-center sm:gap-x-10 sm:gap-y-5 md:justify-start">
            {HERO_STATS.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-display text-xl leading-none font-semibold text-white sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-[min(0.75rem,2.5vw)] leading-snug whitespace-nowrap text-white/65 sm:text-xs">
                  {s.label}
                </p>
              </li>
            ))}
          </ul>

          <Link
            to={ABOUT_HOME.link}
            className="mt-7 inline-flex min-h-11 items-center text-sm font-bold text-accent-soft hover:underline"
          >
            {ABOUT_HOME.linkText}
          </Link>
        </div>
      </div>
    </section>
  );
}
