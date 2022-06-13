import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import './movie-view.scss';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

export class MovieView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isFavorite: false,
      FavoriteMovies: [],
    };
  }

  // componentDidMount() {
  //   document.addEventListener("keypress", this.keypressCallback);
  // }

  // componentWillUnmount() {
  //   document.removeEventListener("keypress", this.keypressCallback);
  // }

  addFavorite(movie) {
    let token = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    let url = `https://zoehime.herokuapp.com/users/${user}/${this.props.movie._id}`;
    let data = JSON.stringify({
      Username: user,
      movieid: this.props.movie._id
    });
    console.log(url);
    console.log(data);
    axios.post(`https://zoehime.herokuapp.com/users/${user}/${this.props.movie._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        console.log(response);
        history.back();
        alert("Movies has been added to your favorites list!");
      })
      .catch((e) => {
        console.log(e);
      });
  }


  render() {
    const { movie, onBackClick } = this.props;
    //const isMovieAFavorite = this.props.user.FavoriteMovies.includes(this.props.movie._id);
    console.log('selected movie details view: ', movie)

    return (
      <>
        <div className="movie-view">
          <div className="movie-poster">
            <img src={movie.Imagepath} width='300' height='400' crossOrigin='' alt='Sorry! Cannot display the image.' />
          </div>
          <div className="movie-title">
            <span className="label">Title: </span>
            <span className="value">{movie.Title}</span>
          </div>
          <div className="movie-description">
            <span className="label">Description: </span>
            <span className="value">{movie.Description}</span>
          </div>
          <div className="movie-genre">
            <span className="label">Genre: </span>
            <span className="value">{movie.Genre.Name}</span>
          </div>
          <div className="movie-director">
            <span className="label">Director: </span>
            <span className="value">{movie.Director.Name}</span>
          </div>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant="link">Director Info</Button>
          </Link>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre Info</Button>
          </Link>
          <div align="center">
            <Button variant="outline-light" onClick={() => { onBackClick() }}>Back</Button>
            <Button
              className="addButton" label="+ Add"
              onClick={() => { this.addFavorite(movie); }} style={{ textAlign: "center" }}> + Add to the Favoritte List</Button>
            {/* <Button variant="outline-light" onClick={() => { this.onAddtoFavClick() }}>Add to favorites</Button> */}
          </div>
        </div>
      </>
    );
  }
}

// MovieView.propTypes = {
//   movie: PropTypes.shape({
//     Title: PropTypes.string.isRequired,
//     Description: PropTypes.string.isRequired,
//     Genre: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired
//     }),
//     Director: PropTypes.shape({
//       Name: PropTypes.string.isRequired,
//       Bio: PropTypes.string.isRequired,
//       Birth: PropTypes.string.isRequired
//     }),
//     ImagePath: PropTypes.string.isRequired
//   }).isRequired
// };