import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";
import ChatWindow from "./ChatWindow";
import Sidebar from "./Sidebar";


export default function Welcome() {
  const [user, setUser] = useState(auth.currentUser);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(firebaseUser => {
      setUser(firebaseUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    navigate("/login");
  };

  if (loading) return <p>Cargando...</p>;
  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="flex flex-col items-center gap-4">
     <div className="flex h-screen">
       <Sidebar /> 
       <ChatWindow /> 
</div>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
