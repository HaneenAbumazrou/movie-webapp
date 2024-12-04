import React, { useState, useEffect } from 'react';
import { SunMedium, Moon, Mail, Lock, Film, Eye, EyeOff, User } from 'lucide-react';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit = (e) => {
    e.preventDefault();
    post(route('register'));
  };

  return (
    <div className={`min-h-screen flex transition-colors duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Head title="Register" />

      {/* Left Side */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
        <div className="flex items-center mb-8 animate-fade-in">
          <Film className={`w-12 h-12 ${isDarkMode ? 'text-red-500' : 'text-red-600'}`} />
          <h1 className={`text-4xl font-bold ml-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          JO <span className="text-red-500">BEST</span>
          </h1>
        </div>
        <p className={`text-xl text-center max-w-md ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Join our community of movie enthusiasts. Create your account to access unlimited movies, personalized recommendations, and exclusive content.
        </p>
      </div>

      {/* Right Side - Registration Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
        <div className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
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
            Create Account
          </h2>

          <form onSubmit={submit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Name
              </label>
              <div className="relative">
                <User className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your name"
                  required
                  autoComplete="name"
                />
              </div>
              {errors.name && <span className="text-red-500 text-sm mt-1">{errors.name}</span>}
            </div>

            {/* Email Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email
              </label>
              <div className="relative">
                <Mail className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Enter your email"
                  required
                  autoComplete="username"
                />
              </div>
              {errors.email && <span className="text-red-500 text-sm mt-1">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Create a password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3"
                >
                  {showPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.password && <span className="text-red-500 text-sm mt-1">{errors.password}</span>}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Confirm Password
              </label>
              <div className="relative">
                <Lock className={`absolute left-3 top-3 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="password_confirmation"
                  name="password_confirmation"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                    isDarkMode
                      ? 'bg-gray-700 border-gray-600 text-white'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  placeholder="Confirm your password"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-3"
                >
                  {showConfirmPassword ? (
                    <EyeOff className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  ) : (
                    <Eye className={`w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  )}
                </button>
              </div>
              {errors.password_confirmation && (
                <span className="text-red-500 text-sm mt-1">{errors.password_confirmation}</span>
              )}
            </div>

            <div className="flex items-center justify-between">
              <Link
                href={route('login')}
                className={`text-sm hover:underline ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Already registered?
              </Link>

              <button
                type="submit"
                disabled={processing}
                className={`py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 ${
                  isDarkMode
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-red-500 text-white hover:bg-red-600'
                } ${processing && 'opacity-50 cursor-not-allowed'}`}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
