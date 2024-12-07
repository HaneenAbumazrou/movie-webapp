import React, { useEffect, useState } from 'react';
import { Play, Bookmark } from 'lucide-react';
import axios from 'axios';
import MoviePopup from '../components/PopupMovie';

const Banner = ({ isDarkMode }) => {
  const [backgroundImage, setBackgroundImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [movie, setMovie] = useState(null);  // Store selected movie details
  const [showPopup, setShowPopup] = useState(false); // Control popup visibility

  // Fetch a random movie background image and details
  useEffect(() => {
    setLoading(true);
    setError(null);

    axios.get('/movies/random') // Assuming your API returns a random movie
      .then(response => {
        setBackgroundImage(response.data.poster_url); // Set background image
        setMovie(response.data); // Set movie details
      })
      .catch(err => {
        setError("Failed to fetch random movie data.");
        console.error("Error fetching movie data:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // Fallback if the background image is not available
  const getBackgroundImage = () => {
    if (loading) return '/movie-banner-bg.jpg'; // Placeholder image while loading
    if (error) return '/movie-banner-error.jpg'; // Fallback image in case of an error
    return backgroundImage || '/movie-banner-bg.jpg'; // Default background if none found
  };

  // Show the popup when 'Watch Now' is clicked
  const handleWatchNowClick = () => {
    setShowPopup(true);
  };

  // Close the popup
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="relative w-full h-[80vh] overflow-hidden">
      {/* Background Overlay */}
      <div 
        className={`absolute inset-0 bg-cover bg-center opacity-50`}
        style={{
          backgroundImage: `linear-gradient(to right, 
            ${isDarkMode ? 'rgba(17,24,39,0.9)' : 'rgba(255,255,255,0.9)'}, 
            ${isDarkMode ? 'rgba(17,24,39,0.6)' : 'rgba(255,255,255,0.6)'}), 
            url(${getBackgroundImage()})`,
          backgroundBlendMode: 'overlay'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-2xl space-y-6">
          <h1 className={`text-5xl font-bold leading-tight tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Discover Cinematic Worlds
          </h1>
          
          <p className={`text-xl font-medium opacity-80 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Explore thousands of movies, create your watchlist, and dive into the magic of cinema.
          </p>
          
          {/* Call to Action Buttons */}
          <div className="flex space-x-4">
            <button 
              onClick={handleWatchNowClick}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-red-500 text-white hover:bg-red-600'}`}
            >
              <Play className="w-5 h-5" />
              <span>Watch Now</span>
            </button>
            
            <button 
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105 ${isDarkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-200 text-gray-900 hover:bg-gray-300'}`}
            >
              <Bookmark className="w-5 h-5" />
              <span>My Watchlist</span>
            </button>
          </div>
        </div>
      </div>

      {/* Film Reel Decorative Elements */}
      <div 
        className={`absolute bottom-0 left-0 right-0 h-16 ${isDarkMode ? 'bg-gray-800/50' : 'bg-gray-100/50'}`}
        style={{
          backgroundImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.1) 50%, transparent 100%)',
          backgroundSize: '100px 100%',
          backgroundRepeat: 'repeat-x'
        }}
      />

      {/* Movie Popup */}
      {showPopup && <MoviePopup movie={movie} isDarkMode={isDarkMode} onClose={closePopup} />}
    </div>
  );
};

export default Banner;
