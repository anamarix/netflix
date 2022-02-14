import React from "react";
import { Link } from "react-router-dom";

function Title(props) {
  return (
    <div className="carousel-title--container">
      <h2 className="carousel-title">
        <Link
          to={props.title === "Popular on Netflix" ? "/popular" : "/upcoming"}
        >
          {props.title}
        </Link>
      </h2>
      <div className="carousel-title--hidden-element">Explore All</div>
      <span>{">"}</span>
    </div>
  );
}

export default Title;
