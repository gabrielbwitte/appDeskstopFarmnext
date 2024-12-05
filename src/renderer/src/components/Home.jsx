// eslint-disable-next-line react/prop-types
function Home({ onMessageLogoff }) {
  const enviarMensagem = () => {
    localStorage.clear();
    const mensagem = false;
    onMessageLogoff(mensagem);
  };
  return (
    <div>
      <h1>Home Farmnext</h1>
      <button onClick={enviarMensagem}>Sair</button>
    </div>
  );
}

export default Home;
