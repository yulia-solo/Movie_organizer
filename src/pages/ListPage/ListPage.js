import React, { Component } from 'react';
import './ListPage.css';
import { connect } from "react-redux";


class ListPage extends Component {
    state = {
        savedFavoritesTitle: '',
        savedFavoritesMovies: [],
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        console.log(id);
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
        .then((response) => {
           return response.json()
        })
        .then((data) => {
            console.log(data)
            this.setState({savedFavoritesTitle: data.title})
            const listMovies = data.movies.map((movieId) => {
               return this.searchById(movieId)
            })
            console.log(listMovies)
            return Promise.all(listMovies)
        }).then((list) => {
            this.setState({savedFavoritesMovies: list})
        })
    }

    searchById = (id) => {
        return fetch(`http://www.omdbapi.com/?i=${id}&apikey=${this.props.apiKey}`)
        .then((response) => {
            return response.json()
        })
    } 


    render() { 
        return (
            <div className="list-page">
                <div className="list">
                <div className="header-list-page">
                <h1 className="list-page__title">{this.state.savedFavoritesTitle}</h1>
                </div>
                <ul>
                    {this.state.savedFavoritesMovies.map((movie) => {
                        return (
                            <li key={movie.imdbID} className="list-item">
                                <a href={`https://www.imdb.com/title/${movie.imdbID}`} target="_blank">{movie.Title} ({movie.Year})</a>
                            </li>
                        );
                    })}
                </ul>
                </div>
            </div>
        );
    }
}

 const mapStateToProps = (state) => {
    return {
        apiKey: state.apiKey
    }
 }


  export default connect(mapStateToProps)(ListPage);