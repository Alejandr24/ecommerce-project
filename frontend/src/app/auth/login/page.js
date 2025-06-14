"use client";
import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.username || !form.password) {
      setError("Todos los campos son obligatorios.");
      return;
    }
    setLoading(true);
    try {
      await login({ username: form.username, password: form.password });
      // El contexto redirige al home tras login
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Iniciar Sesión</h2>
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
            autoComplete="current-password"
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Ingresando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}