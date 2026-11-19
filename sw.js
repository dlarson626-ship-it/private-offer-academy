/* Private Offer Academy — service worker
   Bump VERSION whenever you change index.html so installed copies pick up the update. */
const VERSION = "v3";
const SHELL = "poa-shell-" + VERSION;
const RUNTIME = "poa-runtime-v1";
const SHELL_FILES = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icons/icon-192.png",
  "./icons/icon-512.png",
  "./icons/icon-maskable-512.png",
  "./icons/apple-touch-icon.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== SHELL && k !== RUNTIME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // Google Fonts: stale-while-revalidate so the app keeps its typography offline.
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    event.respondWith(
      caches.open(RUNTIME).then((cache) =>
        cache.match(req).then((hit) => {
          const net = fetch(req).then((res) => { cache.put(req, res.clone()); return res; }).catch(() => hit);
          return hit || net;
        })
      )
    );
    return;
  }

  if (url.origin !== self.location.origin) return;

  // Page navigations: network first (so updates show up), fall back to the cached shell offline.
  if (req.mode === "navigate") {
    event.respondWith(
      fetch(req)
        .then((res) => { caches.open(SHELL).then((c) => c.put("./index.html", res.clone())); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  // Everything else from our own origin: cache first.
  event.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
