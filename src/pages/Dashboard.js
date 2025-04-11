import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function Dashboard({ token }) {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  const fetchUsers = async () => {
    const data = await getUsers(token);
    setUsers(data.users || data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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

  return (
    <div>
      <h2>Dashboard</h2>
      <UserForm
        onSubmit={editingUser ? handleUpdate : handleCreate}
        initialData={editingUser}
        isEditing={!!editingUser}
      />
      <UserList users={users} onEdit={setEditingUser} onDelete={handleDelete} />
    </div>
  );
}
