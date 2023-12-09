// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-e-commerce-cf04f.firebaseapp.com",
  projectId: "mern-e-commerce-cf04f",
  storageBucket: "mern-e-commerce-cf04f.appspot.com",
  messagingSenderId: "229824647955",
  appId: "1:229824647955:web:aca9afc2a625bf254e00e6"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);