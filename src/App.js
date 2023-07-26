import React, { useState } from "react";
import ItemList from "./Components/ItemList";
import Header from "./Components/Header";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./styles.css";
import ShoppingCart from "./Components/ShoppingCart";
import { ItemProvider } from "./Components/ItemContext";

export default function App() {
  const [showCart, setShowCart] = useState(false);
  const theme = createTheme();

  return (
    <ItemProvider>
      <div className="App">
        <ThemeProvider theme={theme}>
          <Header setShowCart={setShowCart} />
          {showCart ? <ShoppingCart /> : <ItemList />}
        </ThemeProvider>
      </div>
    </ItemProvider>
  );
}
