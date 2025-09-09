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
        setLoading(false);
        return;
      }

      try {
        const userRef = doc(db, "users", firebaseUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const data = userSnap.data();
          setUser({
            nombre: data.nombre ?? "Usuario",
            email: data.email ?? "desconocido@example.com",
            photoURL: data.photoURL ?? null,
            createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
            verificado:data.verificado ?? null,
            description : data.description ?? ""
          });
        } else {
          setUser({
            nombre: "Usuario",
            email: "desconocido@example.com",
            photoURL: null,
            createdAt: new Date(),
           verificado: null, 
           description :""
          });
        }
      } catch (error) {
        console.error("Error al cargar datos del usuario:", error);
        setUser({ nombre: "Usuario", photoURL: null,verificado:null,description :"" });
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);



  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return <p>No estás autenticado</p>;
  }

  return (
    <div className="flex flex-row w-full bg-black">
      <Sidebar/>
      <ChatWindow />

    </div>
  );
}
