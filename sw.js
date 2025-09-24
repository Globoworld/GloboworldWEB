// sw.js per GloboworldWEB
const CACHE_NAME = "globoworld-cache-v1";

// File precache (puoi aggiungere CSS, JS, immagini se vuoi)
const PRECACHE_URLS = [
  "/GloboworldWEB/",
  "/GloboworldWEB/index.html"
];

// Install: precache delle risorse di base
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activate: rimuove le vecchie cache
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Fetch: cache-first con fallback alla rete
self.addEventListener("fetch", event => {
  if (event.request.url.startsWith("https://globoworld.github.io/GloboworldWEB/")) {
    event.respondWith(
      caches.match(event.request).then(response => {
        return (
          response ||
          fetch(event.request).then(fetchResponse => {
            return caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, fetchResponse.clone());
              return fetchResponse;
            });
          }).catch(() => {
            // Fallback offline: mostra index.html per navigazioni
            if (event.request.mode === "navigate") {
              return caches.match("/GloboworldWEB/index.html");
            }
          })
        );
      })
    );
  }
});
