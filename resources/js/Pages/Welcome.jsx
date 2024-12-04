import React, { useState } from "react";
import { Film, Star, Calendar, Search, User, LogIn } from "lucide-react";

const HomePage = () => {
    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            {/* Header */}
            <header className="flex justify-between items-center p-6 border-b border-gray-700">
                <div className="flex items-center space-x-3">
                    <Film size={40} className="text-red-500" />
                    <h1 className="text-3xl font-bold text-white">JO BEST</h1>
                </div>

                <nav className="flex space-x-6">
                    <a
                        href="#"
                        className="hover:text-red-500 flex items-center"
                    >
                        <Star className="mr-2" size={20} /> Movies
                    </a>
                    <a
                        href="#"
                        className="hover:text-red-500 flex items-center"
                    >
                        <Calendar className="mr-2" size={20} /> Showtimes
                    </a>
                </nav>

                <div className="flex items-center space-x-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search movies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-gray-700 text-white px-4 py-2 rounded-full pr-10 focus:outline-none focus:ring-2 focus:ring-red-500"
                        />
                        <Search
                            className="absolute right-3 top-3 text-gray-400"
                            size={20}
                        />
                    </div>

                    <div className="flex space-x-2">
                        <a href={route("login")}>LOGIN</a>

                        <a href={route("register")}>Register</a>

                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <main className="container mx-auto px-6 py-16">
                <div className="text-center">
                    <h2 className="text-5xl font-bold mb-6">
                        Discover Your Next Favorite Movie
                    </h2>
                    <p className="text-xl text-gray-300 mb-10">
                        Stream, watch, and explore the latest blockbusters and
                        hidden gems
                    </p>
                </div>

                {/* Featured Movies Grid */}
                <div className="grid grid-cols-4 gap-6 mt-12">
                    {[1, 2, 3, 4].map((movie) => (
                        <div
                            key={movie}
                            className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform"
                        >
                            <img
                                src={`/api/placeholder/300/450?text=Movie+${movie}`}
                                alt={`Movie ${movie}`}
                                className="w-full h-[450px] object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-xl font-semibold">
                                    Movie Title {movie}
                                </h3>
                                <div className="flex items-center mt-2">
                                    <Star
                                        className="text-yellow-500 mr-2"
                                        size={20}
                                    />
                                    <span>8.{movie}/10</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8 mt-16">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <Film size={30} className="text-red-500" />
                        <span className="text-2xl font-bold">JO BEST</span>
                    </div>
                    <div className="space-x-6">
                        <a href="#" className="hover:text-red-500">
                            About
                        </a>
                        <a href="#" className="hover:text-red-500">
                            Contact
                        </a>
                        <a href="#" className="hover:text-red-500">
                            Privacy Policy
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomePage;
