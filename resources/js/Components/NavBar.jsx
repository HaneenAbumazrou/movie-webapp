import React from "react";
import { motion } from "framer-motion";
import { Bookmark, LogOut } from "lucide-react";
import { Link } from "@inertiajs/react"; // Import Link from Inertia.js for navigation

const NavBar = ({ isDarkMode, wishlist, handleLogout }) => {
    return (
        <motion.header
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 flex justify-between items-center shadow-md ${
                isDarkMode
                    ? "bg-gray-800/80 backdrop-blur-md"
                    : "bg-white/80 backdrop-blur-md"
            }`}
        >
            <div className="flex items-center space-x-4">
                <h1 className="text-3xl font-black tracking-tight">Jo Best</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
                {/* Watchlist Link */}
                <Link
                    href="/watchlist" // Inertia.js link to navigate to the watchlist page
                    className="relative p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                    <Bookmark className="w-6 h-6" />
                    {wishlist.length > 0 && (
                        <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1 text-xs">
                            {wishlist.length}
                        </span>
                    )}
                </Link>

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
    );
};

export default NavBar;
