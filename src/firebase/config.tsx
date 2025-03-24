import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBf_WfHYSQ5p5FvE9kp9Ss3TeCJeW5inJ0",
    authDomain: "testproject-2b9f3.firebaseapp.com",
    projectId: "testproject-2b9f3",
    storageBucket: "testproject-2b9f3.firebasestorage.app",
    messagingSenderId: "896348770182",
    appId: "1:896348770182:web:50ff449540f08b4385a607",
    measurementId: "G-Z84XQQCPJ8"
};

// Initialize Firebase
initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore();

export { db };