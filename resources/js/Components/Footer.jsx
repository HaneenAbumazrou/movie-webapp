import React from 'react';
import { motion } from 'framer-motion'; // Add this import at the top of your file

const Footer = ({ isDarkMode }) => {
  return (
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
  );
};

export default Footer;
