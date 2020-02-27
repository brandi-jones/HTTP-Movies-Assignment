import React, { useState, useEffect } from "react";
import { Route } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from 'axios';
import UpdateMovieForm from './Movies/UpdateMovieForm';

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => {
        setMovieList(res.data) 
        console.log(res)
      })
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id"
        render={props => (
        <Movie {...props} addToSavedList={addToSavedList} movieList={movieList} getMovieList={getMovieList}/>
      )}
      />

      <Route path="/update-movie/:id"
        render={props => (
          <UpdateMovieForm {...props} movieList={movieList} setMovieList={setMovieList} getMovieList={getMovieList}/>
        )}
      />
    </>
  );
};

export default App;
