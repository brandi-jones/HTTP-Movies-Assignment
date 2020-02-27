import React, {useState, useEffect} from 'react';
import {useParams} from 'react-router-dom';
import axios from 'axios';

const UpdateMovieForm = props => {

    const [updatedMovie, setUpdatedMovie] = useState({
        id: '',
        title: '',
        director: '',
        metascore: 0,
        stars: []
    })
    const {id} = useParams();

    useEffect(() => {
        const movieToUpdate = props.movieList.find(movie => `${movie.id}` === id);

        if (movieToUpdate) {
            setUpdatedMovie(movieToUpdate);
            console.log("Use effect edited updatedMovie to: ", updatedMovie)
        }

    }, [props.movieList, id])

    const handleChanges = event => {

        setUpdatedMovie({
            ...updatedMovie,
            [event.target.name]: event.target.value
        })
    }

    const handleSubmit = event => {
        event.preventDefault();

        console.log("This is updatedMovie before axios call: ", updatedMovie)
        //make a put request to edit the item
        axios
            .put(`http://localhost:5000/api/movies/${id}`, updatedMovie)
            .then(response => {
                console.log(response)
                props.getMovieList(); //update movie list
                props.history.push(`/`);
            })
            .catch(error => {
                console.log("error with PUT request:", error)
            })
    }


    return(
        <div className="UpdateMovieFormContainer">
            <h2>Update Movie</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title: </label>
                <input 
                    type="text"
                    name="title"
                    onChange={handleChanges}
                    value={updatedMovie.title}
                />

                <label htmlFor="title">Director: </label>
                <input 
                    type="text"
                    name="director"
                    onChange={handleChanges}
                    value={updatedMovie.director}
                />

                <label htmlFor="metascore">Metascore: </label>
                <input 
                    type="text"
                    name="metascore"
                    onChange={handleChanges}
                    value={updatedMovie.metascore}
                />

                <button>Update Movie</button>

            </form>
        </div>
    );
}

export default UpdateMovieForm