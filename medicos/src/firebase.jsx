// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getMessaging } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyA0y8CryNIb_L0Wc7mhI7IcUNWDspQZfIg",
  authDomain: "idiot-project-dadf4.firebaseapp.com",
  projectId: "idiot-project-dadf4",
  storageBucket: "idiot-project-dadf4.firebasestorage.app",
  messagingSenderId: "630453573857",
  appId: "1:630453573857:web:a601adb88cf7b2c12ebfa0",
  measurementId: "G-4M1Q1KR679"
  };
  

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const messaging = getMessaging(app);

export { app, analytics, auth, db, messaging };
