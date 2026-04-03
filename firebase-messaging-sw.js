importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/10.8.1/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBYfTNSUcUillOUHH3Xso_66qJ0Y0g9rWg",
  authDomain: "guia-bolso-dc217.firebaseapp.com",
  projectId: "guia-bolso-dc217",
  messagingSenderId: "1099448847704",
  appId: "1:1099448847704:web:33ccdfe4f01e5b23ef292d"
});

const messaging = firebase.messaging();

// O Firebase agora cuida de tudo sozinho no background
// Ele vai ler o "webpush" que mandamos do backend e disparar com prioridade máxima e vibração!
