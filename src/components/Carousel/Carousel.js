import React from "react";
import "./Carousel.css";

function Carousel(props) {
  return (
    <>
      {props.error && props.onError()}
      <div className="carousel">
        {props.render()}
        <div className="carouselbox">{props.children}</div>
        {props.btnLeft()}
        {props.btnRight()}
      </div>
    </>
  );
}

export default Carousel;
