import { useState, useEffect } from 'react';

export default function UserForm({ onSubmit, initialData = {}, isEditing }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        name: initialData.name || '',
        email: initialData.email || '',
        password: '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    if (!isEditing) {
      setForm({ name: '', email: '', password: '' });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{isEditing ? 'Editar usuario' : 'Crear usuario'}</h3>
      <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required />
      <input name="email" value={form.email} onChange={handleChange} placeholder="Email" required />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Password" type="password" required={!isEditing} />
      <button type="submit">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}
