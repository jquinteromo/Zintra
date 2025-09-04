import { useState } from "react";
import { collection, query, where, getDocs} from "firebase/firestore";
import { db } from "../firebase";

interface UserData {
  nombre: string;
  pin: string;
  phone?: string;
}

export default function PinLogin() {
  const [pin, setPin] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);

  const loginWithPin = async () => {
    try {
      const q = query(collection(db, "users"), where("pin", "==", pin));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("PIN inválido");
        return;
      }

  
      const userDoc = querySnapshot.docs[0];
      setUserData(userDoc.data() as UserData); 
    } catch (err) {
      console.error(err);
      alert("Error buscando usuario");
    }
  };

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
