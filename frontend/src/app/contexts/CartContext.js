"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "./AuthContext";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user, token } = useAuth();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // Cargar carrito desde backend cuando usuario cambia o inicia sesión
  useEffect(() => {
    if (!user) {
      setCartItems([]);
      return;
    }

    const fetchCart = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3001/api/cart", {
          headers: { Authorization: token },
        });
        // Guardamos solo los items
        setCartItems(res.data.items || []);
      } catch (error) {
        console.error("Error al cargar carrito:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user]);

  // Agregar producto al carrito (backend + estado local)
  const addToCart = async (productId, quantity = 1) => {
    if (!user) return;

    try {
      await axios.post(
        "http://localhost:3001/api/cart/add",
        { product_id: productId, quantity },
        { headers: { Authorization: token } }
      );

      // Recargar el carrito desde backend para tener datos actualizados (precio, nombre, etc)
      const res = await axios.get("http://localhost:3001/api/cart", {
        headers: { Authorization: token },
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  // Eliminar producto del carrito
  const removeFromCart = async (productId) => {
    if (!user) return;

    try {
      await axios.delete(`http://localhost:3001/api/cart/remove/${productId}`, {
        headers: { Authorization: token },
      });

      // Recargar el carrito actualizado
      const res = await axios.get("http://localhost:3001/api/cart", {
        headers: { Authorization: token },
      });
      setCartItems(res.data.items || []);
    } catch (error) {
      console.error("Error al eliminar del carrito:", error);
    }
  };

  // Calcular total acumulado (parseamos price porque viene como string)
  const total = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.price);
    return sum + (isNaN(price) ? 0 : price * item.quantity);
  }, 0);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, total, loading }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

