import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyCoLdpbpwiTVSSiXqUAEP6aOCCDuYxGWkQ",
  authDomain: "proposal-fe5d9.firebaseapp.com",
  databaseURL: "https://proposal-fe5d9-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "proposal-fe5d9",
  storageBucket: "proposal-fe5d9.firebasestorage.app",
  messagingSenderId: "1098781456783",
  appId: "1:1098781456783:web:5c6eb4e58a6ccf013e73fa",
  measurementId: "G-BHH0RMSY3Q"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);
const storage = getStorage(app);

export { db, storage };
