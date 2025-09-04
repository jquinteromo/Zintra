import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";

export default function SessionGuard() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigate("/welcome");
      } else {
        navigate("/login");
      }
      setChecking(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  if (checking) return <p>Cargando sesión...</p>;

  return null;
}
