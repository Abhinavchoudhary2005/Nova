import React, { useContext, useState, useEffect } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Components/Context/ShopContext";
import { Items } from "../Components/Items/Items";
import BeatLoader from "react-spinners/BeatLoader";

export const ShopCategory = (props) => {
  const { allProduct } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const filterProducts = () => {
      if (allProduct) {
        const filtered = allProduct.filter(
          (data) => data.category === props.category
        );
        setFilteredProducts(filtered);
      }
    };

    filterProducts();
  }, [allProduct, props.category]);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, [props.category]);

  if (loading) {
    return (
      <div className="loader-container">
        <BeatLoader color="#53d8d8" />
      </div>
    );
  }

  return allProduct.length > 0 ? (
    <div className="shop-category">
      <div className="banner-div">
        <img
          src={`http://localhost:8000/images/${props.banner}`}
          alt="Banner"
          className="banner"
          loading="lazy"
        />
      </div>
      <div className="shop-category-cards-div">
        <div className="shop-category-card">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((data) => (
              <Items
                key={data._id}
                id={data._id}
                image={data.image}
                desc={data.name}
                newprice={data.new_price}
                oldprice={data.old_price}
              />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="loader-container">
      <BeatLoader color="#53d8d8" />
    </div>
  );
};
