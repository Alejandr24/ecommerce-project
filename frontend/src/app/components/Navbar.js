"use client";
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-700 text-white px-6 py-4 flex justify-between items-center font-semibold shadow-md">
    <div className="flex items-center gap-6 text-lg">
      <Link href="/" className="hover:underline">
        Inicio
      </Link>
    </div>

    <div className="flex items-center gap-6 text-sm">
      {user && (
        <>
          {user.role === 'admin' && (
            <Link href="/admin/products" className="hover:underline">
              Productos
            </Link>
          )}
          <Link href="/cart" className="hover:underline">
            Carrito
          </Link>
        </>
      )}

      <div className="border-l border-white h-6 mx-2" />

      {user ? (
        <>
          <span className="font-medium">{user.username}</span>
          <button
            onClick={logout}
            className="text-red-200 hover:text-red-400 transition"
          >
            Cerrar sesión
          </button>
        </>
      ) : (
        <>
          <Link href="/auth/login" className="hover:underline">
            Iniciar sesión
          </Link>
          <Link href="/auth/register" className="hover:underline">
            Registrarse
          </Link>
        </>
      )}
    </div>
  </nav>

  );
};

export default Navbar;

