import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ItemProvider } from "./Components/ItemContext";

ReactDOM.render(
  <React.StrictMode>
    <ItemProvider>
      <App />
    </ItemProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
