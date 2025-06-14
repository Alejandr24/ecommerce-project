"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "../../components/ProductForm";
import ProtectedRoute from "../../components/ProtectedRoute";

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([]);
  const [editing, setEditing] = useState(null);

  const fetchProducts = async () => {
    const { data } = await axios.get("http://localhost:3001/api/products");
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");
    return { Authorization: token };
  };

  const handleCreate = async (productData) => {
    try {
      await axios.post("http://localhost:3001/api/products", productData, {
        headers: getAuthHeaders(),
      });
      fetchProducts();
    } catch (err) {
      console.error("Error al crear producto:", err.response?.data || err.message);
    }
  };

  const handleUpdate = async (productData) => {
    try {
      await axios.put(
        `http://localhost:3001/api/products/${editing.id}`,
        productData,
        {
          headers: getAuthHeaders(),
        }
      );
      setEditing(null);
      fetchProducts();
    } catch (err) {
      console.error("Error al actualizar producto:", err.response?.data || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`, {
        headers: getAuthHeaders(),
      });
      fetchProducts();
    } catch (err) {
      console.error("Error al eliminar producto:", err.response?.data || err.message);
    }
  };

  return (
    <ProtectedRoute role="admin">
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Administrar Productos</h1>

        <ProductForm
          onSubmit={editing ? handleUpdate : handleCreate}
          initialData={editing}
          isEditing={!!editing}
        />

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="border p-4 rounded shadow">
              <img
                src={product.image}
                alt={product.name}
                className="h-40 w-full object-cover"
              />
              <h2 className="font-bold">{product.name}</h2>
              <p>{product.description}</p>
              <p className="font-semibold">${product.price}</p>
              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => setEditing(product)}
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
