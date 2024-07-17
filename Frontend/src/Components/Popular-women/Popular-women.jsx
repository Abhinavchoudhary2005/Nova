import React, { useContext, useEffect, useState } from "react";
import "./Popular-women.css";
import { Items } from "../Items/Items";
import { ShopContext } from "../Context/ShopContext";

export const PopularWomen = () => {
  const { allProduct } = useContext(ShopContext);
  const [Womendata, setWomendata] = useState([]);

  useEffect(() => {
    const filtered = allProduct.filter((data) => data.category === "women");

    setWomendata(filtered.slice(-4));
  }, [allProduct]);

  return (
    <div className="PopularWomen">
      <div className="h1-div">
        <h1 className="h1">POPULAR IN WOMEN</h1>
      </div>
      <div className="popular-women-card">
        {Womendata.map((data) => (
          <Items
            key={data._id}
            id={data._id}
            image={data.image}
            desc={data.name}
            newprice={data.new_price}
            oldprice={data.old_price}
          />
        ))}
      </div>
    </div>
  );
};
