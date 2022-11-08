// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD3Uds92ti8V9QlCqzETOhPyu9Fld6J4nE",
  authDomain: "acebook-119fc.firebaseapp.com",
  projectId: "acebook-119fc",
  storageBucket: "acebook-119fc.appspot.com",
  messagingSenderId: "733788077424",
  appId: "1:733788077424:web:c62361ad431108ae83a3b5",
  measurementId: "G-55BTF2J1LP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);
