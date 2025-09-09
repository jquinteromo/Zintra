import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";
import { useApp } from "../../../Context/AppContext";

export default function Welcome() {
  const { user, setUser } = useApp();
  const auth = getAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (!firebaseUser) {
        console.warn("No hay sesión activa");
        setLoading(false);
        return;
      }

      try {
        // 🔐 Forzar sincronización del token
        await firebaseUser.getIdToken(true);

        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            nombre: data.nombre ?? "Usuario",
            email: data.email ?? "desconocido@example.com",
            photoURL: data.photoURL ?? null,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            verificado: data.verificado ?? null,
            description: data.description ?? "",
          });
        } else {
          console.warn("Documento de usuario no encontrado");
          setUser({
            nombre: "Usuario",
            email: "desconocido@example.com",
            photoURL: null,
            createdAt: new Date(),
            verificado: null,
            description: "",
          });
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setUser({
          nombre: "Usuario",
          email: "desconocido@example.com",
          photoURL: null,
          createdAt: new Date(),
          verificado: null,
          description: "",
        });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p>Cargando sesión...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <p>No estás autenticado</p>
      </div>
    );
  }

  return (
    <div className="flex flex-row w-full bg-black">
      <Sidebar />
      <ChatWindow />
    </div>
  );
}
