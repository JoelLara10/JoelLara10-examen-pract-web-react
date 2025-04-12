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
    <form onSubmit={handleSubmit} className="card p-4 shadow-sm mb-4">
      <h3 className="mb-4 text-center">{isEditing ? 'Editar usuario' : 'Crear usuario'}</h3>

      <div className="mb-3">
        <label htmlFor="name" className="form-label">Nombre</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Nombre"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email</label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="form-control"
          required
        />
      </div>

      <div className="mb-3">
        <label htmlFor="password" className="form-label">Contraseña</label>
        <input
          id="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Contraseña"
          type="password"
          className="form-control"
          required={!isEditing}
        />
      </div>

      <button type="submit" className="btn btn-primary w-100">{isEditing ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
}
