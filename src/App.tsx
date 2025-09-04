import './App.css'
import RegisterUser from './Components/RegisterUser';
import PinLogin from './Components/PinLogin';
import LogoutButton from './Components/LogoutButton';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState<"login" | "register" | "welcome">("login");

  const handleLogout = () => setScreen("login");

  return (
    <div className="p-6">
      {screen === "login" && <PinLogin onSuccess={() => setScreen("welcome")} onGoRegister={() => setScreen("register")} />}
      {screen === "register" && <RegisterUser onSuccess={() => setScreen("login")} />}
      {screen === "welcome" && (
        <>
          <h1 className="text-xl font-bold mb-4">Bienvenido 🎉</h1>
          <LogoutButton onLogout={handleLogout} />
        </>
      )}
    </div>
  )
}

export default App;
