/* A entrelinha vai junto do corpo: as duas saem da mesma decisão e, soltas,
   duas classes de leading disputariam a mesma propriedade */
const TAMANHOS = {
  /* Padrão das seções internas */
  sm: "text-[26px] leading-tight md:text-4xl",
  /* Abertura forte, uma por página */
  md: "text-[28px] leading-tight md:text-5xl",
  /* h1 das páginas, sobre a faixa escura */
  lg: "text-[32px] leading-[1.1] md:text-6xl md:leading-[1.05]",
  /* Dentro de cartão estreito: pelo vw, para caber em uma linha no celular */
  card: "text-[clamp(1.35rem,5.4vw,2.25rem)] leading-tight",
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  as: Tag = "h2",
  align = "left",
  tone = "light",
  size = "sm",
  divider = false,
  reveal = "group",
  className = "",
}) {
  const centrado = align === "center";
  const escuro = tone === "dark";
  const emGrupo = reveal === "group";

  const classes = (...partes) => partes.filter(Boolean).join(" ");

  return (
    <div
      data-reveal-group={emGrupo ? "" : undefined}
      data-reveal={reveal === "item" ? "" : undefined}
      className={classes(
        /* No celular tudo fica centrado, inclusive o que é alinhado à
           esquerda no desktop: em coluna única de 320px o texto em bandeira
           deixava a segunda linha curta e o bloco torto na tela */
        centrado ? "text-center" : "text-center md:text-left",
        divider && "border-b border-ink/12 pb-6 md:pb-7",
        className,
      )}
    >
      <div data-reveal={emGrupo ? "" : undefined}>
        <Tag
          className={classes(
            "font-display font-semibold",
            TAMANHOS[size],
            escuro && "text-white",
            centrado && "mx-auto max-w-3xl",
          )}
        >
          {title}
        </Tag>
      </div>

      {text && (
        <p
          data-reveal={emGrupo ? "" : undefined}
          className={classes(
            "mt-4 leading-relaxed md:mt-5",
            escuro ? "text-white/70" : "text-steel",
            /* A medida de linha continua a mesma; o que muda é a margem, que
               centra a caixa no celular e volta para a esquerda no desktop */
            centrado ? "mx-auto max-w-xl" : "mx-auto max-w-md md:mx-0",
          )}
        >
          {text}
        </p>
      )}
    </div>
  );
}
