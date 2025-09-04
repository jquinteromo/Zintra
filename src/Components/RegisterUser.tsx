import { useState, useEffect } from "react";
import { auth, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, type User } from "firebase/auth";

type Props = { onSuccess: () => void };

export default function RegisterUser({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);
  const [generatedPin, setGeneratedPin] = useState("");

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser) {
        setIsNewUser(true);
        setGeneratedPin(generatePin());
        return;
      }
      const snap = await getDoc(doc(db, "users", firebaseUser.uid));
      setIsNewUser(!snap.exists());
      if (!snap.exists()) setGeneratedPin(generatePin());
    });

    return () => unsubscribe();
  }, []);

  const saveUser = async () => {
    if (!user) return alert("Debes iniciar sesión primero");
    if (!name) return alert("Completa tu nombre");

    await setDoc(doc(db, "users", user.uid), {
      nombre: name,
      pin: generatedPin,
      email: user.email,
      createdAt: new Date(),
    });

    alert(`Usuario registrado! Tu PIN es ${generatedPin}`);
    onSuccess();
  };

  return (
    <div className="flex flex-col items-center gap-4">
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
          <button onClick={saveUser} className="bg-green-500 text-white px-4 py-2 rounded">
            Guardar
          </button>
        </>
      ) : (
        <p>Ya tienes cuenta, {user?.email}</p>
      )}
    </div>
  );
}
