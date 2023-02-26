import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAxqyQgRKKL4KJ8o5HtN60o6FoV0aQxbUM",
  authDomain: "glory-info.firebaseapp.com",
  projectId: "glory-info",
  storageBucket: "glory-info.appspot.com",
  messagingSenderId: "301075676128",
  appId: "1:301075676128:web:ae27425ddeb2b4706ec985",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
