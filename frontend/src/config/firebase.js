import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBommpqdW8QpJyzjyViqGEGRS6qd1wu7nI",
  authDomain: "smarttaskmanager-ecee7.firebaseapp.com",
  projectId: "smarttaskmanager-ecee7",
  storageBucket: "smarttaskmanager-ecee7.firebasestorage.app",
  messagingSenderId: "784953740224",
  appId: "1:784953740224:web:e5ce21e8f30a9d274d5625",
  measurementId: "G-H0MJRRYX9W"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
