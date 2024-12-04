import React, { useState, useEffect } from "react";
import { SunMedium, Moon, Mail, Lock, Film, Eye, EyeOff } from "lucide-react";
import { Head, Link, useForm } from '@inertiajs/react';

const LoginPage = () => {
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: true,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div
            className={`min-h-screen flex transition-colors duration-300 ${
                isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
        >
            <Head title="Log in" />

            {/* Left Side */}
            <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12">
                <div className="flex items-center mb-8 animate-fade-in">
                    <Film
                        className={`w-12 h-12 ${
                            isDarkMode ? "text-red-500" : "text-red-600"
                        }`}
                    />
                    <h1
                        className={`text-4xl font-bold ml-2 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        JO <span className="text-red-500">BEST</span>
                    </h1>
                </div>
                <p
                    className={`text-xl text-center max-w-md ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                >
                    Discover the ultimate movie streaming experience. Watch
                    thousands of award-winning movies, TV shows, and more on JO
                    BEST.
                </p>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8">
                <div
                    className={`w-full max-w-md p-8 rounded-xl shadow-lg transition-colors duration-300 ${
                        isDarkMode ? "bg-gray-800" : "bg-white"
                    }`}
                >
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() => setIsDarkMode(!isDarkMode)}
                        className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
                            isDarkMode
                                ? "bg-gray-700 text-yellow-300"
                                : "bg-gray-200 text-gray-600"
                        }`}
                    >
                        {isDarkMode ? (
                            <SunMedium className="w-5 h-5" />
                        ) : (
                            <Moon className="w-5 h-5" />
                        )}
                    </button>

                    {/* Mobile Logo */}
                    <div className="lg:hidden flex items-center justify-center mb-8">
                        <Film
                            className={`w-10 h-10 ${
                                isDarkMode ? "text-red-500" : "text-red-600"
                            }`}
                        />
                        <h1
                            className={`text-3xl font-bold ml-2 ${
                                isDarkMode ? "text-white" : "text-gray-900"
                            }`}
                        >
                        JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>

                    <h2
                        className={`text-2xl font-bold mb-6 ${
                            isDarkMode ? "text-white" : "text-gray-900"
                        }`}
                    >
                        Welcome Back
                    </h2>

                    <form onSubmit={submit} className="space-y-6">
                        <div>
                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                Email
                            </label>
                            <div className="relative">
                                <Mail
                                    className={`absolute left-3 top-3 w-5 h-5 ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                    placeholder="Enter your email"
                                    autoComplete="username"
                                />
                            </div>
                            {errors.email && (
                                <span className="text-red-500 text-sm mt-1">{errors.email}</span>
                            )}
                        </div>

                        <div>
                            <label
                                className={`block text-sm font-medium mb-2 ${
                                    isDarkMode
                                        ? "text-gray-300"
                                        : "text-gray-700"
                                }`}
                            >
                                Password
                            </label>
                            <div className="relative">
                                <Lock
                                    className={`absolute left-3 top-3 w-5 h-5 ${
                                        isDarkMode
                                            ? "text-gray-400"
                                            : "text-gray-500"
                                    }`}
                                />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    className={`pl-10 w-full p-3 rounded-lg border transition-colors focus:ring-2 focus:ring-red-500 ${
                                        isDarkMode
                                            ? "bg-gray-700 border-gray-600 text-white"
                                            : "bg-white border-gray-300 text-gray-900"
                                    }`}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-3"
                                >
                                    {showPassword ? (
                                        <EyeOff
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    ) : (
                                        <Eye
                                            className={`w-5 h-5 ${
                                                isDarkMode
                                                    ? "text-gray-400"
                                                    : "text-gray-500"
                                            }`}
                                        />
                                    )}
                                </button>
                            </div>
                            {errors.password && (
                                <span className="text-red-500 text-sm mt-1">{errors.password}</span>
                            )}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) =>
                                        setData('remember', e.target.checked)
                                    }
                                    className="rounded border-gray-300 text-red-600 focus:ring-red-500"
                                />
                                <span
                                    className={`ml-2 text-sm ${
                                        isDarkMode
                                            ? "text-gray-300"
                                            : "text-gray-600"
                                    }`}
                                >
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href={route('password.request')}
                                className={`text-sm font-medium hover:underline ${
                                    isDarkMode
                                        ? "text-red-400 hover:text-red-300"
                                        : "text-red-600 hover:text-red-700"
                                }`}
                            >
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className={`w-full py-3 px-4 rounded-lg font-medium transition-all transform hover:scale-105 ${
                                isDarkMode
                                    ? "bg-red-600 text-white hover:bg-red-700"
                                    : "bg-red-500 text-white hover:bg-red-600"
                            } ${processing && 'opacity-50 cursor-not-allowed'}`}
                        >
                            Sign In
                        </button>

                        <p
                            className={`text-center text-sm ${
                                isDarkMode ? "text-gray-400" : "text-gray-600"
                            }`}
                        >
                            Don't have an account?{" "}
                            <Link
                                href={route("register")}
                                className={`font-medium hover:underline ${
                                    isDarkMode
                                        ? "text-red-400 hover:text-red-300"
                                        : "text-red-600 hover:text-red-700"
                                }`}
                            >
                                Register now
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
