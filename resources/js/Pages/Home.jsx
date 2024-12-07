import React, { useState } from 'react';
import {
  Flame,
  Clapperboard,
  Rocket,
  Heart,
  Ghost,
  Glasses,
  SunMoon,
  Menu,
  LogOut,
  Bookmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModernMoviesGrid from '../components/Movies';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  const movieCategories = [
    { title: "Featured Movies", apiUrl: "/movies/featured", icon: <Flame />, isFeatured: true },
    { title: "Trending Movies", apiUrl: "/movies/trending", icon: <Clapperboard /> },
    { title: "Action Movies", apiUrl: "/movies/genre/action", icon: <Rocket /> },
    { title: "Drama Movies", apiUrl: "/movies/genre/drama", icon: <Heart /> },
    { title: "Horror Movies", apiUrl: "/movies/genre/horror", icon: <Ghost /> },
    { title: "Sci-Fi Movies", apiUrl: "/movies/genre/sci-fi", icon: <Glasses /> },
    { title: "Romantic Movies", apiUrl: "/movies/genre/romantic", icon: <Heart /> }
  ];

  const handleAddToWishlist = (movie) => {
    // Check if movie is already in wishlist
    if (!wishlist.some(m => m.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out');
    // Typically would involve:
    // - Clearing user session
    // - Removing authentication tokens
    // - Redirecting to login page
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
      }`}
    >
      {/* Header with Logout and Wishlist */}
      <motion.header
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-md ${
          isDarkMode
            ? 'bg-gray-800/80 backdrop-blur-md'
            : 'bg-white/80 backdrop-blur-md'
        }`}
      >
        <div className="flex items-center space-x-4">
          <h1 className="text-3xl font-black tracking-tight">Jo Best</h1>

          {/* Dark Mode Toggle */}

        </div>

        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Wishlist */}
          <button
            className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            onClick={() => {/* Open wishlist modal */}}
          >
            <Bookmark className="w-6 h-6" />
            {wishlist.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {/* Movie Categories */}
        <div className="space-y-12">
          {movieCategories.map((category, index) => (
            <motion.div
              key={category.apiUrl}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.2 }}
            >
              <ModernMoviesGrid
                title={category.title}
                apiUrl={category.apiUrl}
                icon={category.icon}
                isDarkMode={isDarkMode}
                isFeatured={category.isFeatured}
                onAddToWishlist={handleAddToWishlist}
              />
            </motion.div>
          ))}
        </div>
      </main>


      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={`py-6 mt-12 text-center ${
          isDarkMode
            ? 'bg-gray-800 text-gray-300'
            : 'bg-gray-100 text-gray-600'
        }`}
      >
        <p>© 2024 Jo Best. All rights reserved.</p>
        <div className="mt-4 space-x-4">
          <a href="#" className="hover:text-blue-500">Privacy Policy</a>
          <a href="#" className="hover:text-blue-500">Terms of Service</a>
          <a href="#" className="hover:text-blue-500">Contact</a>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home;
