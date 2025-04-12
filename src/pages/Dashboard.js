import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function Dashboard({ token, onLogout }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    try {
      if (!token) {
        console.warn("No hay token disponible, cancelando fetch.");
        return;
      }

      const data = await getUsers(token);
      console.log("Usuarios desde la API:", data);
      setUsers(data.users || data);
    } catch (error) {
      console.error("Error al obtener usuarios:", error);
    }
  };

  useEffect(() => {
    console.log("Token recibido:", token);
    fetchUsers();
  }, [token]);

  const handleCreate = async (userData) => {
    await createUser(userData, token);
    fetchUsers();
  };

  const handleUpdate = async (userData) => {
    await updateUser(editingUser.id, userData, token);
    setEditingUser(null);
    fetchUsers();
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este usuario?')) {
      await deleteUser(id, token);
      fetchUsers();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    onLogout(); // Limpia el token en App
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>BIENVENIDO</h2>
        <h2> EXAMEN - CRUD DE USUARIOS</h2>
        <button className="btn btn-danger" onClick={handleLogout}>Cerrar sesión</button>
      </div>

      <div className="card p-4 shadow">
        <h4 className="mb-4">{editingUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}</h4>
        <UserForm
          onSubmit={editingUser ? handleUpdate : handleCreate}
          initialData={editingUser}
          isEditing={!!editingUser}
        />
      </div>

      <div className="mt-4">
        <h4>Usuarios</h4>
        <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
      </div>
    </div>
  );
}
