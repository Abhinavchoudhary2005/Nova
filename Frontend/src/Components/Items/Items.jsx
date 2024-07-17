import React from "react";
import "./Items.css";
import { Link } from "react-router-dom";

export const Items = (props) => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link
      to={`/E-commerce/Product/${props.id}`}
      className="Link"
      onClick={scrollToTop}
    >
      <div className="item">
        <div className="img-div">
          <img
            className="img"
            src={`${process.env.REACT_APP_API_KEY}images/${props.image}`}
            alt={props.desc}
            onLoad={props.onImageLoad}
            loading="lazy"
          />
        </div>
        <div className="below-img">
          <p className="desc">{props.desc}</p>
          <div className="price">
            <div>
              <b>${props.newprice}</b>
            </div>
            <div className="old-price">${props.oldprice}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};
