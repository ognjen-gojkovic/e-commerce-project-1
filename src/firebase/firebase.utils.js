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

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating an user", error.message);
    }
  }
  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
