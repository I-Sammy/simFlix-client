import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { setMovies, setUser, setFavorites, setDirectors, setGenres, } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import { NavbarView } from '../navbar/navbar';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { ProfileView } from '../profile-view/profile-view';
import { MovieView } from '../movie-view/movie-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

class MainView extends React.Component {

  constructor() {
    super();
    // Initial state is set to null
    this.state = {
      user: null
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }


  getMovies(token) {
    axios.get('https://zoehime.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        //this.setMovies(response.data);
        this.setState({
          movies: response.data
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  /* When a user successfully logs in, this function updates the `user` property in state to that *particular user*/

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // Delete account
  onDeleteUser() {
    const Username = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://zoehime.herokuapp.com/users/${Username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);

        localStorage.removeItem("user");
        localStorage.removeItem("token");
        this.setState({
          user: null,
        });
        alert("Profile deleted");
        window.open("/", "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    //let { movies } = this.props;
    //let { user } = this.state;
    const { movies, user } = this.state;
    return (

      <Router>
        < NavbarView user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route exact path="/" render={() => {
              if (!user) return (
                <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
              )
              // If movie list is empty (while movies load from API), display empty page
              //if (movies.length === 0) return <div className="main-view" />;
              return <MoviesList movies={movies} />;
            }} />

            <Route path="/" />
            <Route path="/register" render={() => {
              if (user) return <Redirect to="/movies" />
              return <Col lg={8} md={8}>
                <RegistrationView />
              </Col>
            }} />

            <Route path="/movies/:movieId" render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              return <Col>
                <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
              </Col>
            }} />

            <Route path={"/directors/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <DirectorView movies={movies} director={movies.find(m => m.Director.Name === match.params.name).Director} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />

            <Route path={"/genres/:name"} render={({ match, history }) => {
              if (!user) return <Redirect to="/" />
              // If movie list is empty (while movies load from API), display empty page
              if (movies.length === 0) return <div className="main-view" />;
              return (
                <Col xs={12} md={10}>
                  <GenreView movies={movies} genre={movies.find(m => m.Genre.Name === match.params.name).Genre} onBackClick={() => history.goBack()} />
                </Col>
              )
            }} />
            <Route path="/profile" render={({ history }) => {
              if (!user) {
                return (
                  <Col>
                    <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                  </Col>
                );
              }

              return (
                <Col md={8}>
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                </Col>
              );
            }} />
          </Row>
        </Container>
      </Router>


    );
    <button onClick={() => { this.onLoggedOut() }}>Logout</button>

  }
}

let mapStateToProps = state => {
  return { movies: state.movies, user: state.user }
}

const mapDispatchToProps = dispatch => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    setMovies: (movies) => {
      dispatch(setMovies(movies))
    }
  }
}

//export default connect(mapStateToProps, { setMovies, setUser })(MainView);
export default connect(mapStateToProps, mapDispatchToProps)(MainView);