import Login from './components/Login';
import Home from './components/Home';
import { useEffect, useState } from 'react';

function App() {
  localStorage.clear();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  let message = (newMessage) => {
    console.log(newMessage);
    setIsAuthenticated(newMessage);
  };

  const checkToken = () => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  };
  useEffect(() => {
    checkToken();
  }, []);
  return (
    <div>
      {isAuthenticated ? <Home onMessageLogoff={message} /> : <Login onMessageLogin={message} />}
    </div>
  );
}

export default App;
