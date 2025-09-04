import './App.css';
import EmailLogin from './Components/EmailLogin';
import RegisterUser from './Components/RegisterUser';
import Welcome from './Components/Welcome';
import { useState } from 'react';

function App() {
  const [screen, setScreen] = useState<'login' | 'register' | 'welcome'>('register');

  return (
    <div className="p-6">
      {screen === 'login' && <EmailLogin onSuccess={() => setScreen('welcome')} onGoRegister={() => setScreen('register')} />}
      {screen === 'register' && <RegisterUser onSuccess={() => setScreen('login')} />}
      {screen === 'welcome' && <Welcome onLogout={() => setScreen('login')} />}
    </div>
  );
}

export default App;
