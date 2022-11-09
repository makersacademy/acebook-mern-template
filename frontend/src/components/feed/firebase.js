// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm-RMnXkbcd79sRcJo1z93y4to2QXhBZ0",
  authDomain: "the-incredibles-da606.firebaseapp.com",
  projectId: "the-incredibles-da606",
  storageBucket: "the-incredibles-da606.appspot.com",
  messagingSenderId: "830048380837",
  appId: "1:830048380837:web:a9335c98d4bcee133f2a4c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);