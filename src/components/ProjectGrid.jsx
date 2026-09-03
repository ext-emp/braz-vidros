import { useEffect, useState } from "react";
import Lightbox from "./Lightbox.jsx";

/*
  `reveal` desliga o data-reveal da grade. Serve para quem troca a lista em
  tempo de execução (o filtro da home): o GSAP anima cada [data-reveal] uma
  vez só e deixa a opacidade cravada no elemento, então uma grade que muda
  de conteúdo precisa revelar pelo wrapper, não por ela mesma.
*/
export default function ProjectGrid({
  items,
  columns = "sm:grid-cols-2 lg:grid-cols-4",
  reveal = true,
}) {
  // null = galeria fechada; número = índice da foto aberta
  const [open, setOpen] = useState(null);

  // Lista nova, índice velho: fecha o lightbox para ele nunca apontar para
  // uma foto que saiu da lista
  useEffect(() => {
    setOpen(null);
  }, [items]);

  return (
    <>
      <div
        data-reveal={reveal ? "" : undefined}
        className={`grid gap-5 ${columns}`}
      >
        {items.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setOpen(i)}
            aria-label={`Ampliar foto: ${p.title}`}
            className="group relative block cursor-zoom-in overflow-hidden rounded-3xl text-left"
          >
            <img
              src={p.image}
              alt={p.title}
              loading="lazy"
              className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
            />
            <span className="glass-dark absolute inset-x-3 bottom-3 block translate-y-2 rounded-2xl px-4 py-3 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <span className="block text-sm font-semibold text-white">{p.title}</span>
              <span className="block text-xs text-accent-soft">{p.category}</span>
            </span>
          </button>
        ))}
      </div>

      {open !== null && items[open] && (
        <Lightbox
          items={items}
          index={open}
          onIndexChange={setOpen}
          onClose={() => setOpen(null)}
        />
      )}
    </>
  );
}
