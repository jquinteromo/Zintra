import PrivateRoute from "./PrivateRoute";
import "./App.css";
import EmailLogin from "./Components/EmailLogin";
import RegisterUser from "./Components/RegisterUser";
import Welcome from "./Components/Welcome/components/Welcome";
import SessionGuard from "./SessionGuard";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Discover from "./Components/Welcome/components/Componentssidebar/Discover";

import { StatesSidebar } from "./States/StatesSidebar";
  const {
    setShowwindow,
  } = StatesSidebar();

function App() {
  return (
    <Router>
      <div className="">
        <Routes>
          <Route path="/" element={<SessionGuard />} />
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
          <Route
            path="/DiscoverUs"
            element={
              <PrivateRoute>
                <Discover  setShowWindos={setShowwindow}/>
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
