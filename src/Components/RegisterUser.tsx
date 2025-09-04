import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; 
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";

type Props = {
  onSuccess: () => void;
};

export default function RegisterUser({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [isNewUser, setIsNewUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [generatedPin, setGeneratedPin] = useState("");

  // Función para generar un PIN aleatorio de 6 dígitos
  const generatePin = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const ref = doc(db, "users", firebaseUser.uid);
          const snap = await getDoc(ref);

          if (snap.exists()) {
            setIsNewUser(false);
          } else {
            setIsNewUser(true);
            const newPin = generatePin();
            setGeneratedPin(newPin);
          }
        } catch (err) {
          console.error("Error leyendo Firestore:", err);
          setIsNewUser(true);
        }
      }

      setLoading(false); 
    });

    return () => unsubscribe();
  }, []);

  const saveUser = async () => {
    if (!user) return alert("No hay usuario autenticado");
    if (!name) return alert("Completa tu nombre");

    try {
      await setDoc(doc(db, "users", user.uid), {
        nombre: name,
        pin: generatedPin,
        email: user.email,
        createdAt: new Date(),
      });
      setIsNewUser(false);
      onSuccess();
      alert(`Usuario registrado con éxito. Tu PIN es: ${generatedPin}`);
    } catch (err) {
      console.error("Error guardando usuario:", err);
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
          <p>Tu PIN será generado automáticamente al registrarte</p>
          <button
            onClick={saveUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Guardar
          </button>
        </>
      ) : (
        <p>Ya tienes cuenta, bienvenido {user?.email}</p>
      )}
    </div>
  );
}
