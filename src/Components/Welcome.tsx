import { useEffect, useState } from "react";
import { auth } from "../firebase";

type Props = {
  onLogout: () => void;
};

export default function Welcome({ onLogout }: Props) {
  const [user, setUser] = useState(auth.currentUser); // puede ser null al inicio
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false); // dejamos de mostrar "cargando"
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await auth.signOut();
    onLogout();
  };

  if (loading) return <p>Cargando...</p>; // mientras Firebase revisa la sesión

  if (!user) return <p>No estás autenticado</p>;

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="text-lg font-bold">Welcome {user.email}!</p>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
