import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Link } from "@inertiajs/react";

import {
    Send,
    MessageCircle,
    X,
    RefreshCcw,
    Film,
    Star,
    Clock,
    Flame,
    TrendingUp,
    Award,
    PlayCircle,
    Heart,
} from "lucide-react";

const MovieHomepage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isChatOpen, setIsChatOpen] = useState(false);
    const messagesEndRef = useRef(null);

    const featuredMovies = [
        {
            id: 1,
            title: "The Power of Dreams",
            genre: "Sci-Fi Thriller",
            rating: 9.2,
            duration: "2h 45m",
            description:
                "In a world where dreams become reality, one person must navigate between two worlds to save humanity.",
        },
        {
            id: 2,
            title: "Eternal Echo",
            genre: "Drama",
            rating: 8.9,
            duration: "2h 15m",
            description:
                "A touching story about love that transcends time and space, challenging our perception of reality.",
        },
        {
            id: 3,
            title: "The Last Symphony",
            genre: "Musical Drama",
            rating: 9.1,
            duration: "2h 30m",
            description:
                "A prodigy musician's journey through loss, redemption, and the healing power of music.",
        },
    ];



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
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
           {/* Navigation Bar with Logout */}
<div className="absolute top-0 right-0 p-6 z-50">
    <Link
        href={route("logout")}
        method="post"
        as="button"
        className="text-sm font-medium text-red-600 hover:text-red-700 hover:underline"
    >
        Log Out
    </Link>
</div>
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="container mx-auto px-4 py-16">
                    <div className="flex flex-col items-center text-center space-y-8">
                        <Film className="w-16 h-16 text-red-500 animate-pulse" />
                        <h1 className="text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
                            JO BEST{" "}
                        </h1>
                        <p className="text-xl text-gray-300 max-w-2xl">
                            Discover the magic of storytelling through our
                            curated collection of cinematic masterpieces
                        </p>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full flex items-center space-x-2 transform transition hover:scale-105">
                            <PlayCircle className="w-5 h-5" />
                            <span>Explore Now</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Trending Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center mb-8">
                    <Flame className="w-8 h-8 text-red-500 mr-3" />
                    <h2 className="text-3xl font-bold">Trending Now</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {featuredMovies.map((movie) => (
                        <div
                            key={movie.id}
                            className="bg-gray-800 rounded-xl p-6 transform transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold mb-2">
                                        {movie.title}
                                    </h3>
                                    <span className="text-sm text-gray-400">
                                        {movie.genre}
                                    </span>
                                </div>
                                <button className="p-2 rounded-full hover:bg-gray-600 transition-colors">
                                    <Heart className="w-5 h-5 text-red-500" />
                                </button>
                            </div>

                            <p className="text-gray-400 mb-4">
                                {movie.description}
                            </p>

                            <div className="flex items-center justify-between text-sm">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center">
                                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                                        <span>{movie.rating}</span>
                                    </div>
                                    <div className="flex items-center">
                                        <Clock className="w-4 h-4 text-gray-400 mr-1" />
                                        <span>{movie.duration}</span>
                                    </div>
                                </div>
                                <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center space-x-2">
                                    <PlayCircle className="w-4 h-4" />
                                    <span>Watch</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Categories Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center mb-8">
                    <Award className="w-8 h-8 text-red-500 mr-3" />
                    <h2 className="text-3xl font-bold">Top Categories</h2>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {["Action", "Drama", "Comedy", "Thriller"].map(
                        (category) => (
                            <button
                                key={category}
                                className="bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition-all text-center"
                            >
                                <h3 className="text-lg font-semibold">
                                    {category}
                                </h3>
                            </button>
                        )
                    )}
                </div>
            </div>

            {/* Trending Chart */}
            <div className="container mx-auto px-4 py-16">
                <div className="flex items-center mb-8">
                    <TrendingUp className="w-8 h-8 text-red-500 mr-3" />
                    <h2 className="text-3xl font-bold">Weekly Highlights</h2>
                </div>

                <div className="bg-gray-800 rounded-xl p-6">
                    <div className="space-y-4">
                        {[1, 2, 3].map((index) => (
                            <div
                                key={index}
                                className="flex items-center justify-between p-4 hover:bg-gray-700 rounded-lg transition-colors"
                            >
                                <div className="flex items-center space-x-4">
                                    <span className="text-2xl font-bold text-red-500">
                                        #{index}
                                    </span>
                                    <div>
                                        <h3 className="font-semibold">
                                            Trending Movie {index}
                                        </h3>
                                        <p className="text-sm text-gray-400">
                                            10k+ views today
                                        </p>
                                    </div>
                                </div>
                                <PlayCircle className="w-6 h-6 text-gray-400" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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

export default MovieHomepage;
