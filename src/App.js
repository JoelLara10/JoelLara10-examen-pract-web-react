import { useState, useEffect } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(() => localStorage.getItem('token'));

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    }
  }, [token]);

  return (
    <div className="App">
      {!token
        ? <Login onLogin={setToken} />
        : <Dashboard token={token} onLogout={() => setToken(null)} />
      }
    </div>
  );
}

export default App;
