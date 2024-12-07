import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Import the MovieCard component
import MovieCard from '../components/MovieCard';

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
              <MovieCard
                movie={movie}
                isDarkMode={isDarkMode}
                isInWishlist={wishlist.some(m => m.id === movie.id)}
                addToWishlist={addToWishlist}
                removeFromWishlist={removeFromWishlist}
                onWatchNow={() => {}}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
            isDarkMode={isDarkMode}
            isInWishlist={wishlist.some(m => m.id === movie.id)}
            addToWishlist={addToWishlist}
            removeFromWishlist={removeFromWishlist}
            onWatchNow={() => {}}
          />
        ))}
      </div>
    );
  };

  if (loading) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'}`}
    >
      {/* Loading state content */}
    </motion.div>
  );

  if (error) return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'}`}
    >
      {/* Error state content */}
    </motion.div>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`w-full p-8 rounded-3xl shadow-2xl ${isDarkMode ? 'bg-gradient-to-br from-gray-900 to-gray-800' : 'bg-gradient-to-br from-white to-gray-50'}`}
    >
      <div className="flex items-center space-x-6 mb-8">
        {React.isValidElement(icon) && React.cloneElement(icon, {
          className: `w-10 h-10 ${isDarkMode ? 'text-white' : 'text-gray-800'}`
        })}
        <h2 className={`text-3xl font-extrabold tracking-tight ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h2>
      </div>

      {movies.length > 0 ? renderMovies() : (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`text-center text-xl font-medium ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}
        >
          No movies found
        </motion.p>
      )}
    </motion.div>
  );
};

export default ModernMoviesGrid;
