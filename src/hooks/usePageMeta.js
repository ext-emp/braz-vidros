import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BASE_URL = "https://brazvidros.com.br";

/*
  SEO por página na SPA: título da aba, meta description, canonical e
  Open Graph sincronizados com a rota (para crawlers que executam JS;
  o preview de WhatsApp usa as tags estáticas do index.html).
*/
export function usePageMeta({ title, description }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    const set = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };

    const url = BASE_URL + (pathname === "/" ? "/" : pathname);
    set('meta[name="description"]', "content", description);
    set('link[rel="canonical"]', "href", url);
    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
  }, [title, description, pathname]);
}
