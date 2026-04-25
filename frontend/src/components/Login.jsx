import { TextField, Button, Container, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setIsLogged, setCurrentUser }) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!user || !pass) return;
    try {
      const res = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: user, password: pass }),
      });
      const data = await res.json();
      if (data.login) {
        setCurrentUser(data.user);
        setIsLogged(true);
        navigate("/home");
      } else {
        setError("Usuario o contraseña incorrectos");
      }
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  };

  return (
    <Container>
      <h2>Login</h2>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      <TextField
        label="Usuario"
        fullWidth
        margin="normal"
        onChange={(e) => setUser(e.target.value)}
      />

      <TextField
        label="Contraseña"
        type="password"
        fullWidth
        margin="normal"
        onChange={(e) => setPass(e.target.value)}
      />

      <Button variant="contained" onClick={handleLogin}>
        Iniciar Sesión
      </Button>
    </Container>
  );
}

export default Login;
