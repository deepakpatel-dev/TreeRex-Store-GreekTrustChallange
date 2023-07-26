import React, { createContext, useState, useContext } from "react";

const ItemContext = createContext();

export function useItemContext() {
  return useContext(ItemContext);
}

export function ItemProvider({ children }) {
  const [filteredItems, setFilteredItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  return (
    <ItemContext.Provider
      value={{ filteredItems, setFilteredItems, cartItems, setCartItems }}
    >
      {children}
    </ItemContext.Provider>
  );
}
