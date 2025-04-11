import { useEffect, useState } from 'react';
import { getUsers } from '../api';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token'); // Asegúrate de que existe
    if (!token) {
      console.error("No hay token");
      return;
    }

    getUsers(token)
      .then(setUsers)
      .catch((err) => {
        console.error("Error al obtener usuarios:", err);
      });
  }, []);

  return (
    <div>
      <h1>Usuarios</h1>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
