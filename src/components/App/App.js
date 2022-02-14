import React from "react";
import logo from "../../images/logo.png";
import Carousel from "../Carousel/Carousel";
import Overview from "../Overview/Overview";
import Item from "../Item/Item";
import ButtonLeft from "../ButtonLeft/ButtonLeft";
import ButtonRight from "../ButtonRight/ButtonRight";
import Title from "../Title/Title";
import Details from "../Details/Details";
import Navbar from "../Navbar/Navbar";
import { Modal } from "../Modal/Modal";
import Spinner from "../Spinner/Spinner";
import Fatal from "../Fatal/Fatal";
import "./App.css";
import {
  getGenres,
  getPopularMovies,
  getUpcomingMovies,
} from "../../redux/actions/moviesActions";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { Link } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue]= React.useState('');
  const [searchInput, setSearchInput] = React.useState(false);
  const popularMovies = useSelector((state) => state.movies);
  const upcomingMovies = useSelector((state) => state.upcomingMovies);
  const favoriteMovies = useSelector(state=> state.favMovies);
  const openedModal = useSelector(state=>state.modal);
  const genres = useSelector((state) => state.genres);
  const loadingPopularMovies = useSelector(state=>state.loadingPopularMovies);
  const loadingUpcomingMovies = useSelector(state=>state.loadingUpcomingMovies);
  const errorPopularMovies = useSelector(state=>state.errorPopularMovies);
  const errorUpcomingMovies = useSelector(state=>state.errorUpcomingMovies)
  const [scrollAmount, setAmount] = React.useState(0);
  const [scrollAmountUpcomingMovies, setAmountUpcoming] = React.useState(0);
  const scrollPerClick = 150;
  let searchedPopularMovies =[];
  let searchedUpcomingMovies=[];

  if(!searchValue.length>=1){
    searchedPopularMovies = popularMovies;
    searchedUpcomingMovies = upcomingMovies;
  } else {
    const elements= genres.filter(el=>{
      const genre = el.name.toLowerCase();
      const searchedGenre = searchValue.toLowerCase();
      return genre.includes(searchedGenre)
    }).map(item=>item.id);
    
    const PopularMoviesByGenre=popularMovies.filter(el=>el.genre_ids.includes(...elements));
    const UpcomingMoviesByGenre=upcomingMovies.filter(el=>el.genre_ids.includes(...elements));

    const searchedPMovies = popularMovies.filter(el=>{
      const movieTitle = el.title.toLowerCase();
      const searchedTitle = searchValue.toLowerCase();
      return movieTitle.includes(searchedTitle);
    });
    searchedPopularMovies = searchedPMovies.concat(PopularMoviesByGenre);

   const searchedUpMovies = upcomingMovies.filter(el=>{
      const movieTitle = el.title.toLowerCase();
      const searchedTitle = searchValue.toLowerCase();
      return movieTitle.includes(searchedTitle);

  });
  searchedUpcomingMovies = searchedUpMovies.concat(UpcomingMoviesByGenre);
};


  React.useEffect(() => {
    dispatch(getPopularMovies());
    dispatch(getUpcomingMovies());
    dispatch(getGenres());
  }, []);


  const sliderScrollLeft = (sliders) => {
    sliders.scrollTo({
      top: 0,
      left: scrollAmount - scrollPerClick,
      behavior: "smooth",
    });
    setAmount((prev) => prev - scrollPerClick);
    if (scrollAmount < 0) {
      setAmount(0);
    }
  };
  const sliderScrollRight = (sliders) => {
    if (scrollAmount <= sliders.scrollWidth - sliders.clientWidth) {
      sliders.scrollTo({
        top: 0,
        left: scrollAmount + scrollPerClick,
        behavior: "smooth",
      });
    }
    setAmount((prev) => prev + scrollPerClick);
  };
  const sliderScrollLeftUpcomingMovies = (sliders) => {
    sliders.scrollTo({
      top: 0,
      left: scrollAmountUpcomingMovies - scrollPerClick,
      behavior: "smooth",
    });
    setAmountUpcoming((prev) => prev - scrollPerClick);
    if (scrollAmountUpcomingMovies < 0) {
      setAmountUpcoming(0);
    }
  };
  const sliderScrollRightUpcomingMovies = (sliders) => {
    if (
      scrollAmountUpcomingMovies <=
      sliders.scrollWidth - sliders.clientWidth
    ) {
      sliders.scrollTo({
        top: 0,
        left: scrollAmountUpcomingMovies + scrollPerClick,
        behavior: "smooth",
      });
    }
    setAmountUpcoming((prev) => prev + scrollPerClick);
  };
  const showDetails = (index, type) => {
    const genresNames = [];
    if(type==="popular"){
     const movie = popularMovies.find(el=>el.id===index);
     const movieGenres=movie.genre_ids;
    movieGenres.map((el) => {
     const item = genres.find((item) => item.id === el);
     genresNames.push(item.name);
    })} else if(type==="upcoming") {
      const movie = upcomingMovies.find(el=>el.id===index);
      const movieGenres=movie.genre_ids;
     movieGenres.map((el) => {
      const item = genres.find((item) => item.id === el);
      genresNames.push(item.name);
    })}

    return (
      <ul>
        {genresNames.map((el, index) => (
          <li key={index}>{el}</li>
        ))}
      </ul>
    );
  };
    
  const removeSearchInput = (e) => {
    if((e.target.id!=="input-search")&& (e.target.id!=="search-icon") && searchInput && !searchValue){
      setSearchInput(false)
    } else return
  };

  const renderPopularMovies = () => {
    return searchedPopularMovies.map((current, index) => (
      <Item
        key={index}
        className={`img-${index} slider-img`}
        id={current.id}
        type={"popular"}
        number={current.id}
        src={`https://image.tmdb.org/t/p/w185/${current.poster_path}`}
        showDetails={showDetails}
      />
    ))
  }

  const renderUpcomingMovies = () => {
    return searchedUpcomingMovies.map((current, index) => (
      <Item
        key={index}
        className={`pic-${index} slider-img`}
        id={current.id}
        type={"upcoming"}
        number={current.id}
        src={`https://image.tmdb.org/t/p/w185/${current.poster_path}`}
        showDetails={showDetails}
      />
    ))
  }
 const renderFavoriteMovies = () => {
   if(!favoriteMovies.length>=1){
     return(
       <p id="empty-favorites-message">You don't have any movies added to this category yet.</p>
     )
   }
 return favoriteMovies.map((current,index)=>(
   <Item
   key={index}
   className={`image-${index} slider-img`}
   id= {index}
   type={"favorites"}
   number={current.id}
   src={`https://image.tmdb.org/t/p/w185/${current.poster_path}`}
   showDetails={showDetails}
   />
 ))
}

  return (
    
      <div className="App" onClick={(e)=>removeSearchInput(e)}>
      <Navbar setSearchInput={setSearchInput} searchInput={searchInput} searchValue={searchValue} setSearchValue={setSearchValue}/>
      <div className="netflix-logo">
        <Link to="/"><img src={logo} alt="logo" /></Link>
      </div>
      {(loadingPopularMovies || loadingUpcomingMovies) && <Spinner/>}
      {(errorPopularMovies || errorUpcomingMovies) && <Fatal message={errorPopularMovies || errorUpcomingMovies}/>}
      {(!errorPopularMovies && !errorUpcomingMovies && !loadingPopularMovies && !loadingUpcomingMovies) && (
      <Routes>
      <Route path="/" element={
        <React.Fragment>
        <Carousel
          error={errorPopularMovies}
          onError ={()=> <Fatal message={errorPopularMovies}/>}
          render={() => <Title title={"Popular on Netflix"} />}
          btnLeft={() => <ButtonLeft scrollLeft={sliderScrollLeft} />}
          btnRight={() => <ButtonRight scrollRight={sliderScrollRight} />}
        >
          {renderPopularMovies()}
        </Carousel>
        <Carousel
          error={errorUpcomingMovies}
          onError ={()=> <Fatal message={errorUpcomingMovies}/>}
          render={() => <Title title={"Trending Now"} />}
          btnLeft={() => (
            <ButtonLeft scrollLeft={sliderScrollLeftUpcomingMovies} />
          )}
          btnRight={() => (
            <ButtonRight scrollRight={sliderScrollRightUpcomingMovies} />
          )}
        >
          {renderUpcomingMovies()}
        </Carousel>
        </React.Fragment>
      } />
      <Route path="/popular" element={<Overview  render={renderPopularMovies}/>} />
      <Route path="/upcoming" element={<Overview  render={renderUpcomingMovies}/>} />
      <Route path="/favorites" element={<Overview  render={renderFavoriteMovies}/>} />
    </Routes>
    
      )}
      {openedModal && (<Modal> <Details/> </Modal>)}

    </div>

  );
}

export default App;
