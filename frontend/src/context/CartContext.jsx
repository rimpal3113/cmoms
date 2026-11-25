
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Add Item
  const addToCart = (item) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existing) {
        return prev.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item._id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item._id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Item
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item._id !== id)
    );
  };


  // Clear Cart
const clearCart = () => {
  setCartItems([]);
};
  // Total Amount
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Total Quantity
  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );



  
  return (
    <CartContext.Provider
     value={{
  cartItems,
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
  totalAmount,
  totalQuantity,
  clearCart,
}}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
