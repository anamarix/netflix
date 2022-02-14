import { GET_POPULAR_MOVIES_FAILURE, GET_POPULAR_MOVIES_REQUEST, GET_POPULAR_MOVIES_SUCCESS, GET_UPCOMING_MOVIES_REQUEST, GET_UPCOMING_MOVIES_FAILURE, GET_UPCOMING_MOVIES_SUCCESS, GET_GENRES, OPEN_MODAL, CLOSE_MODAL, ADD_TO_FAVORITES, REMOVE_FROM_FAVORITES } from "../types/moviesTypes";


const INITIAL_STATE = {
    movies: [],
    upcomingMovies:[],
    favMovies:[],
    genres:[],
    modal:null,
    loadingPopularMovies: false,
    loadingUpcomingMovies: false,
    errorPopularMovies: '',
    errorUpcomingMovies:'',
    errorGenres:''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case GET_POPULAR_MOVIES_SUCCESS:
            return {...state, movies:state.movies.concat(action.payload), loadingPopularMovies: false, errorPopularMovies:''};
        case GET_POPULAR_MOVIES_REQUEST:
            return {...state, loadingPopularMovies:true};
        case GET_POPULAR_MOVIES_FAILURE:
            return {...state, errorPopularMovies:action.payload, loadingPopularMovies: false};
        case GET_UPCOMING_MOVIES_SUCCESS:
            return {...state, upcomingMovies:state.upcomingMovies.concat(action.payload), loadingUpcomingMovies: false, errorUpcomingMovies:''};
        case GET_UPCOMING_MOVIES_REQUEST:
            return {...state, loadingUpcomingMovies:true};
        case GET_UPCOMING_MOVIES_FAILURE:
            return {...state, errorUpcomingMovies:action.payload, loadingUpcomingMovies: false};
        case GET_GENRES:
            return {...state, genres:state.genres.concat(action.payload)};
        case OPEN_MODAL:
            return {...state, modal:action.payload};
            case CLOSE_MODAL:
            return {...state, modal:null};
        case ADD_TO_FAVORITES:
            return {...state, favMovies:[...state.favMovies, action.payload]};
        case REMOVE_FROM_FAVORITES:
            return {...state, favMovies:state.favMovies.filter(item=>item!==action.payload)};

        default:
            return state;
    }
}