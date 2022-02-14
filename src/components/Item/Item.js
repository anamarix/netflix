import React from "react";
import "./Item.css";
import { useSelector, useDispatch } from "react-redux";
import { openModal } from "../../redux/actions/moviesActions";
import n from "../../images/netflix.png";

function Item(props) {
  const popularMovies = useSelector((state) => state.movies);
  const upcomingMovies = useSelector((state) => state.upcomingMovies);
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  const modalHandler = (number, type) => {
    dispatch(openModal(number,type));
  };

  return (
    <div className="item-container">
      <div className="item-logo"><img id="logo-n"src={n}/></div>
      <img
        className={props.className}
        id={props.id}
        src={props.src}
        alt=""
        onClick={() => modalHandler(props.number, props.type)}
      />
      <div className="item-description">
    
        {popularMovies.length &&
          genres.length &&
          upcomingMovies &&
          props.showDetails(props.id, props.type)}
      </div>
    </div>
  );
}

export default Item;
