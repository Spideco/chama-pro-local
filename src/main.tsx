import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Registro PWA Service Worker (auto-update, offline-ready)
async function registerSW() {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', { scope: '/' });
      
      // Auto-update suave
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // Prompt update (pode customizar toast)
                const answer = confirm('Nova versão disponível! Deseja atualizar?');
                if (answer) newWorker.postMessage({ type: 'SKIP_WAITING' });
              } else {
                // Primeira instalação: ativa imediatamente
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          });
        }
      });
    } catch (error) {
      console.warn('SW registration failed:', error);
    }
  }
}

registerSW();

createRoot(document.getElementById("root")!).render(<App />);