import { useState, useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface UserData {
  nombre: string;
  pin: string;
  phone?: string;
}

export default function PinLogin() {
  const [pin, setPin] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Espera a que el usuario esté autenticado
    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        try {
          const ref = doc(db, "users", currentUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            setUserData(snap.data() as UserData);
          } else {
            setUserData(null);
          }
        } catch (err) {
          console.error("Error leyendo Firestore:", err);
          alert("Error accediendo a tus datos");
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const loginWithPin = async () => {
    if (!auth.currentUser) {
      alert("Debes iniciar sesión primero");
      return;
    }

    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("No se encontró tu usuario. Regístrate primero.");
        return;
      }

      const data = snap.data() as UserData;
      if (data.pin === pin) {
        setUserData(data);
        alert(`Bienvenido ${data.nombre}`);
      } else {
        alert("PIN inválido");
      }
    } catch (err) {
      console.error("Error verificando PIN:", err);
      alert("Error buscando usuario");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {!userData ? (
        <>
          <input
            type="password"
            placeholder="Ingresa tu PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={loginWithPin}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Entrar
          </button>
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg font-bold">Bienvenido {userData.nombre}</p>
          <p>Tu sesión está activa 🎉</p>
        </div>
      )}
    </div>
  );
}
