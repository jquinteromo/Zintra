import { useState } from "react";
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

type Props = {
  onSuccess: () => void;
  onGoRegister: () => void;
};

export default function LoginUser({ onSuccess, onGoRegister }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const handleLogin = async () => {
  if (!email || !password) return alert("Completa todos los campos");

  try {
    await signInWithEmailAndPassword(auth, email, password);
    onSuccess();
  } catch (err: unknown) {
    if (err instanceof Error) {
      alert(err.message);
      console.error(err);
    } else {
      alert("Ocurrió un error desconocido");
      console.error(err);
    }
  }
};

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <input type="email" placeholder="Correo" value={email} onChange={e => setEmail(e.target.value)} className="border p-2 rounded w-64" />
      <input type="password" placeholder="Contraseña" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 rounded w-64" />
      <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Entrar</button>
      <button onClick={onGoRegister} className="text-sm text-blue-600 underline mt-2">No tienes cuenta? Regístrate</button>
    </div>
  );
}
