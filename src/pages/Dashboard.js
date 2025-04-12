import { useEffect, useState } from 'react';
import { getUsers, createUser, updateUser, deleteUser } from '../api';
import UserForm from '../components/UserForm';
import UserList from '../components/UserList';

export default function Dashboard( { token, onLogout } ) {
  const [ users, setUsers ] = useState( [] );
  const [ editingUser, setEditingUser ] = useState( null );

  const fetchUsers = async () => {
    try {
      if ( !token ) {
        console.warn( "No hay token disponible, cancelando fetch." );
        return;
      }

      const data = await getUsers( token );
      console.log( "Usuarios desde la API:", data );
      setUsers( data.users || data );
    } catch ( error ) {
      console.error( "Error al obtener usuarios:", error );
    }
  };

  useEffect( () => {
    console.log( "Token recibido:", token );
    fetchUsers();
  }, [] );

  const handleCreate = async ( userData ) => {
    await createUser( userData, token );
    fetchUsers();
  };

  const handleUpdate = async ( userData ) => {
    await updateUser( editingUser.id, userData, token );
    setEditingUser( null );
    fetchUsers();
  };

  const handleDelete = async ( id ) => {
    if ( window.confirm( '¿Estás seguro de eliminar este usuario?' ) ) {
      await deleteUser( id, token );
      fetchUsers();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem( 'token' );
    onLogout(); // Limpia el token en App
  };

  return (
    <div>
      <div style={ { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }>
        <h2>Dashboard</h2>
        <button onClick={ handleLogout }>Cerrar sesión</button>
      </div>

      <UserForm
        onSubmit={ editingUser ? handleUpdate : handleCreate }
        initialData={ editingUser }
        isEditing={ !!editingUser }
      />

      <UserList users={ users } onEdit={ setEditingUser } onDelete={ handleDelete } />
    </div>
  );
}
