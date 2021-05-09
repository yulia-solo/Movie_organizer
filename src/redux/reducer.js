
const initialState = {
      movies: [],
      apiKey: '7d2f85fd',
      searchLine: '', 
      favoritesTitle: 'New list',
      favoritesMovies: [],
      idList: '',
    }
  


export function reducer(state = initialState, action) {
    if (action.type === "TO_GET_SEARCH_LIST") {
      return {
        ...state,
        movies: action.payload.movies
      }
    } 

    if (action.type === "TO_CHANGE_SEARCH_LINE") {
      return {
      ...state,
      searchLine: action.payload.searchLine
      }
    }

    if (action.type === "ADD_TO_FAVORITE_LIST") {
      console.log(action.payload);
      const film = state.movies.find(movie => movie.imdbID === action.payload.id);
      const newFilm = {imdbID: film.imdbID, title: film.Title, year: film.Year};
      const filmInFavorites = state.favoritesMovies.find(movie => movie.imdbID === action.payload.id);
      if (filmInFavorites) {
        return {
          ...state
        }
      }
      const favoritesMovies = [ ...state.favoritesMovies, { ...newFilm} ];
      console.log(favoritesMovies);
      return {
      ...state,
      favoritesMovies,
    }
    }

    if (action.type === "TO_CHANGE_FAVORITES_TITLE") {
      return {
        ...state,
        favoritesTitle: action.payload.favoritesTitle
        }
    }

    if (action.type === "TO_SAVE_FAVORITE_LIST") {
      return {
        ...state,
        idList: action.payload.id
      }
    }

    if (action.type === "TO_REMOVE_FILM_FROM_FAVORITES") {
      console.log(action.payload);
      const cleanedFavoriteMovies = state.favoritesMovies.filter((el) => {
        console.log(el)
        return el.imdbID !== action.payload.id;
      })
      return {
      ...state,
      favoritesMovies: cleanedFavoriteMovies
      }
    }

    return state;
  }





