"use client";
import Link from 'next/link';
import { useAuth } from '../contexts/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Link href="/" className="hover:underline">
          Inicio
        </Link>
        {user && (
          <Link href="/cart" className="hover:underline">
            Carrito
          </Link>
        )}
        {user?.role === 'admin' && (
          <Link href="/admin/products" className="hover:underline">
            Productos
          </Link>
        )}
      </div>
      <div className="flex gap-4 items-center">
        {user ? (
          <>
            <span>{user.username}</span>
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

