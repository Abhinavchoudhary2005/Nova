import React, { useContext, useEffect, useState } from "react";
import "./NewCollection.css";
import { Items } from "../Items/Items";
import { ShopContext } from "../Context/ShopContext";

export const NewCollection = () => {
  const { allProduct } = useContext(ShopContext);
  const [Newdata, setNewdata] = useState([]);

  useEffect(() => {
    setNewdata(allProduct.slice(-8));
  }, [allProduct]);

  return (
    <div className="NewCollection">
      <div className="NewCollection-h1-div">
        <h1 className="NewCollection-h1">NEW COLLECTIONS</h1>
      </div>
      <div className="NewCollection-card">
        {Newdata.map((data) => (
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
