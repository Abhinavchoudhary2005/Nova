import React, { useState, useEffect, useContext, useRef } from "react";
import "./Navbar.css";
import logo from "../Assets/nova-logo.png";
import cartIcon from "../Assets/cart_icon.png";
import { CartContext } from "../Context/CartContex";
import { UserContext } from "../Context/UserContext";
import { Link, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Navbar = () => {
  const { cart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const location = useLocation();

  const token = localStorage.getItem("token");

  const [profileList, setProfileList] = useState(false);
  const [menu, setMenu] = useState(
    () => localStorage.getItem("ShopMenu") || "shop"
  );
  const [cartItemCount, setCartItemCount] = useState(token ? cart.length : 0);

  const profileRef = useRef(null);
  const profileListRef = useRef(null);

  useEffect(() => {
    localStorage.setItem("ShopMenu", menu);
  }, [menu]);

  useEffect(() => {
    setCartItemCount(token ? cart.length : 0);
  }, [cart, token]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileListRef.current &&
        !profileListRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setProfileList(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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

  const profileImage = user.user ? user.user.name[0].toUpperCase() : null;

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
          {user.user ? (
            <div ref={profileRef}>
              <div
                className="profile"
                onClick={() => setProfileList((prev) => !prev)}
              >
                <p>{profileImage}</p>
              </div>
              <div
                className="profile-list"
                ref={profileListRef}
                style={{ display: profileList ? "block" : "none" }}
              >
                <ul>
                  <Link to="/E-commerce/Orders" className="Link">
                    <li>My-Orders</li>
                  </Link>
                  <li onClick={logout}>Log-Out</li>
                </ul>
              </div>
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
