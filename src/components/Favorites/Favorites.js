import React, { Component } from 'react';
import './Favorites.css';
import { connect } from 'react-redux';
import { changingFavoritesTitle, putFavoritesListToServer, removingFilm } from '../../redux/actions';


class Favorites extends Component {

    saveListHandler = (event) => {
        event.preventDefault();
        this.props.savingList(this.props.favoritesTitle, this.props.favoritesMovies)
    }

    changeTitleHandler = (event) => {
        this.props.changingTitle(event.target.value)
    }

    removeFilmHandler = (event) => {
        console.log(event.target.dataset)
        this.props.removeFilm(event.target.dataset.id)
    }

    render() { 
        return (
            <div className="favorites">
                <input value={this.props.favoritesTitle} className="favorites__name" disabled={this.props.idList} onChange={this.changeTitleHandler} />
                <ul className="favorites__list">
                    {this.props.favoritesMovies.map((item) => {
                        return <li className="favorite_item" key={item.imdbID} >{item.title} ({item.year}) {!this.props.idList && <button className="removing_button" data-id={item.imdbID} onClick={this.removeFilmHandler}>X</button>}</li>;
                    })}
                </ul>
                {!this.props.idList && <button type="button" className="favorites__save" disabled={!this.props.favoritesTitle || !this.props.favoritesMovies} onClick={this.saveListHandler} >Save a list</button>} 
                {this.props.idList && <a href={`/list/${this.props.idList}`} target="_blank" >{this.props.favoritesTitle}</a>} 

            </div>
        );
    }
}
 
const mapStateToProps = (state) => {
    return {
        favoritesTitle: state.favoritesTitle,
        favoritesMovies: state.favoritesMovies,
        idList: state.idList,
    }
 }

 const mapDispatchToProps = (dispatch) => ({
    changingTitle: (favoritesTitle) => dispatch(changingFavoritesTitle(favoritesTitle)),
    savingList: (favoritesTitle, favoritesMovies) => dispatch(putFavoritesListToServer(favoritesTitle, favoritesMovies)),
    removeFilm: (favoritesMovies => dispatch(removingFilm(favoritesMovies))),
 })


  export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
  