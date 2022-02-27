import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';




export class MainView extends React.Component {

  constructor() {
    super();
    this.state = {
      movies: [
        { _id: 1, Title: 'Inception', Description: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan, who also produced the film with Emma Thomas, his wife. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg', Genre: 'Action, Sci-fi', Director: 'Christopher Nolan' },
        { _id: 2, Title: 'Iron Man', Description: 'Iron Man is a superhero appearing in American comic books published by Marvel Comics.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/0/02/Iron_Man_%282008_film%29_poster.jpg', Genre: 'Action, Sci-fi', Director: 'Jon Favreau' },
        { _id: 3, Title: 'Maleficent', Description: 'Maleficent (Angelina Jolie) rises to protect her peaceful forest kingdom from invaders, but a terrible betrayal turns her pure heart to stone and twists her into a creature bent on revenge.', ImagePath: 'https://upload.wikimedia.org/wikipedia/en/5/55/Maleficent_poster.jpg', Genre: 'Action, Fantasy', Director: 'Joachim Rønning' }
      ],
      selectedMovie: null
    };
  }
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  render() {
    const { movies, selectedMovie } = this.state;
    //if (selectedMovie) return <MovieView movie={selectedMovie} />;
    if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">

        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(newSelectedMovie) => { this.setSelectedMovie(movie) }} />
          ))}
      </div>
    );
  }
}