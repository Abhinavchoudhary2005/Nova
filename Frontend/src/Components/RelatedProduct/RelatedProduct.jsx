import React, { useContext, useEffect, useState } from "react";
import "./RelatedProduct.css";
import { Items } from "../Items/Items";
import { ShopContext } from "../Context/ShopContext";

export const RelatedProduct = (props) => {
  const { allProduct } = useContext(ShopContext);
  const [related_data, setrelated_data] = useState([]);

  useEffect(() => {
    const filtered = allProduct.filter(
      (data) => data.category === props.category
    );

    const shuffled = filtered.sort(() => 0.5 - Math.random());
    setrelated_data(shuffled.slice(0, 4));
  }, [allProduct, props.category, props.id]);

  return (
    <div className="related-data">
      <div className="related-data-h1-div">
        <h1 className="related-data-h1">RELATED PRODUCT</h1>
      </div>
      <div className="related-data-card">
        {related_data.map((related_data) => (
          <Items
            key={related_data._id}
            id={related_data._id}
            image={related_data.image}
            desc={related_data.name}
            newprice={related_data.new_price}
            oldprice={related_data.old_price}
          />
        ))}
      </div>
    </div>
  );
};
