import './App.css'
import PhoneLogin from './Components/PhoneLogin';
import RegisterUser from './Components/RegisterUser';
import PinLogin from './Components/PinLogin';
import { useState } from 'react';

function App() {

    const [screen, setScreen] = useState("phone"); 
  return (
   <div className="p-6">
      {screen === "phone" && <PhoneLogin onSuccess={() => setScreen("register")} />}
      {screen === "register" && <RegisterUser onSuccess={() => setScreen("pin")} />}
      {screen === "pin" && <PinLogin />}
    </div>
  )
}

export default App
