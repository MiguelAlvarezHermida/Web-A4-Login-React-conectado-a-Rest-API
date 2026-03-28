import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { useState } from "react";

function App() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <Router>
      {isLogged && <Navbar />}

      <Routes>
        <Route path="/" element={<Login setIsLogged={setIsLogged} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;

