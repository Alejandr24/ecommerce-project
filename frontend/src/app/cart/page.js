"use client";
import React from "react";
import { useCart } from "../contexts/CartContext";

export default function CartPage() {
  const { cartItems, removeFromCart, total, loading } = useCart();

  if (loading) return <p>Cargando carrito...</p>;
  if (!cartItems.length) return <p>Tu carrito está vacío.</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Carrito de Compras</h1>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between mb-2">
            <div>
              <p>{item.name || `Producto ${item.id}`}</p>
              <p>Cantidad: {item.quantity}</p>
              <p>Precio unitario: ${item.price || "?"}</p>
            </div>
            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-600 hover:text-red-800"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mt-6">Total: ${total.toFixed(2)}</h2>
    </div>
  );
}
