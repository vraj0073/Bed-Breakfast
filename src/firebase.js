import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

var firebaseConfig = {
  apiKey: "AIzaSyDDjcgHmAxlIuPLVH4vRHNV3b6lA7z98sY",
  authDomain: "serverlessassignment.firebaseapp.com",
  projectId: "serverlessassignment",
  storageBucket: "serverlessassignment.appspot.com",
  messagingSenderId: "362380943533",
  appId: "1:362380943533:web:68c597cd98a4f6af3c6624",
};

const firebaseApp = initializeApp(firebaseConfig);
const messaging = getMessaging(firebaseApp);

export const fetchToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      "BCZJBJQtr0RFOOb-JrfgpC5YVpjUvDN-wE7lMoXO6oDgd_eyJ7nw9l6E0ndPCs2tde1nE65w9Iplfy0Z6dgUsWQ",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
