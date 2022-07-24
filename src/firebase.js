import firebase from "firebase";

const config = {
  apiKey: "AIzaSyDDjcgHmAxlIuPLVH4vRHNV3b6lA7z98sY",
  authDomain: "serverlessassignment.firebaseapp.com",
  projectId: "serverlessassignment",
  storageBucket: "serverlessassignment.appspot.com",
  messagingSenderId: "362380943533",
  appId: "1:362380943533:web:68c597cd98a4f6af3c6624",
};
firebase.initializeApp(config);

export default firebase;
