// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAPJhchKG_FiQKql2rAFcFBTYYG5nO6Qhg",
  authDomain: "monograph-6f9ec.firebaseapp.com",
  projectId: "monograph-6f9ec",
  storageBucket: "monograph-6f9ec.firebasestorage.app",
  messagingSenderId: "673293967721",
  appId: "1:673293967721:web:a1b66230a40b6606c1ddf8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app)
export default app