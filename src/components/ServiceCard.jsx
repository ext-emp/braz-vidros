export default function ServiceCard({ title, text }) {
  // data-reveal fica no wrapper: o GSAP anima o transform do wrapper e a
  // transição CSS de hover do card não briga com ele
  return (
    <div data-reveal>
      <div className="glass sheen group h-full rounded-3xl p-7 transition-transform duration-500 ease-out hover:-translate-y-1.5">
        <div className="mb-5 h-10 w-10 rounded-xl bg-accent/15 ring-1 ring-accent/30 transition-colors duration-300 group-hover:bg-accent/25" />
        <h3 className="font-display mb-2 text-xl font-semibold">{title}</h3>
        <p className="text-sm leading-relaxed text-steel">{text}</p>
      </div>
    </div>
  );
}
