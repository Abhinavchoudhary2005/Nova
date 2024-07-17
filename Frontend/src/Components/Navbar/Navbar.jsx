import React, { useState, useEffect, useContext } from "react";
import "./Navbar.css";
import logo from "../Assets/nova-logo.png";
import cartIcon from "../Assets/cart_icon.png";
import { CartContext } from "../Context/CartContex";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const { cart, triggerCartChange } = useContext(CartContext);
  const location = useLocation();

  const token = localStorage.getItem("token");

  const [menu, setMenu] = useState(
    () => localStorage.getItem("ShopMenu") || "shop"
  );
  const [cartItemCount, setCartItemCount] = useState(token ? cart.length : 0);

  useEffect(() => {
    localStorage.setItem("ShopMenu", menu);
  }, [menu]);

  useEffect(() => {
    setCartItemCount(token ? cart.length : 0);
  }, [cart, triggerCartChange, token]);

  const logout = () => {
    try {
      localStorage.removeItem("token");
      toast.success("Logged Out!");
      localStorage.removeItem("ShopMenu");
      setTimeout(() => {
        window.location.href = "/E-commerce";
      }, 1500);
    } catch {
      toast.error("Error Logging Out");
    }
  };

  return (
    <div>
      <div className="Nav">
        <Link to="/E-commerce" className="Link">
          <div className="logo-container-nav" onClick={() => setMenu("shop")}>
            <img src={logo} className="logo-nav" alt="Logo" />
          </div>
        </Link>
        <ul>
          <MenuItem
            to="/E-commerce"
            label="Shop"
            setMenu={setMenu}
            currentPath={location.pathname}
          />
          <MenuItem
            to="/E-commerce/Men"
            label="Men"
            setMenu={setMenu}
            currentPath={location.pathname}
          />
          <MenuItem
            to="/E-commerce/Women"
            label="Women"
            setMenu={setMenu}
            currentPath={location.pathname}
          />
          <MenuItem
            to="/E-commerce/Kids"
            label="Kids"
            setMenu={setMenu}
            currentPath={location.pathname}
          />
        </ul>
        <div className="login-cart">
          {token ? (
            <div className="Link">
              <button onClick={logout} className="login-btn">
                Log Out
              </button>
            </div>
          ) : (
            <Link to="/E-commerce/Login" className="Link">
              <button
                onClick={() => setMenu("login")}
                className={
                  menu === "login" ? "login-btn login-btn-clicked" : "login-btn"
                }
              >
                Login
              </button>
            </Link>
          )}
          <Link to="/E-commerce/Cart" className="Link">
            <div
              onClick={() => setMenu("cart")}
              className={menu === "cart" ? "active cart" : "cart"}
            >
              <img src={cartIcon} alt="Cart" />
              <div className="cart-num"> {token ? cartItemCount : 0} </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

const MenuItem = ({ to, label, setMenu, currentPath }) => {
  const isActive = currentPath === to;

  return (
    <Link to={to} className="Link">
      <li
        onClick={() => setMenu(label.toLowerCase())}
        className={isActive ? "active" : ""}
      >
        {label}
        {isActive && <div className="underline"></div>}
      </li>
    </Link>
  );
};
