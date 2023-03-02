// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAMX8sDaziMf0zg1xlFcWKt8MFLWn4Fidc",
  authDomain: "counter-app-71114.firebaseapp.com",
  projectId: "counter-app-71114",
  storageBucket: "counter-app-71114.appspot.com",
  messagingSenderId: "603089872254",
  appId: "1:603089872254:web:52be9d76f0f85fc7bb7f2f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)