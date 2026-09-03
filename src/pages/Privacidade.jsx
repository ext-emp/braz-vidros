import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader.jsx";
import LegalSections from "../components/LegalSections.jsx";
import { PAGE_META } from "../data/content.js";
import { LEGAL_UPDATED, PRIVACY_SECTIONS } from "../data/legal.js";
import { usePageMeta } from "../hooks/usePageMeta.js";

export default function Privacidade() {
  usePageMeta(PAGE_META.privacidade);

  return (
    <>
      <PageHeader
        eyebrow="Privacidade"
        title="Política de Privacidade"
        text="Como a Braz Vidros trata os dados de quem visita o site e pede orçamento."
      />

      <section className="container-site py-14 md:py-20">
        <p data-reveal className="mb-10 text-sm text-steel">
          Última atualização: {LEGAL_UPDATED}
        </p>

        <LegalSections sections={PRIVACY_SECTIONS} />

        <p data-reveal className="mt-10 text-sm text-steel">
          Sobre cookies, veja a{" "}
          <Link to="/cookies" className="font-semibold text-accent hover:underline">
            Política de Cookies
          </Link>
          .
        </p>
      </section>
    </>
  );
}
