import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Estos datos los sacas de la Consola de Firebase > Configuración del proyecto
const firebaseConfig = {
  apiKey: "AIzaSyBysuEINR2U3VffNfQW5VVNPiqC5_IvRwQ",
  authDomain: "ricota-a3eca.firebaseapp.com",
  projectId: "ricota-a3eca",
  storageBucket: "ricota-a3eca.firebasestorage.app",
  messagingSenderId: "231445083316",
  appId: "1:231445083316:web:e9110216401db8eba8d3e1"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); // Exportamos 'db' para usarlo en App.jsx