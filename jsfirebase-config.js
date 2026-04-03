import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Substitua pelos seus dados do Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAVhQ-6C7jtZrgzibKCJurVciG5L2_zRgs",
    authDomain: "customers-3bc70.firebaseapp.com",
    projectId: "customers-3bc70",
    storageBucket: "customers-3bc70.firebasestorage.app",
    messagingSenderId: "591091207016",
    appId: "1:591091207016:web:44234d9033eb650e0d64dd",
    measurementId: "G-L1VQD35MB3"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);