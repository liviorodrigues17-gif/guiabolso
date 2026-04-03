const CACHE_NAME = "guia-bolso-v4.0"; // Aumentamos a versão para forçar a atualização

const urlsToCache = [
  "/guiabolso/",
  "/guiabolso/index.html",
  "/guiabolso/manifest.json",
  "/guiabolso/icon-192.png",
  "/guiabolso/icon-512.png"
];

// Instala o Service Worker e força a atualização
self.addEventListener("install", (event) => {
  console.log("Service Worker instalado!");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );

  self.skipWaiting(); // Faz a nova versão assumir o controle imediatamente
});

// Ativa e limpa o lixo (cache antigo)
self.addEventListener("activate", (event) => {
  console.log("Service Worker ativado!");

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Intercepta requisições
self.addEventListener("fetch", (event) => {
  
  // 🚀 PASSE LIVRE PARA O FIREBASE: Deixa o tempo real funcionar solto!
  if (event.request.url.includes('firestore.googleapis.com') || 
      event.request.url.includes('firebase') || 
      event.request.url.includes('identitytoolkit')) {
      return; // Ignora o cache e vai direto pra internet
  }

  // Para os arquivos normais (HTML, imagens), usa o cache para abrir offline
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
