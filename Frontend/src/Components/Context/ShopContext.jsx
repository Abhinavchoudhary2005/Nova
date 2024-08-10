import React, { createContext, useState, useEffect } from "react";

export const ShopContext = createContext();

export const ShopContextProvider = (props) => {
  const [allProduct, setAllProduct] = useState([]);
  const [banner, setBanner] = useState([]);

  const fetchProducts = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}api/product`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setAllProduct(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_KEY}api/banner`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      setBanner(data);
    } catch (error) {
      console.error("Error fetching banner:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchBanner();
  }, []);

  return (
    <ShopContext.Provider
      value={{
        allProduct,
        banner,
        fetchProducts,
        fetchBanner,
      }}
    >
      {props.children}
    </ShopContext.Provider>
  );
};
