importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyBYfTNSUcUillOUHH3Xso_66qJ0Y0g9rWg",
  authDomain: "guia-bolso-dc217.firebaseapp.com",
  projectId: "guia-bolso-dc217",
  messagingSenderId: "1099448847704",
  appId: "1:1099448847704:web:33ccdfe4f01e5b23ef292d"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {

  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    icon: "/guiabolso/icon-192.png"
  });

});