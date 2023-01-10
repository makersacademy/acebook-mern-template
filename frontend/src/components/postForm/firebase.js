// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAlVNfLalFnzmCj0g_f-lH6tTezldxeQWQ",
  authDomain: "acebook-bikini-bottom.firebaseapp.com",
  projectId: "acebook-bikini-bottom",
  storageBucket: "acebook-bikini-bottom.appspot.com",
  messagingSenderId: "23234006414",
  appId: "1:23234006414:web:085b255c795bd47856a8df",
  measurementId: "G-FB1RMHRXW7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const storage = getStorage(app);