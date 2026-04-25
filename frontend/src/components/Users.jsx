import {
  Container,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Alert,
} from "@mui/material";
import { useState, useEffect } from "react";

function Users() {
  const [users, setUsers] = useState([]);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:8000/users");
      const data = await res.json();
      setUsers(data);
    } catch {
      setError("No se pudo cargar la lista de usuarios");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    if (!name || !username || !password) {
      setError("Todos los campos son obligatorios");
      return;
    }
    try {
      const res = await fetch("http://localhost:8000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, username, password }),
      });
      if (!res.ok) {
        setError("Error al agregar el usuario");
        return;
      }
      setName("");
      setUsername("");
      setPassword("");
      setError("");
      fetchUsers();
    } catch {
      setError("No se pudo conectar con el servidor");
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:8000/users/${id}`, { method: "DELETE" });
      fetchUsers();
    } catch {
      setError("No se pudo eliminar el usuario");
    }
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Usuarios
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      <Paper sx={{ p: 2, mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Agregar usuario
        </Typography>
        <TextField
          label="Nombre"
          value={name}
          fullWidth
          margin="normal"
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Usuario"
          value={username}
          fullWidth
          margin="normal"
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Contraseña"
          type="password"
          value={password}
          fullWidth
          margin="normal"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant="contained" sx={{ mt: 1 }} onClick={handleAdd}>
          Agregar
        </Button>
      </Paper>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Usuario</TableCell>
              <TableCell>Creado</TableCell>
              <TableCell align="center">Eliminar</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((u) => (
              <TableRow key={u._id}>
                <TableCell>{u.name}</TableCell>
                <TableCell>{u.username}</TableCell>
                <TableCell>
                  {new Date(u.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell align="center">
                  <Button color="error" variant="outlined" size="small" onClick={() => handleDelete(u._id)}>
                    Eliminar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {users.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No hay usuarios registrados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}

export default Users;
