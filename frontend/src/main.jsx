import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Header from "./components/Header.jsx";
import { RecoilRoot } from "recoil";
import { CartProvider } from "./context/cartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <CartProvider>
        <BrowserRouter>
          <Header />
          <App />
        </BrowserRouter>
      </CartProvider>
    </RecoilRoot>
  </React.StrictMode>
);
