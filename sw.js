importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

// 1. INICIA O FIREBASE DENTRO DO CÉREBRO DO APP
firebase.initializeApp({
  apiKey: "AIzaSyBYfTNSUcUillOUHH3Xso_66qJ0Y0g9rWg",
  authDomain: "guia-bolso-dc217.firebaseapp.com",
  projectId: "guia-bolso-dc217",
  messagingSenderId: "1099448847704",
  appId: "1:1099448847704:web:33ccdfe4f01e5b23ef292d"
});

const messaging = firebase.messaging();

// 2. EVITANDO O CLONE: O Firebase já mostra a notificação automaticamente.
// Se deixarmos o comando 'showNotification' aqui, ele duplica!
messaging.onBackgroundMessage(function(payload) {
  console.log("Mensagem recebida! O próprio Firebase vai desenhar na tela.");
});

// --------------------------------------------------------
// 3. SEU CÓDIGO DE CACHE 
// --------------------------------------------------------
const CACHE_NAME = "guia-bolso-v7.0"; // 🚀 Atualizado para matar a notificação dupla

const urlsToCache = [
  "/guiabolso/",
  "/guiabolso/index.html",
  "/guiabolso/manifest.json",
  "/guiabolso/icon-192.png",
  "/guiabolso/icon-512.png"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((cacheNames) => Promise.all(
      cacheNames.map((cache) => { if (cache !== CACHE_NAME) return caches.delete(cache); })
  )));
});

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes('firestore.googleapis.com') || event.request.url.includes('firebase') || event.request.url.includes('identitytoolkit')) {
      return; 
  }
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
