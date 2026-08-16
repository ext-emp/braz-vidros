import { useEffect } from "react";

/* Título da aba e meta description por página (SPA) */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    document.title = title;
    const meta = document.querySelector('meta[name="description"]');
    if (meta && description) meta.setAttribute("content", description);
  }, [title, description]);
}
