export function searchingFilms(movies) {
    return {
      type: 'TO_GET_SEARCH_LIST',
      payload: {
        movies: movies
      }
    }
  }

  export function changingSearchLine(searchLine) {
    return {
      type: 'TO_CHANGE_SEARCH_LINE',
      payload: {
        searchLine: searchLine
      }
    }
  }

  export function changingFavoritesTitle(favoritesTitle) {
    return {
      type: 'TO_CHANGE_FAVORITES_TITLE',
      payload: {
        favoritesTitle: favoritesTitle
      }
    }
  }

  export function addingToFavoriteList(id) {
    return {
      type: 'ADD_TO_FAVORITE_LIST',
      payload: {
        id: id
      }
    }
  } 

export function savingFavoriteList(id) {
  return {
    type: 'TO_SAVE_FAVORITE_LIST',
    payload: {
      id: id
    }
  }
} 

export function removingFilm(id) {
  return {
    type: 'TO_REMOVE_FILM_FROM_FAVORITES',
    payload: {
      id: id
    }
  }
}



export function putFavoritesListToServer(favoritesTitle, favoritesMovies) {
  console.log('blaaaaa')
  const moviesIDList = favoritesMovies.map((movie) => movie.imdbID)
  const list = {
    title: favoritesTitle,
    movies: [...moviesIDList],
}
  return function (dispatch) {
    fetch('https://acb-api.algoritmika.org/api/movies/list', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(list)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(savingFavoriteList(data.id))
      })
      .catch(error => {
        console.log(`Произошла ошибка: ${error.message}`);
      });
    }
  }


  export function fetchFilms(searchLine, apiKey) {
    return function (dispatch) {
      fetch(`http://www.omdbapi.com/?s=${searchLine}&apikey=${apiKey}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        dispatch(searchingFilms(data.Search));
      })
      .catch(error => {
        console.log(`Произошла ошибка: ${error.message}`);
      });
    }
  }
  