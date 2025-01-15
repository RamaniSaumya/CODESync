// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRzUt1iWcIL5tRl-iS8_XbTADQ42H4IhE",
  authDomain: "codesync-486db.firebaseapp.com",
  projectId: "codesync-486db",
  storageBucket: "codesync-486db.firebasestorage.app",
  messagingSenderId: "930902263257",
  appId: "1:930902263257:web:829b55cf61609d8bda45c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;