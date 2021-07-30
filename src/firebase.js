import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDBK8w0K69Mymr8RXRuB1IrE_o5eHa6YMA",
  authDomain: "slack-clone-redux-4c2aa.firebaseapp.com",
  projectId: "slack-clone-redux-4c2aa",
  storageBucket: "slack-clone-redux-4c2aa.appspot.com",
  messagingSenderId: "531390952585",
  appId: "1:531390952585:web:63fa10e7541f3ebfdb0258",
  measurementId: "G-G3ETYDRV2D",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider, db };
