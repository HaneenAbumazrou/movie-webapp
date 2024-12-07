import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Movies = ({ title, apiUrl }) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        axios.get(apiUrl)
            .then((response) => {
                setMovies(response.data);
            })
            .catch((err) => {
                setError("Failed to fetch movies.");
                console.error("Error fetching movies:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [apiUrl]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="movies-section">
            <h2>{title}</h2>
            <div className="movies-list">
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div key={movie.id} className="movie-item">
                            <a href={movie.trailer_url} target="_blank" rel="noopener noreferrer">
                                <img src={movie.poster_url} alt={movie.title} />
                            </a>
                            <p>{movie.title}</p>
                        </div>
                    ))
                ) : (
                    <p>No movies found</p>
                )}
            </div>
        </div>
    );
};

export default Movies;
