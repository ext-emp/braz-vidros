import { ABOUT_STORY } from "../data/content.js";

export default function CommitmentBand() {
  const { title, titleItalic, items } = ABOUT_STORY.closing;

  const promessas = items.map((item) => (
    <span
      key={item}
      className="commitment-item text-sm font-semibold text-white/85 md:text-[0.8125rem] lg:text-sm"
    >
      {item}
    </span>
  ));

  return (
    /* -mx-5 come o padding do .container-site: no celular a fita vai de borda
       a borda da tela, e por isso também perde o raio */
    <div
      data-reveal
      className="-mx-5 mt-16 bg-[linear-gradient(100deg,var(--color-accent),var(--color-ink))] py-6 md:mx-0 md:mt-20 md:rounded-[1.75rem] md:px-10 xl:rounded-full xl:px-12"
    >
      <div className="flex flex-col items-center gap-4 md:gap-5 xl:flex-row xl:gap-8">
        <p className="font-display shrink-0 px-5 text-center text-xl leading-tight font-semibold text-white md:px-0 md:text-[1.6rem] xl:text-left">
          {title}{" "}
          <span className="font-normal text-white/55 italic">{titleItalic}</span>
        </p>

        <span
          aria-hidden="true"
          className="hidden h-10 w-px shrink-0 bg-white/20 xl:block"
        />

        {/* min-w-0: item de flex nasce com min-width auto, e a soma das
            promessas esticaria a fita para fora da tela em vez de correr */}
        <div className="commitment-track w-full min-w-0 xl:ml-auto xl:w-auto">
          <div className="commitment-tape">
            <div className="commitment-group">{promessas}</div>
            <div className="commitment-group commitment-group-dup" aria-hidden="true">
              {promessas}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
