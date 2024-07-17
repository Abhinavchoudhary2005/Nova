import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Components/Context/ShopContext";
import star_icon from "../Components/Assets/star_icon.png";
import star_dull_icon from "../Components/Assets/star_dull_icon.png";
import "./CSS/Product.css";
import { RelatedProduct } from "../Components/RelatedProduct/RelatedProduct";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CartContext } from "../Components/Context/CartContex";
import BeatLoader from "react-spinners/BeatLoader";

export const Product = () => {
  const { fetchCart } = useContext(CartContext);
  const { allProduct } = useContext(ShopContext);
  const { ProductId } = useParams();

  const [selectedSize, setSelectedSize] = useState(null);
  const [loading, setLoading] = useState(true);

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

  if (!allProduct) {
    return <div>Loading...</div>;
  }

  const product = allProduct.find((data) => data._id === ProductId);

  if (!product) {
    return <div className="loader-container">Product not found</div>;
  }

  const { _id, image, name, old_price, new_price, category } = product;

  const handleSizeClick = (size) => {
    setSelectedSize(size);
  };

  const addToCart = async () => {
    if (!selectedSize) {
      toast.error("Please select a size.");
      return;
    }

    const data = {
      _id,
      image,
      name,
      old_price,
      new_price,
      category,
      size: selectedSize,
    };

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        toast.error("You must be logged in to add items to the cart.");
        return;
      }

      const res = await fetch(
        `${process.env.REACT_APP_API_KEY}cart/addtocart`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.error || "Failed to add item to cart.");
        return;
      }
      fetchCart();
      toast.success("Item added to cart successfully.");
    } catch (error) {
      toast.error(
        error.message || "An error occurred while adding the item to cart."
      );
    }
  };

  return (
    <div>
      <div className="product">
        <div className="product-child">
          <div className="side-img-card">
            {[...Array(4)].map((_, index) => (
              <img
                src={`${process.env.REACT_APP_API_KEY}images/${image}`}
                className="side-img"
                alt={`Product side view ${index + 1}`}
                key={index}
              />
            ))}
          </div>
          <div>
            <img
              src={`${process.env.REACT_APP_API_KEY}images/${image}`}
              className="main-img"
              alt={`${name} main view`}
            />
          </div>
          <div className="product-info">
            <h2>{name}</h2>
            <div>
              <img src={star_icon} alt="Star rating" />
              <img src={star_icon} alt="Star rating" />
              <img src={star_icon} alt="Star rating" />
              <img src={star_icon} alt="Star rating" />
              <img src={star_dull_icon} alt="Star rating" />
              (122)
            </div>
            <div className="price">
              <div className="old-price">${old_price}</div>
              <div className="new-price">
                <b>${new_price}</b>
              </div>
            </div>
            <div>
              A shirt is a versatile garment worn on the upper body, typically
              with buttons down the front.
            </div>
            <div>
              <h3>Select Size</h3>
              <div className="size-container">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <div
                    className={`size-box ${
                      selectedSize === size ? "selected" : ""
                    }`}
                    key={size}
                    onClick={() => handleSizeClick(size)}
                  >
                    {size}
                  </div>
                ))}
              </div>
              <button className="add-to-cart" onClick={addToCart}>
                Add To Cart
              </button>
            </div>
            <div>
              <p>
                <b>Category: </b>
                {category}
              </p>
              <p>
                <b>Tags: </b>Modern, Latest
              </p>
            </div>
          </div>
        </div>
      </div>
      <RelatedProduct category={category} id={_id} />
    </div>
  );
};
