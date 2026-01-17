
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDgOgIcD8_83JxPYhS4i0LDVL8i6Qp6-Ko",
  authDomain: "job-swipe-1a26b.firebaseapp.com",
  projectId: "job-swipe-1a26b",
  storageBucket: "job-swipe-1a26b.firebasestorage.app",
  messagingSenderId: "426711889989",
  appId: "1:426711889989:web:c549a46b6a2f4e20edcb2c",
  measurementId: "G-9EQR9CJ652"
};

// Initialize specific app instance to avoid multiple Initializations
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage, firestore };
