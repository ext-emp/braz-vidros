export default function ProjectGrid({ items, columns = "sm:grid-cols-2 lg:grid-cols-4" }) {
  return (
    <div data-reveal className={`grid gap-5 ${columns}`}>
      {items.map((p) => (
        <figure key={p.title} className="group relative overflow-hidden rounded-3xl">
          <img
            src={p.image}
            alt={p.title}
            loading="lazy"
            className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
          <figcaption className="glass-dark absolute inset-x-3 bottom-3 translate-y-2 rounded-2xl px-4 py-3 opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100">
            <p className="text-sm font-semibold text-white">{p.title}</p>
            <p className="text-xs text-accent-soft">{p.category}</p>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
