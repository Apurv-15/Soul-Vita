import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDpEem7uPglcAxouQBUiziUTdVMW8TiEis",
  authDomain: "soul-viva.firebaseapp.com",
  projectId: "soul-viva",
  storageBucket: "soul-viva.firebasestorage.app",
  messagingSenderId: "58498008879",
  appId: "1:58498008879:web:7acdc22a1956232d4c03da"
};

// Initialize Firebase (SSR-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };
