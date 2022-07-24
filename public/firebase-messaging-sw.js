// Scripts for firebase and firebase messaging
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

var firebaseConfig = {
  apiKey: "AIzaSyDDjcgHmAxlIuPLVH4vRHNV3b6lA7z98sY",
  authDomain: "serverlessassignment.firebaseapp.com",
  projectId: "serverlessassignment",
  storageBucket: "serverlessassignment.appspot.com",
  messagingSenderId: "362380943533",
  appId: "1:362380943533:web:68c597cd98a4f6af3c6624",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
