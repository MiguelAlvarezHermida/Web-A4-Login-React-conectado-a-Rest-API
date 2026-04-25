import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Navbar({ setIsLogged }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLogged(false);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Web A2 Login con React y Material UI
        </Typography>
        <Button color="inherit" onClick={() => navigate("/home")}>Inicio</Button>
        <Button color="inherit" onClick={() => navigate("/users")}>Usuarios</Button>
        <Button color="inherit" onClick={handleLogout}>Cerrar sesión</Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
