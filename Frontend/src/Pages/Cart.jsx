import React, { useContext, useEffect, useState } from "react";
import { CartItems } from "../Components/CartItems/CartItems.jsx";
import { CartContext } from "../Components/Context/CartContex.jsx";
import "./CSS/Cart.css";
import BeatLoader from "react-spinners/BeatLoader.js";

export const Cart = () => {
  const { cart, fetchCart, totalCartValue } = useContext(CartContext);
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 600);
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <BeatLoader color="#53d8d8" />
      </div>
    );
  }

  if (!token) {
    return (
      <div className="cart-card">
        <h1 className="cart-empty-text">
          Please login <br />
          to create a Cart
        </h1>
      </div>
    );
  }

  return (
    <div className="cart-card">
      {cart.length === 0 ? (
        <h1 className="cart-empty-text">
          Cart is empty <br />
          Add items to Cart
        </h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th className="cart-product">Products</th>
              <th className="cart-title">Title</th>
              <th className="cart-size">Size</th>
              <th className="cart-price">Price</th>
              <th className="cart-quantity">Quantity</th>
              <th className="cart-total">Total</th>
              <th className="cart-remove">Remove</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((data) => (
              <CartItems
                key={data._id}
                id={data._id}
                img={`${process.env.REACT_APP_API_KEY}images/${data.image}`}
                name={data.name}
                size={data.size}
                price={data.new_price}
                quantity={data.quantity}
                totalPrice={data.totalPrice}
              />
            ))}
            <tr>
              <td colSpan="4"></td>
              <td className="cart-quantity">
                <b>Grand Total:</b>
              </td>
              <td className="cart-total">
                <b>${totalCartValue}</b>
              </td>
              <td></td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  );
};
