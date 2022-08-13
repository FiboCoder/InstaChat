// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDjaBHTb2WELmMofgDsA3N_IEl6R8q4YLA",
  authDomain: "instachat-dfd9b.firebaseapp.com",
  projectId: "instachat-dfd9b",
  storageBucket: "instachat-dfd9b.appspot.com",
  messagingSenderId: "927654007507",
  appId: "1:927654007507:web:629efcf26f15e4b0293a26",
  measurementId: "G-NVHMLFM83N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);