import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  User,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Km1vc2aB2CFYgl-VprieW5UIb66Ak7M",
  authDomain: "rock-merch-db.firebaseapp.com",
  projectId: "rock-merch-db",
  storageBucket: "rock-merch-db.appspot.com",
  messagingSenderId: "1021191451148",
  appId: "1:1021191451148:web:fb79032854b3dabbb2b429",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});
//Auth
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
//Database
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth: User) => {
  const userDocRef = doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef); //snapshot -> the data

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (error: unknown) {
      // Si el error no es de tipo "Error" convertimos lo que llegue en string (Typescript required)
      const message = error instanceof Error ? error.message : String(error);
      console.log("error creating the user", message);
    }
  }

  return userDocRef;
};
