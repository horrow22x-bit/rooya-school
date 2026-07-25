import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDnJ2zaij4jU_KFZ9A3qbLuH9lc0Z1dXwo",
  authDomain: "rooya-school.firebaseapp.com",
  projectId: "rooya-school",
  storageBucket: "rooya-school.firebasestorage.app",
  messagingSenderId: "620896734984",
  appId: "1:620896734984:web:7ee2283b4485b293f5e6bd",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);