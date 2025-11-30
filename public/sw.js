const CACHE_NAME = 'chamapro-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/src/main.tsx',
  '/src/index.css',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  // Adicione mais assets built pelo Vite em prod (ex: /assets/*.js via console)
];

// Install: precache static shell
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Ativa SW imediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(STATIC_ASSETS))
  );
});

// Activate: limpa caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((name) => name !== CACHE_NAME && caches.delete(name))
      )
    )
  );
  self.clients.claim();
});

// Fetch: strategy híbrida
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Cache-first para assets estáticos
  if (STATIC_ASSETS.some(asset => event.request.url.includes(asset)) || /\.(png|jpg|jpeg|svg|ico|woff2?)$/.test(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cached) => cached || fetch(event.request))
    );
    return;
  }

  // Network-first para APIs (Supabase, dinâmicos)
  if (url.origin === location.origin && (url.pathname.includes('/rest/v1/') || url.pathname.includes('supabase'))) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // Fallback offline: cached ou erro
        return caches.match(event.request) || new Response('Offline - Tente novamente com internet', { status: 503 });
      }).then((response) => {
        // Cache response para next time
        if (response && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      })
    );
  } else {
    // Default: network-first com cache fallback
    event.respondWith(
      fetch(event.request).catch(() => caches.match(event.request))
    );
  }
});