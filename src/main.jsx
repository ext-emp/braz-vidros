import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { iniciarMedicao } from "./lib/analytics.js";

/* Antes da renderização e fora de qualquer efeito: o Consent Mode precisa
   estar declarado antes de tudo, e aqui não há a montagem dupla do StrictMode
   que registraria o ouvinte de cliques duas vezes no dev */
iniciarMedicao();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
);
