import React from "react";
import { Info, Clapperboard } from "lucide-react";
import { Link } from "@inertiajs/react";

const AboutUsPage = () => {
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
            <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-80 z-0"></div>

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
                        // href={route("home")}
                        className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-full transition-transform transform hover:scale-105 flex items-center"
                    >
                        Home <Info className="ml-2 w-5 h-5" />
                    </Link>
                </nav>

                {/* About Us Content */}
                <div className="container mx-auto px-6 py-16 flex items-center justify-center min-h-[calc(100vh-150px)]">
                    <div className="text-center max-w-4xl">
                        <h1 className="text-6xl font-extrabold mb-6 leading-tight">
                            About <span className="text-red-500">JO BEST</span>
                        </h1>
                        <p className="text-xl mb-8 leading-relaxed">
                            At JO BEST, we believe movies are more than just entertainment—they’re an experience. 
                            Our mission is to bring cinematic magic to everyone, everywhere, by offering a curated 
                            collection of blockbuster hits, hidden gems, and exclusive originals. 
                        </p>
                        <p className="text-xl mb-8 leading-relaxed">
                            Founded with a passion for storytelling, JO BEST is committed to delivering high-quality 
                            streaming services and fostering a community of movie lovers. We aim to redefine how you experience entertainment, 
                            whether you’re a casual viewer or a cinema aficionado.
                        </p>
                        <p className="text-xl mb-8 leading-relaxed">
                            Join us as we bring the silver screen closer to you—because at JO BEST, the magic of movies never stops.
                        </p>
                        <div className="flex justify-center space-x-4">
                            <Link
                                // href={route("contact")}
                                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 flex items-center"
                            >
                                Contact Us <Info className="ml-2" />
                            </Link>
                            <Link
                                // href={route("movies")}
                                className="bg-gray-700 hover:bg-gray-800 text-white px-8 py-3 rounded-full transition-transform transform hover:scale-105 flex items-center"
                            >
                                Explore Movies <Clapperboard className="ml-2" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUsPage;
