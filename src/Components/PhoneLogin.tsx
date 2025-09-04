import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { useState, useEffect } from "react";
import { auth } from "../firebase";
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  type ConfirmationResult,
  type User,
} from "firebase/auth";

declare global {
  interface Window {
    recaptchaVerifier: RecaptchaVerifier;
    recaptchaWidgetId: string;
  }
}

declare const grecaptcha: {
  reset: (widgetId: string) => void;
};

type Props = {
  onSuccess: () => void;
};

export default function PhoneLogin({ onSuccess }: Props) {
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [user, setUser] = useState<User | null>(null);

  
  useEffect(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "invisible",
          callback: () => console.log("reCAPTCHA verificado"),
        }
      );

  
      window.recaptchaVerifier.render().then((widgetId: number) => {
        window.recaptchaWidgetId = widgetId.toString();
      });
    }
  }, []);

  const sendCode = async () => {
    try {
      const confirmation = await signInWithPhoneNumber(
        auth,
        phone,
        window.recaptchaVerifier
      );
      setConfirmationResult(confirmation);
      alert("SMS enviado!");
    } catch (err) {
      console.error("Firebase error:", err);

     
      if (window.recaptchaWidgetId) {
        grecaptcha.reset(window.recaptchaWidgetId);
      }

      alert("Error enviando SMS, intenta de nuevo.");
    }
  };

  const verifyCode = async () => {
    if (!confirmationResult) {
      alert("Primero envía el código por SMS");
      return;
    }
    try {
      const result = await confirmationResult.confirm(code);
      setUser(result.user);
      onSuccess(); 
      alert("Login exitoso");
    } catch (err) {
      console.error(err);
      alert("Código inválido");
    }
  };

  return (
    <div className="p-6 flex flex-col items-center gap-4">
      {!user ? (
        <>
          <PhoneInput
            country={"co"}
            value={phone}
            onChange={(value) => setPhone("+" + value)}
          />

          <button
            onClick={sendCode}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Enviar código
          </button>

          {confirmationResult && (
            <>
              <input
                type="text"
                placeholder="Código SMS"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="border p-2 rounded w-64"
              />
              <button
                onClick={verifyCode}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Verificar
              </button>
            </>
          )}

          <div id="recaptcha-container"></div>
        </>
      ) : (
        <p>Bienvenido, UID: {user.uid}</p>
      )}
    </div>
  );
}
