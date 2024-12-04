import React, { useState } from 'react';
import { SunMedium, Moon, Film, Mail, LogOut } from 'lucide-react';

const VerifyEmail = ({ status }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Handle resend verification logic here
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
        <div className="flex items-center mb-8 animate-fade-in">
          <Film className={`w-12 h-12 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
          <h1 className={`text-4xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          JO <span className="text-red-500">BEST</span>
          </h1>
        </div>
        <p className={`text-xl text-center max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          We're excited to have you join us! Let's make sure we have the right email address to keep you updated.
        </p>
      </div>

      {/* Right Side - Verification Content */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Dark Mode Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
              isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-600'
            }`}
          >
            {isDarkMode ? <SunMedium className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>

          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <Film className={`w-10 h-10 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
            <h1 className={`text-3xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            JO <span className="text-red-500">BEST</span>
            </h1>
          </div>

          <h2 className={`text-2xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
            Verify Your Email
          </h2>

          <div className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Thanks for signing up! Before getting started, could you verify your email address by clicking on the
            link we just emailed to you? If you didn't receive the email, we will gladly send you another.
          </div>

          {status === 'verification-link-sent' && (
            <div className="mb-6 p-4 rounded-lg bg-green-100 text-green-700">
              A new verification link has been sent to the email address you provided during registration.
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex items-center py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } ${isSubmitting && 'opacity-50 cursor-not-allowed'}`}
              >
                <Mail className="w-5 h-5 mr-2" />
                Resend Verification Email
              </button>

              <button
                type="button"
                className={`flex items-center py-2 px-4 rounded-lg font-medium transition-colors ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
