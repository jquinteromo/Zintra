import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  type User
} from "firebase/auth";

type Props = {
  onSuccess: () => void;
};

export default function EmailLogin({ onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState<User | null>(null);

  const actionCodeSettings = {
    url: window.location.href,
    handleCodeInApp: true
  };

  useEffect(() => {
  
    if (isSignInWithEmailLink(auth, window.location.href)) {
      let storedEmail = window.localStorage.getItem("emailForSignIn");
      if (!storedEmail) {
        storedEmail = window.prompt("Por favor ingresa tu correo para confirmar");
      }
      if (storedEmail) {
        signInWithEmailLink(auth, storedEmail, window.location.href)
          .then((result) => {
            window.localStorage.removeItem("emailForSignIn");
            setUser(result.user);
            onSuccess();
            alert("Login exitoso");
          })
          .catch((err) => {
            console.error(err);
            alert("Error al completar el login");
          });
      }
    }
  }, [onSuccess]);

  const sendLink = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem("emailForSignIn", email);
      alert("Se envió un enlace de acceso a tu correo");
    } catch (err) {
      console.error(err);
      alert("Error enviando el enlace de acceso");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {!user ? (
        <>
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border p-2 rounded w-64"
          />
          <button
            onClick={sendLink}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enviar enlace de acceso
          </button>
        </>
      ) : (
        <p>Bienvenido, {user.email}</p>
      )}
    </div>
  );
}