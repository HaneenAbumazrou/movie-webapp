import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Heart,
    BookmarkPlus,
    LogOut,
    User
} from 'lucide-react';

const Movies = ({
    title,
    apiUrl,
    renderAs = 'slider',
    onAddToWishlist
}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

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

    const handleSlideLeft = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft -= 250;
            setCurrentSlide(prev => Math.max(0, prev - 1));
        }
    };

    const handleSlideRight = () => {
        if (sliderRef.current) {
            sliderRef.current.scrollLeft += 250;
            setCurrentSlide(prev => Math.min(movies.length - 1, prev + 1));
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-64 bg-black text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
        </div>
    );

    if (error) return (
        <div className="text-red-500 text-center p-4 bg-black">
            {error}
        </div>
    );

    // Banner style for featured movies
    if (renderAs === 'banner' && movies.length > 0) {
        const featuredMovie = movies[0];
        return (
            <div
                className="relative h-[70vh] bg-cover bg-center flex items-end p-10"
                style={{
                    backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.8)), url(${featuredMovie.poster_url})`,
                    backgroundSize: 'cover'
                }}
            >
                <div className="text-white max-w-xl">
                    <h1 className="text-4xl font-bold mb-4">{featuredMovie.title}</h1>
                    <p className="mb-4 text-gray-300">{featuredMovie.description}</p>
                    <div className="flex items-center space-x-4">
                        <a
                            href={featuredMovie.trailer_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-red-600 px-6 py-3 rounded-full hover:bg-red-700 transition flex items-center"
                        >
                            Watch Trailer
                        </a>
                        <div className="flex items-center space-x-2">
                            <Star fill="yellow" className="text-yellow-500" />
                            <span>{featuredMovie.rating}/10</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="movies-section relative">
            <div
                ref={sliderRef}
                className="flex overflow-x-auto scroll-smooth no-scrollbar space-x-4 py-4"
                style={{ scrollSnapType: 'x mandatory' }}
            >
                {movies.length > 0 ? (
                    movies.map((movie) => (
                        <div
                            key={movie.id}
                            className="flex-shrink-0 w-48 bg-neutral-900 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition duration-300 relative group"
                        >
                            <a
                                href={movie.trailer_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block"
                            >
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-full h-72 object-cover"
                                />
                            </a>
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => onAddToWishlist(movie)}
                                    className="bg-red-600/80 hover:bg-red-600 p-2 rounded-full"
                                    title="Add to Wishlist"
                                >
                                    <BookmarkPlus size={20} className="text-white" />
                                </button>
                            </div>
                            <div className="p-3">
                                <h3 className="text-white font-semibold truncate">{movie.title}</h3>
                                <div className="flex items-center text-yellow-500 mt-1">
                                    <Star fill="currentColor" size={16} />
                                    <span className="ml-1 text-sm text-gray-300">{movie.rating}/10</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-white">No movies found</p>
                )}
            </div>

            {/* Navigation Buttons */}
            {movies.length > 5 && (
                <div className="absolute top-1/2 transform -translate-y-1/2 w-full flex justify-between">
                    <button
                        onClick={handleSlideLeft}
                        className="bg-red-600/50 hover:bg-red-600/70 text-white p-2 rounded-full"
                    >
                        <ChevronLeft />
                    </button>
                    <button
                        onClick={handleSlideRight}
                        className="bg-red-600/50 hover:bg-red-600/70 text-white p-2 rounded-full"
                    >
                        <ChevronRight />
                    </button>
                </div>
            )}
        </div>
    );
};

export default Movies;
