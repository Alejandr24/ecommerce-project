"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function RegisterPage() {
  const { register } = useAuth();

  const [form, setForm] = useState({ username: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validación básica
    if (!form.username || !form.password || !form.confirmPassword) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    try {
      await register({ username: form.username, password: form.password });
      // El contexto ya redirige al login o home tras registro y login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Registro</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block font-semibold mb-1">Usuario</label>
          <input
            type="text"
            id="username"
            name="username"
            value={form.username}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            autoComplete="username"
          />
        </div>
        <div>
          <label htmlFor="password" className="block font-semibold mb-1">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            autoComplete="new-password"
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">Confirmar Contraseña</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            autoComplete="new-password"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
}
