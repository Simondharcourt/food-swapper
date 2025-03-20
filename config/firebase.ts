// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyCX_F2LyDnBmd3TnNwm7jtxh7z0hX5wIiU",
    authDomain: "swapfood-1813e.firebaseapp.com",  
    projectId: "swapfood-1813e",
    storageBucket: "swapfood-1813e.firebasestorage.app",
    messagingSenderId: "933647230963",
    appId: "1:933647230963:web:906402ecf92e45fdbd1486",
    measurementId: "G-7KWKQ3J8DV"
};
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth }; 