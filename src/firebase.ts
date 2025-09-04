import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3htHJgS2hZREKLF3u-sHqo3xFw2BsHQc",
  authDomain: "zintra-22851.firebaseapp.com",
  projectId: "zintra-22851",
  storageBucket: "zintra-22851.firebasestorage.app",
  messagingSenderId: "831109390081",
  appId: "1:831109390081:web:810668b15271b4536e8500"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

// Forzar persistencia local para que la sesión se mantenga al cerrar el navegador
setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Sesión persistente activada");
  })
  .catch((error) => {
    console.error("Error al activar persistencia:", error);
  });

export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
