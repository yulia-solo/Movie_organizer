import React, { Component } from 'react';
import './MovieItem.css';
import { connect } from 'react-redux';
import { addingToFavoriteList } from '../../redux/actions';

class MovieItem extends Component {

    addFilmToListHandler = (event) => {
        event.preventDefault();
        this.props.addToFavorites(event.target.dataset.id);
        console.log(event.target.dataset.id)
    }

    render() {
        const { imdbID, title, year, poster } = this.props;

        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={poster} alt={title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{title}&nbsp;({year})</h3>
                    <button type="button" data-id={imdbID} className="movie-item__add-button" onClick={this.addFilmToListHandler} >Add to list</button>
                </div>
            </article>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        favorites: state.favoritesMovies
    }
}

const mapDispatchToProps = dispatch => ({
    addToFavorites: (favoritesMovies) => dispatch(addingToFavoriteList(favoritesMovies))
});
 
export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);