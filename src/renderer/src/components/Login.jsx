import '../assets/login.css';
import LoginPng from '../icons/login-da-conta.png';
import { useRef, useState } from 'react';

// eslint-disable-next-line react/prop-types
function Login({ onMessageLogin }) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const sendMessage = () => {
    const message = true;
    onMessageLogin(message);
  };
  async function handleSubmit(event) {
    console.log('click Entrar');
    event.preventDefault();
    const dataForm = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    };
    // eslint-disable-next-line no-undef
    apiElectron.toSend(dataForm);
  }

  const [isLogin, setIsLogin] = useState('');
  // eslint-disable-next-line no-undef
  apiElectron.toReceive((event, message) => {
    console.log('Login', message);
    if (message.length > 170) {
      localStorage.setItem('token', message);
      sendMessage();
    } else {
      setIsLogin('Usuario ou senha incoretos!');
      console.log(message.message);
    }
  });

  return (
    <div className="div">
      <h1>Farmnext</h1>
      <form className="form" onSubmit={handleSubmit}>
        <img src={LoginPng} alt="img" />
        <div className="div-form">
          <input ref={emailRef} type="email" placeholder="Usuário" />
          <input ref={passwordRef} type="password" placeholder="Senha" />
          <p>{isLogin}</p>
          <button>Entrar</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
