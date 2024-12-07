import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  BookmarkPlus, 
  BookmarkCheck, 
  Star, 
  PlayCircle 
} from 'lucide-react';

const MovieCard = ({ 
  movie, 
  isDarkMode, 
  isInWishlist, 
  addToWishlist, 
  removeFromWishlist,
  onWatchNow
}) => {
  return (
    <motion.div
      key={movie.id}
      layout
      whileHover={{
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      whileTap={{ scale: 0.95 }}
      className="relative group overflow-hidden rounded-2xl shadow-2xl transform transition-all duration-300 hover:shadow-2xl"
    >
      <div className="relative">
        {/* Movie Poster */}
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
        />
        
        {/* Wishlist Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              isInWishlist
                ? removeFromWishlist(movie.id)
                : addToWishlist(movie);
            }}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode 
                ? 'bg-gray-900/70 hover:bg-gray-900/90' 
                : 'bg-white/80 hover:bg-white'
            }`}
          >
            {isInWishlist ? (
              <BookmarkCheck className="w-6 h-6 text-green-500" />
            ) : (
              <BookmarkPlus className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>
        
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 
          flex flex-col items-center justify-center transition-all duration-300 
          opacity-0 group-hover:opacity-100 space-y-4">
          {/* Trailer Button */}
          <a
            href={movie.trailer_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 
            text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            <Play className="w-6 h-6" />
            <span>Trailer</span>
          </a>
          
          {/* Watch Now Button */}
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onWatchNow(movie);
            }}
            className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 
            text-white px-6 py-3 rounded-full transition-all duration-300 
            transform hover:scale-105"
          >
            <PlayCircle className="w-6 h-6" />
            <span>Watch Now</span>
          </button>
        </div>
      </div>
      
      {/* Movie Details */}
      <div
        className={`p-5 ${
          isDarkMode 
            ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white' 
            : 'bg-gradient-to-br from-white to-gray-100 text-gray-900'
        } transition-colors duration-300 group-hover:bg-opacity-90`}
      >
        <div className="flex items-center justify-between">
          {/* Movie Title */}
          <p className="font-bold text-lg truncate flex-grow pr-2">
            {movie.title}
          </p>
          
          {/* Rating */}
          <div className="flex items-center space-x-1">
            <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
            <span className="text-sm font-semibold">
              {movie.rating || 'N/A'}
            </span>
          </div>
        </div>
        
        {/* Additional Movie Info */}
        <div className="mt-2 flex justify-between items-center">
          <span className="text-sm opacity-70">
            {movie.year || 'TBA'}
          </span>
          <span 
            className={`text-sm font-medium ${
              isDarkMode 
                ? 'text-gray-300' 
                : 'text-gray-600'
            }`}
          >
            {movie.genre || 'Mixed'}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default MovieCard;