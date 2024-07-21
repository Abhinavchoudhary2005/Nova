import React, { useContext } from "react";
import "./AdminItem.css";
import { toast } from "react-toastify";
import { ShopContext } from "../Context/ShopContext";

export const AdminItem = (props) => {
  const token = localStorage.getItem("token");

  const { fetchProducts } = useContext(ShopContext);

  const removeItem = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}admin/remove/product`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify({ _id: props.id }),
        }
      );
      const data = await response.json();

      if (data.message) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error removing product:", error);
      toast.error("Failed to remove product");
    }
  };

  return (
    <tr>
      <td className="admin-product">
        <img src={props.img} className="admin-img" alt="Product" />
      </td>
      <td className="admin-title">{props.name}</td>
      <td className="admin-category">{props.category}</td>
      <td className="admin-oldprice">${props.oldprice}</td>
      <td className="admin-newprice">${props.newprice}</td>
      <td className="admin-available">{props.available ? "Yes" : "No"}</td>
      <td className="admin-remove" onClick={removeItem}>
        X
      </td>
    </tr>
  );
};
