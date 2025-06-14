"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import { useAuth } from "./contexts/AuthContext";
import { useCart } from "./contexts/CartContext";

export default function HomePage() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PRODUCTS_PER_PAGE = 10;

  const { addToCart } = useCart();

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:3001/api/products", {
        params: { search, page },
      });

      setProducts(res.data.products || res.data);

      if (res.data.total) {
        setTotalPages(Math.ceil(res.data.total / PRODUCTS_PER_PAGE));
      } else {
        setTotalPages(1);
      }
    } catch (err) {
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [search, page]);

  const handleAddToCart = async (product) => {
    if (!token) {
      alert("Debes iniciar sesión para agregar al carrito");
      return;
    }

    try {
      await addToCart(product.id); // usa el método del contexto que ya actualiza cartItems
      alert(`Producto "${product.name}" agregado al carrito`);
    } catch (err) {
      alert("Error al agregar al carrito");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
    <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
      Productos disponibles
    </h1>

    <div className="mb-6 flex justify-center">
      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        className="w-full max-w-xl border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={search}
        onChange={(e) => {
          setPage(1);
          setSearch(e.target.value);
        }}
      />
    </div>

    {loading && <p className="text-center text-gray-500">Cargando productos...</p>}
    {error && <p className="text-center text-red-500">{error}</p>}
    {!loading && products.length === 0 && (
      <p className="text-center text-gray-500">No se encontraron productos.</p>
    )}

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-white rounded-lg shadow-md p-4 flex flex-col justify-between">
          <img
            src={product.image}
            alt={product.name}
            className="h-48 w-full object-cover rounded-md mb-4"
          />
          <div className="flex flex-col flex-grow">
            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
            <p className="text-sm text-gray-600 flex-grow">{product.description}</p>
            <p className="text-xl font-bold text-blue-600 mt-2">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition duration-200"
            >
              Agregar al carrito
            </button>
          </div>
        </div>
      ))}
    </div>

    {totalPages > 1 && (
      <div className="flex justify-center mt-10 gap-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <span className="text-lg font-medium text-gray-700">
          Página {page} de {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    )}
  </div>

  );
}
