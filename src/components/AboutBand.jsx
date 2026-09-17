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
        <div className="relative p-8 text-center sm:p-10 md:order-1 md:p-14 md:text-left">
          {/* O cartão inteiro já entra de uma vez: aqui o cabeçalho não anima
              por conta própria */}
          <SectionHeading
            eyebrow={ABOUT_HOME.eyebrow}
            title={ABOUT_HOME.title}
            text={ABOUT_HOME.text}
            tone="dark"
            reveal={false}
          />

          {/* Três colunas no celular: com flex-wrap, o terceiro número caía
              sozinho numa segunda linha e abria um buraco no meio do cartão.
              O valor encolhe junto, senão "4.000+" não cabe na coluna que
              sobra depois do padding. A partir de sm volta a ser fita.

              Número centrado sobre a legenda, como na faixa do hero: o valor
              é mais curto que o rótulo, e pela esquerda cada par ficava com
              um encaixe diferente */}
          <ul className="mt-8 grid grid-cols-3 gap-x-3 gap-y-5 border-t border-white/15 pt-7 sm:flex sm:flex-wrap sm:justify-center sm:gap-x-10 md:justify-start">
            {HERO_STATS.map((s) => (
              <li key={s.label} className="text-center">
                <p className="font-display text-xl leading-none font-semibold text-white sm:text-3xl">
                  {s.value}
                </p>
                <p className="mt-1.5 text-xs leading-snug text-white/65">{s.label}</p>
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
