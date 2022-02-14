import React from "react";
import "./Details.css";
import { useSelector, useDispatch } from "react-redux";
import play from "../../images/play-icon.png";
import add from "../../images/add-icon.png";
import star from '../../images/star.png';
import checked from '../../images/checked.png';
import { addToFavorites, removeFromFavorites } from "../../redux/actions/moviesActions";
import { closeModal } from "../../redux/actions/moviesActions";

function Details(props) {
  
const dispatch = useDispatch();
  const popularMovies = useSelector((state) => state.movies);
  const upcomingMovies = useSelector((state) => state.upcomingMovies);
  const favMovies = useSelector(state=> state.favMovies);
  const elementNumber = useSelector((state) => state.modal.number);
  const element = popularMovies.find((el) => el.id === elementNumber) || upcomingMovies.find((el) => el.id === elementNumber) || favMovies.find((el) => el.id === elementNumber)

const favoritesHandler = () => {
favMovies.some(el=> el.id===element.id)? dispatch(removeFromFavorites(element)) : dispatch(addToFavorites(element))

};
const propagationHandler = (e) => {
e.stopPropagation();
};

const favoritesImageHandler = () => {
  return favMovies.some(el=> el.id===element.id)?checked:add
}

const favoritesToolTipHandler = () => {
  return favMovies.some(el=> el.id===element.id)?"Remove from favorites" : "Add to favorites"
}

  const renderDetails = () => {
    return (
      <>
      <span id="close-button"onClick={()=>dispatch(closeModal())}>X</span>
      <div className="element">
        
        <img
          src={`https://image.tmdb.org/t/p/w185/${element.poster_path}`}
          alt="movie poster"
        ></img>
        <div className="element-bottons">
          
          <div className="element-play-container">
            <img src={play} alt="play button"/>
          </div>
          <div className="element-add-container" data-title={favoritesToolTipHandler()} onClick={()=>favoritesHandler()}>
            <img src={favoritesImageHandler()} alt="add to favorites button" />
          </div>
        </div>

        <div className="element-title">
          <span>{element.title}</span>
          <span className="element-star-container"><img src={star} alt="star symbol" /></span>
          <span>{element.vote_average}</span>
        </div>
        <div>{element.overview}</div>
      </div>
      </>
    );
  };
  return <div className="details-container" onClick={(e)=>propagationHandler(e)}>{renderDetails()}</div>;
}

export default Details;
