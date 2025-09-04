import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import {
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence
} from "firebase/auth";

export default function EmailLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) return alert("Complete all fields");

    try {
      await setPersistence(auth, browserLocalPersistence);
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/welcome"); // redirige al usuario autenticado
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err);
        alert(err.message);
      } else {
        console.error("Unexpected error:", err);
        alert("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Login
      </button>
      <button
        onClick={() => navigate("/register")}
        className="text-sm text-blue-600 underline mt-2"
      >
        Don't have an account? Register
      </button>
    </div>
  );
}
