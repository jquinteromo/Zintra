import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const ref = doc(db, "users", firebaseUser.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
       
          setIsNewUser(false);
        } else {
          
          setIsNewUser(true);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe(); 
  }, []);

  const saveUser = async () => {
    if (!user) {
      alert("No hay usuario autenticado");
      return;
    }

    if (!name || !pin) {
      alert("Completa todos los campos");
      return;
    }

    try {
      await setDoc(doc(db, "users", user.uid), {
        nombre: name,
        pin: pin,
        phone: user.phoneNumber,
        createdAt: new Date(),
      });
      alert("Usuario registrado con éxito");
      setIsNewUser(false);
    } catch (err) {
      console.error(err);
      alert("Error guardando usuario");
    }
  };

  if (loading) return <p>Cargando...</p>;

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {isNewUser ? (
        <>
          <input
            type="text"
            placeholder="Tu nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <input
            type="password"
            placeholder="Elige un PIN"
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={saveUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </>
      ) : (
        <p>Ya tienes cuenta, bienvenido {user?.phoneNumber}</p>
      )}
    </div>
  );
}
