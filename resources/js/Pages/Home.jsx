import React, { useState, useRef, useEffect } from 'react';
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
  Bookmark,
  MessageCircle,
  Send,
  X,
  RefreshCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import ModernMoviesGrid from '../components/Movies';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [wishlist, setWishlist] = useState([]);

  // Chatbot state
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const messagesEndRef = useRef(null);

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
    if (!wishlist.some(m => m.id === movie.id)) {
      setWishlist([...wishlist, movie]);
    }
  };

  const handleLogout = () => {
    console.log('Logging out');
  };

  // Chatbot methods
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setMessages((prev) => [...prev, { text: userMessage, sender: "user" }]);
    setInputMessage("");
    setIsLoading(true);

    try {
      const response = await axios.post("/chatbot", {
        message: userMessage,
      });
      const botMessage = response.data.response;
      setMessages((prev) => [
        ...prev,
        {
          text: botMessage,
          sender: "bot",
          botName: "JO BEST AI ASSISTANT",
        },
      ]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          text: "Sorry, something went wrong. Please try again.",
          sender: "bot",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
      {/* Existing header code remains the same */}
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
        {/* ... previous header content ... */}
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

      {/* Chatbot Component */}
      <div className="fixed bottom-8 right-8 z-50">
        {isChatOpen && (
          <div className="absolute bottom-24 right-0 w-96 h-[500px] rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 ease-in-out bg-gray-800 border border-gray-700">
            <div className="flex justify-between items-center p-4 border-b bg-gray-900 border-gray-700">
              <div className="flex items-center">
                <MessageCircle className="mr-2 text-red-500" />
                <h2 className="text-xl font-bold">
                  JO BEST AI ASSISTANT
                </h2>
              </div>
              <button
                onClick={resetChat}
                className="p-2 rounded-full transition-all bg-gray-700 hover:bg-gray-600"
              >
                <RefreshCcw size={20} />
              </button>
            </div>

            <div className="h-[350px] overflow-y-auto p-4 space-y-4 scrollbar-custom">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`flex items-start ${
                    msg.sender === "user"
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-xl ${
                      msg.sender === "user"
                        ? "bg-red-600"
                        : "bg-gray-700"
                    }`}
                  >
                    {msg.text}
                    {msg.botName && (
                      <div className="text-xs mt-1 opacity-70">
                        - {msg.botName}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form
              onSubmit={handleSubmit}
              className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-900 border-gray-700"
            >
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) =>
                    setInputMessage(e.target.value)
                  }
                  placeholder="Type your message..."
                  className="flex-grow p-2 rounded-lg bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`p-2 rounded-full bg-red-600 hover:bg-red-700 transition-colors ${
                    isLoading ? "opacity-50" : ""
                  }`}
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </div>
        )}

        <button
          onClick={toggleChat}
          className="w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 ease-in-out hover:scale-110 focus:outline-none bg-red-600 hover:bg-red-700"
        >
          {isChatOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .scrollbar-custom::-webkit-scrollbar {
          width: 6px;
        }

        .scrollbar-custom::-webkit-scrollbar-track {
          background: #1f2937;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 3px;
        }

        .scrollbar-custom::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default Home;
