export default function UserList({ users, onEdit, onDelete }) {
  return (
    <div>
      <h3>Usuarios</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> - {user.email}
            <button onClick={() => onEdit(user)}>Editar</button>
            <button onClick={() => onDelete(user.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
