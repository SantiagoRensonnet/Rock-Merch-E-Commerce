//Types
import { Categories } from "./types";
//Firebase Methods
import { User, NextOrObserver } from "firebase/auth";
import { initializeApp } from "firebase/app";
//Auth Methods
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
//Firestore (Firebase  db)
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9Km1vc2aB2CFYgl-VprieW5UIb66Ak7M",
  authDomain: "rock-merch-db.firebaseapp.com",
  projectId: "rock-merch-db",
  storageBucket: "rock-merch-db.appspot.com",
  messagingSenderId: "1021191451148",
  appId: "1:1021191451148:web:fb79032854b3dabbb2b429",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig); //creates app instance

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account",
});
//Auth
export const auth = getAuth(); //creates auth instance
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

//Database
export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey: string,
  objectsToAdd: Categories
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });
  await batch.commit();
};
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);

  return querySnapshot.docs.map((docSnapshot) => ({
    title: docSnapshot.data().title,
    cover: docSnapshot.data().cover,
    imageXOffset: docSnapshot.data()?.imageXOffset,
    imageYOffset: docSnapshot.data()?.imageYOffset,
    items: docSnapshot.data().items,
  }));
};
export const getUserData = async (userAuth: User | null) => {
  if (userAuth) {
    const userDocRef = doc(db, "users", userAuth.uid); //creates reference to users->userUid
    const userSnapshot = await getDoc(userDocRef); //snapshot -> the data in users->userUid
    if (userSnapshot.exists()) {
      return userSnapshot.data();
    } else {
      // doc.data() will be undefined in this case
      return { state: "error", errorCode: "No such document!" };
    }
  } else {
    return { state: "No user conected" };
  }
};
export const createUserDocumentFromAuth = async (
  userAuth: User,
  additionalInformation: Object = {}
) => {
  if (!userAuth) return;

  //users is the collection
  //user doc is the document, userDocRef is a reference (pointer) to that document
  const userDocRef = doc(db, "users", userAuth.uid); //creates reference to users->userUid
  const userSnapshot = await getDoc(userDocRef); //snapshot -> the data in users->userUid

  // if user data does not exist
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error: unknown) {
      // Si el error no es de tipo "Error" convertimos lo que llegue en string (Typescript required)
      const message = error instanceof Error ? error.message : String(error);
      console.log("error creating the user", message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string
) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const singOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback: NextOrObserver<User>) =>
  onAuthStateChanged(auth, callback);
