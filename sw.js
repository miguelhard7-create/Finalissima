const CACHE_NAME = 'gordin-xit-v2';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Instalação e Cache
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(assets);
    })
  );
});

// Ativação e limpeza de caches antigos
self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

// Intercepta requisições para manter o app rápido e online
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Sincronização em segundo plano para manter o processo "vivo"
self.addEventListener('sync', (event) => {
  if (event.tag === 'keep-alive') {
    console.log('Gordin Xit: Mantendo pulso de segundo plano...');
  }
});
