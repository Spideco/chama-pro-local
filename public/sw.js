const CACHE_NAME = 'chamapro-pwa-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/sw.js',
  '/pwa-icon.svg',
  '/favicon.ico',
  '/robots.txt'
];

// Install: precache estático + ativa imediatamente
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

// Activate: limpa caches antigos + ativa imediatamente
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    ).then(() => self.clients.claim())
  );
});

// Estratégias de cache
async function cacheFirst(request) {
  const cache = await caches.open(CACHE_NAME);
  let response = await cache.match(request);
  if (response) return response;
  response = await fetch(request);
  cache.put(request, response.clone());
  return response;
}

async function networkFirst(request) {
  try {
    const response = await fetch(request);
    const cache = await caches.open(CACHE_NAME);
    cache.put(request, response.clone());
    return response;
  } catch {
    return await caches.match(request);
  }
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(CACHE_NAME);
  const response = await cache.match(request) || fetch(request);
  if (response) cache.put(request, response.clone());
  return response;
}

// Fetch: estratégias por tipo
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // Offline fallback para navegação (home)
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request).catch(() => caches.match('/index.html'))
    );
    return;
  }

  // Assets estáticos e imagens: Cache First
  if (request.destination === 'image' || request.url.includes('/assets/') || request.url.includes('.css') || request.url.includes('.js')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  // APIs Supabase: Network First (com fallback cache)
  if (request.url.includes('supabase.co') || request.url.includes('/rest/v1/')) {
    event.respondWith(networkFirst(request));
    return;
  }

  // Páginas/dinâmico: Stale-While-Revalidate
  event.respondWith(staleWhileRevalidate(request));
});

// Mensagem para clients (update prompt)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});