// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAMTaGXPHpw4XrmA3xm587YrfC6S4okXxI",
  authDomain: "login-page-6bd34.firebaseapp.com",
  projectId: "login-page-6bd34",
  storageBucket: "login-page-6bd34.appspot.com",
  messagingSenderId: "1044439340948",
  appId: "1:1044439340948:web:d20cb47b4e4d71bd79e181",
  measurementId: "G-S9PJQ3BSWC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);