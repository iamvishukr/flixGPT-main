// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhSaEGTfwF0muqGV0txHHowBjI2HnVcxY",
  authDomain: "flixgpt-50f75.firebaseapp.com",
  projectId: "flixgpt-50f75",
  storageBucket: "flixgpt-50f75.appspot.com",
  messagingSenderId: "21020769583",
  appId: "1:21020769583:web:5f47a571a54d6d59f335da",
  measurementId: "G-BM3WKVG1TL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =  getAuth();
const analytics = getAnalytics(app);