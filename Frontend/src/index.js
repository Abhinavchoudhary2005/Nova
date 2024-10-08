import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ShopContextProvider } from "./Components/Context/ShopContext.jsx";
import { CartContextProvider } from "./Components/Context/CartContex.jsx";
import { UserContextProvider } from "./Components/Context/UserContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
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
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
