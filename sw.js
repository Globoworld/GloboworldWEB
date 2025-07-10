const CACHE_NAME = 'globoworld';
const urlsToCache = [
  '/',
  '/index.html',
  '/index1.html',
  'https://globoworld.github.io/GloboworldWEB/logosu.png',
  'GW.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
