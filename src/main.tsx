import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Registro do Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registrado:', registration.scope);
      })
      .catch((error) => {
        console.log('❌ Falha no Service Worker:', error);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);