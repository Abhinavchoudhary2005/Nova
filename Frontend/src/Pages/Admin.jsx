import React, { useContext, useState } from "react";
import "./CSS/Admin.css";
import logo from "../Components/Assets/nova-logo.png";
import { ShopContext } from "../Components/Context/ShopContext";
import { CartItems } from "../Components/CartItems/CartItems";

export const Admin = () => {
  const [feature, setFeature] = useState("allProduct");

  const { allProduct } = useContext(ShopContext);

  return (
    <div className="main-container">
      <nav className="NavBar">
        <div className="logo-container-admin">
          <img src={logo} className="logo-admin" alt="Logo" />
          <p className="Admin-name">Admin Pannel</p>
        </div>
      </nav>
      <div className="aside-container">
        <aside className="aside-left">
          <div
            className={
              feature === "allProduct"
                ? "selected-admin admin-feature"
                : "admin-feature"
            }
            onClick={() => setFeature("allProduct")}
          >
            All Product
          </div>
          <div
            className={
              feature === "addProduct"
                ? "selected-admin admin-feature"
                : "admin-feature"
            }
            onClick={() => setFeature("addProduct")}
          >
            Add Product
          </div>
        </aside>
        <aside className="aside-right">
          {feature === "allProduct"
            ? allProduct.map((data) => (
                <CartItems
                  key={data._id}
                  id={data._id}
                  img={`${process.env.REACT_APP_API_KEY}images/${data.image}`}
                  name={data.name}
                  price={data.new_price}
                  oldprice={data.old_price}
                />
              ))
            : null}
        </aside>
      </div>
    </div>
  );
};
