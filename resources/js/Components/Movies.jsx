import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play,
  Film,
  Clapperboard,
  Star,
  Heart,
  BookmarkPlus,
  BookmarkCheck
} from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ModernMoviesGrid = ({
  title,
  apiUrl,
  icon,
  isDarkMode,
  isFeatured = false,
  onAddToWishlist
}) => {
  const [movies, setMovies] = useState([]);
  const [wishlist, setWishlist] = useState([]);
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

  const addToWishlist = (movie) => {
    const updatedWishlist = [...wishlist, movie];
    setWishlist(updatedWishlist);
    onAddToWishlist?.(movie);
  };

  const removeFromWishlist = (movieId) => {
    const updatedWishlist = wishlist.filter(m => m.id !== movieId);
    setWishlist(updatedWishlist);
  };

  const renderMovieCard = (movie) => {
    const isInWishlist = wishlist.some(m => m.id === movie.id);

    return (
      <motion.div
        key={movie.id}
        layout
        whileHover={{
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
        whileTap={{ scale: 0.95 }}
        className="relative group overflow-hidden rounded-2xl shadow-xl transform transition-all duration-300"
      >
        <a
          href={movie.trailer_url}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative"
        >
          <div className="relative">
            <img
              src={movie.poster_url}
              alt={movie.title}
              className="w-full h-80 object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute top-4 right-4 z-10">
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  isInWishlist
                    ? removeFromWishlist(movie.id)
                    : addToWishlist(movie);
                }}
                className="bg-white/80 p-2 rounded-full hover:bg-white/90 transition-colors"
              >
                {isInWishlist ? (
                  <BookmarkCheck className="w-6 h-6 text-green-600" />
                ) : (
                  <BookmarkPlus className="w-6 h-6 text-gray-800" />
                )}
              </button>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50
              flex items-center justify-center transition-all duration-300 opacity-0 group-hover:opacity-100">
              <Play
                className="w-16 h-16 text-white transform scale-0 group-hover:scale-100
                transition-all duration-300 drop-shadow-lg"
              />
            </div>
          </div>
          <div
            className={`p-5 ${
              isDarkMode
                ? 'bg-gray-800 text-white'
                : 'bg-white text-gray-900'
            } transition-colors duration-300 group-hover:bg-opacity-90`}
          >
            <div className="flex items-center justify-between">
              <p className="font-bold text-lg truncate flex-grow pr-2">{movie.title}</p>
              <div className="flex items-center space-x-1">
                <Star className="w-5 h-5 text-yellow-400" />
                <span className="text-sm font-semibold">
                  {movie.rating || 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </a>
      </motion.div>
    );
  };

  // Render logic for featured slider or grid
  const renderMovies = () => {
    if (isFeatured) {
      return (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 4 }
          }}
          className="w-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              {renderMovieCard(movie)}
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map(renderMovieCard)}
      </div>
    );
  };

  // Loading state
  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
      }`}
    >
      {/* Loading content remains the same as previous design */}
    </motion.div>
  );

  // Error state
  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
      }`}
    >
      {/* Error content remains the same as previous design */}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${
        isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'
      }`}
    >
      <div className="flex items-center space-x-6 mb-8">
        {React.cloneElement(icon, {
          className: `w-10 h-10 ${isDarkMode ? 'text-white' : 'text-gray-800'}`
        })}
        <h2 className={`text-3xl font-extrabold tracking-tight ${
          isDarkMode ? 'text-white' : 'text-gray-900'
        }`}>
          {title}
        </h2>
      </div>

      {movies.length > 0 ? renderMovies() : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-xl font-medium ${
            isDarkMode ? 'text-gray-400' : 'text-gray-600'
          }`}
        >
          No movies found
        </motion.p>
      )}
    </motion.div>
  );
};

export default ModernMoviesGrid;
