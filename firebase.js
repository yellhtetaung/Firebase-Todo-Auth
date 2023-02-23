import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3cNuF3FLHpWmuwZ2QVJDjIVffdnApqnk",
  authDomain: "tododemo-22d7c.firebaseapp.com",
  projectId: "tododemo-22d7c",
  storageBucket: "tododemo-22d7c.appspot.com",
  messagingSenderId: "805414899579",
  appId: "1:805414899579:web:1ceea4a693bb59889a37de",
  measurementId: "G-V8XZ09HQ5Q",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export { auth, db };
