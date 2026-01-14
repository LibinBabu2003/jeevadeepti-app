import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB8sQIh5OE0FMV5NX6T5iA6rYm8yplUka8",
  authDomain: "jeevadeepti-app.firebaseapp.com",
  projectId: "jeevadeepti-app",
  storageBucket: "jeevadeepti-app.firebasestorage.app",
  messagingSenderId: "847312214213",
  appId: "1:847312214213:web:3ecde0ad8c658928eb38ac",
  measurementId: "G-NQTKQJ0CSC"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);