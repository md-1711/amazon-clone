import React, { createContext, useContext, useReducer } from "react";

// Initial cart state
const initialState = {
  cart: [],
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((_, i) => i !== action.index),
      };
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Hook to use the cart context
export const useCart = () => useContext(CartContext);

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={{ cart: state.cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};
