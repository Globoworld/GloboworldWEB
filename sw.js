const CACHE_NAME = 'globoworld-v3';
const urlsToCache = [
  '/',
  '/index.html',
  '/index1.html',
  'https://globosearch.rf.gd/logosu.png',
  'GW.png',
  'Sponsor.png'
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