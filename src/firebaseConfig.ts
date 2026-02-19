import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDS--IQFPDA2WyBvhWhxZSrZyiWIZYjGTk",
  authDomain: "odiliya-backend-dashboard.firebaseapp.com",
  projectId: "odiliya-backend-dashboard",
  storageBucket: "odiliya-backend-dashboard.firebasestorage.app",
  messagingSenderId: "961246966912",
  appId: "1:961246966912:web:5aae24369e6c62c50de265"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);