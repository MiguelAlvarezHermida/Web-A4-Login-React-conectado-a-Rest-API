import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      {isLogged && <Navbar setIsLogged={setIsLogged} />}

      <Routes>
        <Route path="/" element={<Login setIsLogged={setIsLogged} setCurrentUser={setCurrentUser} />} />
        <Route path="/home" element={<Home currentUser={currentUser} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;

