import PrivateRoute from "./PrivateRoute";
import "./App.css";
import EmailLogin from "./Components/EmailLogin";
import RegisterUser from "./Components/RegisterUser";
import Welcome from "./Components/Welcome";
import SessionGuard from "./SessionGuard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <SessionGuard /> {/* Este redirige según el estado de sesión */}
      <div className="p-6">
        <Routes>
          <Route path="/login" element={<EmailLogin />} />
          <Route path="/register" element={<RegisterUser />} />
          <Route
            path="/welcome"
            element={
              <PrivateRoute>
                <Welcome />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
