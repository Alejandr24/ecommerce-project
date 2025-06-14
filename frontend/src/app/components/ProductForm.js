// components/ProductForm.js
"use client";
import { useState, useEffect } from 'react';

export default function ProductForm({ onSubmit, initialData = {}, isEditing = false }) {
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (isEditing && initialData) {
      setForm(initialData);
    }
  }, [initialData, isEditing]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validaciones simples
    if (!form.name || !form.description || !form.price || !form.image) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (isNaN(parseFloat(form.price))) {
      setError("El precio debe ser un número.");
      return;
    }

    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="price" placeholder="Precio" value={form.price} onChange={handleChange} className="w-full border p-2 rounded" />
      <input name="image" placeholder="URL Imagen" value={form.image} onChange={handleChange} className="w-full border p-2 rounded" />
      {error && <p className="text-red-500">{error}</p>}
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        {isEditing ? "Actualizar" : "Crear"}
      </button>
    </form>
  );
}
