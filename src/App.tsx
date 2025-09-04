import './App.css';
import EmailLogin from './Components/EmailLogin';
import RegisterUser from './Components/RegisterUser';
import PinLogin from './Components/PinLogin';
import { useState } from 'react';
import { auth } from './firebase'; // asegúrate que la ruta sea correcta


function App() {
  const [screen, setScreen] = useState("email"); // empezamos por email

  return (
    <div className="p-6">
      {screen === "email" && <EmailLogin onSuccess={() => setScreen("register")} />}
      {screen === "register" && <RegisterUser onSuccess={() => setScreen("pin")} />}
      {screen === "pin" && (
        <PinLogin
          onSuccess={() => setScreen("welcome")}
          onGoRegister={() => setScreen("register")}
        />
      )}
      {screen === "welcome" && (
        <div className="flex flex-col items-center gap-4">
          <p className="text-lg font-bold">Bienvenido 🎉</p>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={async () => {
              await auth.signOut();
              setScreen("email");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      )}
    </div>
  );
}

export default App;

