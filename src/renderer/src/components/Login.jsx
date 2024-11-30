import '../assets/login.css';
import LoginPng from '../icons/login-da-conta.png';

function Login() {
  return (
    <div className="div">
      <h1>Farmnext</h1>
      <form className="form">
        <img src={LoginPng} alt="img" />
        <div className="div-form">
          <input type="text" placeholder="Usuário" />
          <input type="password" placeholder="Senha" />
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
