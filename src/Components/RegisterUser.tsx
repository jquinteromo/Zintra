import { useState } from "react";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

type Props = {
  onSuccess: () => void;
};

export default function RegisterUser({ onSuccess }: Props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const generatePin = () => Math.floor(100000 + Math.random() * 900000).toString();

  const handleRegister = async () => {
    if (!name || !email || !password) return alert("Completa todos los campos");

  try {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  const pin = generatePin();

  await setDoc(doc(db, "users", userCred.user.uid), {
    nombre: name,
    email,
    pin,
    createdAt: new Date(),
  });

  alert(`Usuario registrado con éxito. Tu PIN: ${pin}`);
  onSuccess();
} catch (err: unknown) {
  if (err instanceof Error) {
    alert(err.message);
  } else {
    alert("Ocurrió un error desconocido");
  }
}
  };

  return (
    <div className="flex flex-col gap-4 items-center p-6">
      <input type="text" placeholder="Nombre" value={name} onChange={e => setName(e.target.value)} className="border p-2 rounded w-64" />
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded w-64" />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded w-64" />
      <button onClick={handleRegister} className="bg-green-500 text-white px-4 py-2 rounded">Registrar</button>
    </div>
  );
}
