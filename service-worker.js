const CACHE_NAME = 'kasworld-aero-cache-v1';
const URLS_TO_CACHE = [
  'https://kasworld-aero.blogspot.com/',
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(URLS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request).catch(() => new Response('<h1>Offline</h1><p>You are offline.</p>', { headers: { 'Content-Type': 'text/html' }})))
  );
});
