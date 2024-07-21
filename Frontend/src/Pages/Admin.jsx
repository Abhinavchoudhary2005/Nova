import React, { useContext, useState } from "react";
import "./CSS/Admin.css";
import logo from "../Components/Assets/nova-logo.png";
import { ShopContext } from "../Components/Context/ShopContext";
import { AdminItem } from "../Components/AdminItem/AdminItem";
import { toast } from "react-toastify";

export const Admin = () => {
  const [feature, setFeature] = useState("allProduct");
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [oldprice, setOldPrice] = useState("");
  const [newprice, setNewPrice] = useState("");
  const [image, setImage] = useState(null);
  const { allProduct, fetchProducts } = useContext(ShopContext);
  const token = localStorage.getItem("token");

  const handleAddProduct = async () => {
    if (!name || !category || !oldprice || !newprice || !image) {
      toast.error("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("oldprice", oldprice);
    formData.append("newprice", newprice);
    formData.append("image", image);

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}admin/upload/product`,
        {
          method: "POST",
          headers: {
            Authorization: `${token}`,
          },
          body: formData,
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        fetchProducts();
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="main-container">
      <nav className="NavBar">
        <div className="logo-container-admin">
          <img src={logo} className="logo-admin" alt="Logo" />
          <p className="Admin-name">Admin Panel</p>
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
            All Products
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
          {feature === "allProduct" ? (
            allProduct.length > 0 ? (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th className="admin-product">Products</th>
                    <th className="admin-title">Title</th>
                    <th className="admin-category">Category</th>
                    <th className="admin-oldprice">Old Price</th>
                    <th className="admin-newprice">New Price</th>
                    <th className="admin-available">Available</th>
                    <th className="admin-remove">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {allProduct.map((data) => (
                    <AdminItem
                      key={data._id}
                      id={data._id}
                      img={`${process.env.REACT_APP_API_KEY}images/${data.image}`}
                      name={data.name}
                      newprice={data.new_price}
                      oldprice={data.old_price}
                      category={data.category}
                      available={data.available ? "Yes" : "No"}
                    />
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No products available.</p>
            )
          ) : (
            <div className="add-product-form">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter product name"
                required
              />

              <label htmlFor="category">Category</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Enter category"
                required
              />

              <label htmlFor="oldprice">Old Price</label>
              <input
                type="number"
                id="oldprice"
                value={oldprice}
                onChange={(e) => setOldPrice(e.target.value)}
                placeholder="Enter old price"
                required
              />

              <label htmlFor="newprice">New Price</label>
              <input
                type="number"
                id="newprice"
                value={newprice}
                onChange={(e) => setNewPrice(e.target.value)}
                placeholder="Enter new price"
                required
              />

              <label htmlFor="image">Upload Image</label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
                required
              />

              <button onClick={handleAddProduct}>Add Product</button>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
