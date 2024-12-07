import React, { useState, useEffect } from "react";
import axios from "axios";

const Watchlist = () => {
    const [watchlist, setWatchlist] = useState([]);

    useEffect(() => {
        // Fetch the watchlist (favorites) from the API
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get("/favorites");
                setWatchlist(response.data); // Assuming the API returns an array of movie objects
            } catch (error) {
                console.error("Error fetching watchlist:", error);
            }
        };

        fetchWatchlist();
    }, []);

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">My Watchlist</h1>

            {watchlist.length === 0 ? (
                <p className="text-lg text-gray-500">
                    Your watchlist is empty.
                </p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {watchlist.map((movie) => (
                        <div
                            key={movie.id}
                            className="relative group overflow-hidden rounded-2xl shadow-lg transform transition-all duration-300 hover:shadow-xl"
                        >
                            <div className="relative">
                                <img
                                    src={movie.poster_url}
                                    alt={movie.title}
                                    className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                                <div className="absolute top-4 right-4 z-20">
                                    {/* Optionally, add a button to remove movie from the watchlist */}
                                </div>
                            </div>

                            <div className="p-4 bg-gradient-to-br from-gray-900 to-gray-800 text-white transition-colors duration-300 group-hover:bg-opacity-90">
                                <h3 className="font-bold text-lg truncate">
                                    {movie.title}
                                </h3>
                                <div className="flex items-center space-x-2">
                                    <span className="text-sm">
                                        {movie.year}
                                    </span>
                                    <span className="text-sm">
                                        {movie.genre}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Watchlist;
