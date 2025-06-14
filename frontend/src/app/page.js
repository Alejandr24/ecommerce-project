"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./components/ProductCard";
import { useAuth } from "./contexts/AuthContext";

export default function HomePage() {
  const { token } = useAuth();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const PRODUCTS_PER_PAGE = 10;

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
      await axios.post(
        "http://localhost:3001/api/cart/add",
        { product_id: product.id, quantity: 1 },
        { headers: { Authorization: token } }
      );
      alert(`Producto "${product.name}" agregado al carrito`);
    } catch (err) {
      alert("Error al agregar al carrito");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Productos disponibles</h1>

      <input
        type="text"
        placeholder="Buscar por nombre o categoría..."
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => {
          setPage(1); // resetear página al buscar
          setSearch(e.target.value);
        }}
      />

      {loading && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && <p>No se encontraron productos.</p>}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span className="px-3 py-1">
            {page} / {totalPages}
          </span>
          <button
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
}
