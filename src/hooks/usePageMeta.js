import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { SITE_URL, OG_IMAGE, OG_IMAGE_ALT } from "../data/content.js";

/*
  SEO por página na SPA: título da aba, description, canonical, robots, Open
  Graph e Twitter Card sincronizados com a rota.

  Isto vale para os robôs que executam JavaScript. Crawler de rede social
  (WhatsApp, Facebook, Telegram) não executa, e lê as tags estáticas do
  index.html, que descrevem a home. Por isso as duas fontes existem, e as do
  index.html precisam ser mantidas junto com as daqui.

  Os campos vêm do PAGE_META em content.js, que é a mesma fonte que alimenta
  o sitemap.
*/
export function usePageMeta({ title, description, image, imageAlt, noindex }) {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = title;

    /* Só reescreve a tag que já existe no HTML: assim o conjunto de metas do
       site fica declarado num lugar só, o index.html */
    const set = (selector, attr, value) => {
      const el = document.querySelector(selector);
      if (el && value) el.setAttribute(attr, value);
    };

    const url = SITE_URL + pathname;
    const capa = SITE_URL + (image || OG_IMAGE);
    const capaAlt = imageAlt || OG_IMAGE_ALT;

    set('meta[name="description"]', "content", description);
    set('link[rel="canonical"]', "href", url);
    set(
      'meta[name="robots"]',
      "content",
      noindex ? "noindex, nofollow" : "index, follow",
    );

    set('meta[property="og:url"]', "content", url);
    set('meta[property="og:title"]', "content", title);
    set('meta[property="og:description"]', "content", description);
    set('meta[property="og:image"]', "content", capa);
    set('meta[property="og:image:alt"]', "content", capaAlt);

    set('meta[name="twitter:title"]', "content", title);
    set('meta[name="twitter:description"]', "content", description);
    set('meta[name="twitter:image"]', "content", capa);
    set('meta[name="twitter:image:alt"]', "content", capaAlt);
  }, [title, description, image, imageAlt, noindex, pathname]);
}
