import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ShopContextProvider } from "./Components/Context/ShopContext.jsx";
import { CartContextProvider } from "./Components/Context/CartContex.jsx";
import { ToastContainer } from "react-toastify";

ReactDOM.render(
  <React.StrictMode>
    <ShopContextProvider>
      <CartContextProvider>
        <App />
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          draggable
          pauseOnHover={false}
          theme="light"
        />
      </CartContextProvider>
    </ShopContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
