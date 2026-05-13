import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

let firebaseApp = null;
let firestoreInstance = null;

const initFirebase = () => {
  const projectId = process.env.FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      `Firebase initialization failed. Check environment variables:\nFIREBASE_PROJECT_ID: ${projectId ? "✓" : "✗"}\nFIREBASE_CLIENT_EMAIL: ${clientEmail ? "✓" : "✗"}\nFIREBASE_PRIVATE_KEY: ${privateKey ? "✓" : "✗"}`
    );
  }

  firebaseApp =
    getApps().length > 0
      ? getApps()[0]
      : initializeApp({
          credential: cert({
            projectId,
            clientEmail,
            privateKey,
          }),
        });

  firestoreInstance = getFirestore(firebaseApp);
  console.log("✓ Firebase Firestore initialized successfully");
  return firestoreInstance;
};

export const getFirestoreInstance = () => {
  if (!firestoreInstance) {
    return initFirebase();
  }
  return firestoreInstance;
};

export const firestore = {
  collection: (name) => getFirestoreInstance().collection(name),
};


