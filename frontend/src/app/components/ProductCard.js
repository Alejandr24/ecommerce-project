import React from 'react';

export default function ProductCard({ product, onAddToCart, isAdmin = false, onEdit, onDelete }) {
  return (
    <div className="border rounded p-4 shadow bg-white flex flex-col justify-between">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-40 object-cover rounded mb-2"
      />
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p className="text-gray-600">{product.description}</p>
      <p className="font-semibold mt-1">${product.price}</p>

      <div className="flex gap-2 mt-4">
        {isAdmin ? (
          <>
            <button
              onClick={() => onEdit(product)}
              className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
            >
              Editar
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
            >
              Eliminar
            </button>
          </>
        ) : (
          <button
            onClick={() => onAddToCart(product)}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Agregar al carrito
          </button>
        )}
      </div>
    </div>
  );
}
