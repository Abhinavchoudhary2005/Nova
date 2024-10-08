import React, { useContext } from "react";
import { CartContext } from "../Context/CartContex";
import "./CartItems.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const CartItems = (props) => {
  const { fetchCart, triggerCartChange } = useContext(CartContext);

  const removeItem = async () => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${process.env.REACT_APP_API_KEY}cart/removeProduct`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `${token}`,
        },
        body: JSON.stringify({ _id: props.id, size: props.size }),
      });
      fetchCart();
      triggerCartChange();
      toast.success("Item removed from cart!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Error removing item. Please try again later.");
    }
  };

  return props.quantity === 0 ? null : (
    <tr>
      <td className="cart-product">
        <img src={props.img} className="cart-img" alt="Product" />
      </td>
      <td className="cart-title">{props.name}</td>
      <td className="cart-size">{props.size}</td>
      <td className="cart-price">${props.price}</td>
      <td className="cart-quantity">{props.quantity}</td>
      <td className="cart-total">${props.totalPrice}</td>
      <td className="cart-remove" onClick={removeItem}>
        X
      </td>
    </tr>
  );
};
