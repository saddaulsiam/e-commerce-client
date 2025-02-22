import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCeF3qLNAJaRQNJibNJ797y9wFbQleLnJo",
  authDomain: "siam-store24.firebaseapp.com",
  projectId: "siam-store24",
  storageBucket: "siam-store24.firebasestorage.app",
  messagingSenderId: "677862796216",
  appId: "1:677862796216:web:9c114b717d29de9c5abd4d",
  measurementId: "G-EFZSP2Z0L5"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
