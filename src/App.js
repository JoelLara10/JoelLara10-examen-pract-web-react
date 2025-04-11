import { useState } from 'react';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <div className="App">
      {!token ? <Login onLogin={setToken} /> : <Dashboard token={token} />}
    </div>
  );
}

export default App;
