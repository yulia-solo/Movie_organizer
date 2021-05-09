import React, { Component } from 'react';
import './SearchBox.css';
import { connect } from 'react-redux';
import { fetchFilms, changingSearchLine } from '../../redux/actions';



class SearchBox extends Component {

    searchLineChangeHandler = (event) => {
        this.props.changeSearchLine(event.target.value)
    }

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        this.props.fetchListFilms(this.props.searchLine, this.props.apiKey);
    }

    render() {

        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Search movie by title:
                        <input
                            value={this.props.searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Например, Shawshank Redemption"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!this.props.searchLine}
                    >
                        Search
                    </button>
                </form>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        searchLine: state.searchLine, apiKey: state.apiKey, 
    }
 }

 const mapDispatchToProps = dispatch => ({
    fetchListFilms: (searchLine, apiKey) => dispatch(fetchFilms(searchLine, apiKey)),
    changeSearchLine: (searchLine) => dispatch(changingSearchLine(searchLine))
  });

  export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);