import { useState, useEffect } from "react";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

import RegisterUser from "./Components/RegisterUser";
import LoginUser from "./Components/LoginUser";
import Home from "./Components/Home";

export default function App() {
  const [screen, setScreen] = useState<"register" | "login" | "home">("login");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async user => {
      if (user) {
        const snap = await getDoc(doc(db, "users", user.uid));
        if (snap.exists()) setUserName(snap.data().nombre);
        setScreen("home");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {screen === "register" && <RegisterUser onSuccess={() => setScreen("login")} />}
      {screen === "login" && <LoginUser onSuccess={() => setScreen("home")} onGoRegister={() => setScreen("register")} />}
      {screen === "home" && <Home userName={userName} onLogout={() => setScreen("login")} />}
    </div>
  );
}
