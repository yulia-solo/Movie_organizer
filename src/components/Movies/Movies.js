import React, { Component } from 'react';
import MovieItem from '../MovieItem/MovieItem';
import './Movies.css';
import { connect } from 'react-redux';
import { fetchFilms } from '../../redux/actions';

class Movies extends Component {

    render() { 
        if (!this.props.movies) {
            return (
                <p>Мы ничего не нашли. Попробуйте еще раз</p>
            )
        } 
        return ( 
            <ul className="movies">
                {this.props.movies.map((movie) => (
                    <li className="movies__item" key={movie.imdbID}>
                        <MovieItem imdbID={movie.imdbID} title={movie.Title} poster={movie.Poster} year={movie.Year} />
                    </li>
                ))}
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        movies: state.movies, searchLine: state.searchLine, apiKey: state.apiKey, 
    }
 }

 const mapDispatchToProps = dispatch => ({
    fetchListFilms: (searchLine, apiKey) => dispatch(fetchFilms(searchLine, apiKey)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Movies);