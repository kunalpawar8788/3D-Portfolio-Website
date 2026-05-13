import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "portfolio-messages-858f3",
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyDvZ-tI8L8mF9pQ6K9R1L2M3N4O5P6Q7R8S",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "portfolio-messages-858f3.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "portfolio-messages-858f3.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890abcd",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
