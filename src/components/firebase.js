// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: env.apiKey,
  authDomain:env.authDomain,
  projectId: env.projectId,
  storageBucket: env.storageBucket,
  messagingSenderId: env.messagingSenderId,
  appId: env.appId
};

const app = initializeApp(firebaseConfig);

export const auth=getAuth();
export default app;