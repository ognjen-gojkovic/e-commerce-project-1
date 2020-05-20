import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyAJ6XqWTXsxPXtsKw3PVcBsKIh91oS9zM4",
  authDomain: "crown-db-47e8d.firebaseapp.com",
  databaseURL: "https://crown-db-47e8d.firebaseio.com",
  projectId: "crown-db-47e8d",
  storageBucket: "crown-db-47e8d.appspot.com",
  messagingSenderId: "106534002559",
  appId: "1:106534002559:web:59dfc400d012741073c44a",
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
