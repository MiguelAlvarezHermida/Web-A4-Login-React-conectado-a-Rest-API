function Home({ currentUser }) {
  return <h1>Bienvenido a la app {currentUser?.name || "Usuario"}</h1>;
}

export default Home;
