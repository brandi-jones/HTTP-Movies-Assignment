import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch } from 'react-router-dom';
import MovieCard from './MovieCard';


function Movie( props) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();

  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };


  //handle update button
  const handleUpdate = (event) => {
    event.preventDefault();
    console.log("handleUpdate:", props)
    props.history.push(`/update-movie/${movie.id}`)
  }

  //handle delete button
const handleDelete = (event) => {
  event.preventDefault();
  axios
    .delete(`http://localhost:5000/api/movies/${movie.id}`)
    .then(response => {
      console.log(response);
      props.getMovieList();
      props.history.push('/');
    })
    .catch(error => {
      console.log("Error deleting movie:", error)
    })
}

  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />

      <div className='save-button' onClick={saveMovie}>
        Save
      </div>

      <div className='edit-button' onClick={handleUpdate}>
        Edit
      </div>

      <div className='delete-button' onClick={handleDelete}>
        Delete
      </div>

    </div>
  );
}

export default Movie;
