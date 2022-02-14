import { GET_POPULAR_MOVIES_FAILURE, GET_POPULAR_MOVIES_REQUEST, GET_POPULAR_MOVIES_SUCCESS, GET_UPCOMING_MOVIES_REQUEST,GET_UPCOMING_MOVIES_FAILURE, GET_UPCOMING_MOVIES_SUCCESS, GET_GENRES, OPEN_MODAL, CLOSE_MODAL, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../types/moviesTypes"
import axios from "axios";


const api_key = process.env.REACT_APP_API_KEY;


export const getPopularMoviesRequest =()=> {
    return {
        type:GET_POPULAR_MOVIES_REQUEST
    }
}

export const getPopularMoviesSuccess =(movies) => {
    return {
        type: GET_POPULAR_MOVIES_SUCCESS,
        payload: movies
    }
}

export const getPopularMoviesFailure = (error) =>{
    return {
        type: GET_POPULAR_MOVIES_FAILURE,
        payload:error
    }
}

export const getPopularMovies = () => async(dispatch) => {
dispatch({type:GET_POPULAR_MOVIES_REQUEST});
try{
    const result = await axios.get(
        "https://api.themoviedb.org/3/movie/popular?api_key=" +
          api_key +
          "&language=en-US&page=1");
    const movies = result.data.results;
    dispatch({type:GET_POPULAR_MOVIES_SUCCESS, payload:movies})
    }
    catch(error){
        dispatch({type:GET_POPULAR_MOVIES_FAILURE, payload: error.message})
    }
}

export const getUpcomingMoviesRequest =()=> {
    return {
        type:GET_UPCOMING_MOVIES_REQUEST
    }
}

export const getUpcomingMoviesSuccess =(movies) => {
    return {
        type: GET_UPCOMING_MOVIES_SUCCESS,
        payload: movies
    }
}

export const getUpcomingMoviesFailure = (error) =>{
    return {
        type: GET_UPCOMING_MOVIES_FAILURE,
        payload:error
    }
}

export const getUpcomingMovies = () => async(dispatch) => {
dispatch({type:GET_UPCOMING_MOVIES_REQUEST});
try{
    const result = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=" +
          api_key +
          "&language=en-US&page=1"
      );
    const movies = result.data.results;
    dispatch({type:GET_UPCOMING_MOVIES_SUCCESS, payload:movies})
    }
    catch(error){
        dispatch({type:GET_UPCOMING_MOVIES_FAILURE, payload: error.message})
    }
}

export const getGenres = () => async(dispatch) => {
    const response = await axios.get(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" +
          api_key +
          "&language=en-US");
    const genres = response.data.genres;
    dispatch({type:GET_GENRES, payload:genres})  
}

export const openModal = (number, type)=>{
    return {
        type: OPEN_MODAL,
        payload:{number:number, type:type}
    }
}

export const closeModal = () =>{
    return {
        type:CLOSE_MODAL
    }
}

export const addToFavorites = (movie) => {
    return{
        type: ADD_TO_FAVORITES,
        payload: movie
    }
}

export const removeFromFavorites = (movie) => {
    return{
        type: REMOVE_FROM_FAVORITES,
        payload: movie
    }
}