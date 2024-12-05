import React from "react";
import { Clapperboard, Play } from "lucide-react";
import { Link } from "@inertiajs/react";

const WelcomePage = () => {
    const movieBackground = "/images/background.jpg";

    return (
        <div className="min-h-screen bg-black text-white relative overflow-hidden">
            {/* Background with Opacity */}
            <div
                className="absolute inset-0 bg-cover bg-center opacity-40 z-0"
                style={{
                    backgroundImage: `url(${movieBackground})`,
                }}
            ></div>

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 z-0"></div>

            {/* Content */}
            <div className="relative z-10">
                {/* Navbar */}
                <nav className="flex justify-between items-center p-6">
                    <div className="flex items-center">
                        <Clapperboard className="w-10 h-10 text-red-500 mr-3" />
                        <h1 className="text-3xl font-bold">
                            JO <span className="text-red-500">BEST</span>
                        </h1>
                    </div>
                    <Link
                        href={route("login")}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-colors flex items-center"
                    >
                        Login <Play className="ml-2 w-5 h-5" />
                    </Link>
                </nav>

                {/* Hero Content */}
                <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-100px)]">
                    <div className="text-center max-w-3xl">
                        <h1 className="text-6xl font-black mb-6 leading-tight">
                            Welcome to{" "}
                            <span className="text-red-500">JO BEST</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed">
                            Dive into a world of unlimited entertainment. JO
                            BEST brings you the latest blockbusters, timeless
                            classics, and exclusive originals right at your
                            fingertips. Stream anytime, anywhere, and transform
                            your movie-watching experience.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                href={route("register")}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-colors flex items-center"
                            >
                                Get Started <Play className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WelcomePage;
