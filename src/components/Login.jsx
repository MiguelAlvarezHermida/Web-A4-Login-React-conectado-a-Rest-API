import { TextField, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login({ setIsLogged }) {
  const navigate = useNavigate();

  const [user, setUser] = useState("");
  const [pass, setPass] = useState("");

  const handleLogin = () => {
    if (user && pass) {
      setIsLogged(true);
      navigate("/home");
    }
  };

  return (
    <Container>
      <h2>Login</h2>

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
