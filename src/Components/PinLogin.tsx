import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

interface Props {
  onSuccess: () => void;
  onGoRegister: () => void;
}

interface UserData {
  nombre: string;
  pin: string;
}

export default function PinLogin({ onSuccess, onGoRegister }: Props) {
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);

  const loginWithPin = async () => {
    if (!auth.currentUser) return alert("Debes iniciar sesión primero");

    setLoading(true);
    try {
      const ref = doc(db, "users", auth.currentUser.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        alert("No se encontró tu usuario. Regístrate primero.");
        setLoading(false);
        return;
      }

      const data = snap.data() as UserData;
      if (data.pin === pin) {
        onSuccess(); // Vamos a la pantalla de bienvenida
      } else {
        alert("PIN inválido");
      }
    } catch (err) {
      console.error("Error verificando PIN:", err);
      alert("Error buscando usuario");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="flex flex-col items-center gap-4">
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
      <button
        onClick={onGoRegister}
        className="text-sm text-blue-600 underline mt-2"
      >
        No tienes cuenta? Regístrate
      </button>
    </div>
  );
}
