import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import Banner from '../components/Banner'; // Add this import
import Footer from '../components/Footer';
import ChatBot from '../components/ChatBot';
import ModernMoviesGrid from '../components/Movies';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const movieCategories = [
    { title: "Featured Movies", apiUrl: "/movies/featured" },
    { title: "Trending Movies", apiUrl: "/movies/trending" },
    { title: "Action Movies", apiUrl: "/movies/genre/action" },
    { title: "Drama Movies", apiUrl: "/movies/genre/drama" },
  ];

  const handleAddToWishlist = (movie) => {
    if (!wishlist.some(m => m.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const resetChat = () => setMessages([]);

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        isDarkMode
          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white'
          : 'bg-gradient-to-br from-gray-50 to-white text-gray-900'
      }`}
    >
      <NavBar isDarkMode={isDarkMode} wishlist={wishlist} handleLogout={handleLogout} />
      
      {/* Add the Banner component here, passing isDarkMode */}
      <Banner isDarkMode={isDarkMode} />
      
      <main className="pt-24 px-6 max-w-7xl mx-auto">
        {movieCategories.map((category, index) => (
          <ModernMoviesGrid
            key={category.apiUrl}
            title={category.title}
            apiUrl={category.apiUrl}
            isDarkMode={isDarkMode}
            onAddToWishlist={handleAddToWishlist}
          />
        ))}
      </main>

      <Footer isDarkMode={isDarkMode} />
      
      <ChatBot
        isChatOpen={isChatOpen}
        toggleChat={toggleChat}
        resetChat={resetChat}
      />
    </div>
  );
};

export default Home;