// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxqyQgRKKL4KJ8o5HtN60o6FoV0aQxbUM",
  authDomain: "glory-info.firebaseapp.com",
  projectId: "glory-info",
  storageBucket: "glory-info.appspot.com",
  messagingSenderId: "301075676128",
  appId: "1:301075676128:web:ae27425ddeb2b4706ec985",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
