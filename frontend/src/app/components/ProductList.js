import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import ProductForm from './ProductForm';

export default function ProductList() {
  const { token } = useAuth();
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await axios.get('http://localhost:3001/api/products');
      setProducts(res.data);
      setLoading(false);
    } catch (err) {
      setError('Error al cargar productos.');
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo(0, 0); // Subir al formulario
  };

  const handleDelete = async (id) => {
    if (!confirm('¿Seguro que deseas eliminar este producto?')) return;

    try {
      await axios.delete(`http://localhost:3001/api/products/${id}`, {
        headers: { Authorization: token },
      });
      fetchProducts();
    } catch (err) {
      setError('Error al eliminar el producto.');
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="space-y-4">
      {editingProduct && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Editar producto</h2>
          <ProductForm editingProduct={editingProduct} onSaved={fetchProducts} />
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Lista de productos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-white shadow rounded p-4 flex flex-col justify-between"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-40 object-cover rounded mb-2"
            />
            <h3 className="text-lg font-bold">{product.name}</h3>
            <p className="text-gray-600">{product.description}</p>
            <p className="font-semibold mt-1">${product.price}</p>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
