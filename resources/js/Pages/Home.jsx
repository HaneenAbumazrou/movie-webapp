import React from 'react';
import {
  Clapperboard,
  Flame,
  Rocket,
  Drama,
  Ghost,
  Heart,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import Movies from '../components/Movies';

const Home = () => {
  return (
    <div className="bg-black text-white min-h-screen">
      {/* Header */}
      <header className="bg-red-600 text-white py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <Clapperboard className="mr-3" size={32} />
          <h1 className="text-2xl font-bold">Jo Best</h1>
        </div>
        <nav className="space-x-4">
          <a href="#" className="hover:text-red-200 transition">Home</a>
          <a href="#" className="hover:text-red-200 transition">Movies</a>
          <a href="#" className="hover:text-red-200 transition">TV Shows</a>
        </nav>
      </header>

      {/* Featured Movies Banner */}
      <section className="relative">
        <Movies
          title="Featured Movies"
          apiUrl="/movies/featured"
          className="px-6 py-10"
          renderAs="banner"
        />
      </section>

      {/* Movie Genres Sections */}
      <div className="px-6 space-y-8">
        {/* Trending Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Flame className="mr-2 text-red-600" />
              Trending Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Trending Movies" apiUrl="/movies/trending" />
        </section>

        {/* Action Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Rocket className="mr-2 text-red-600" />
              Action Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Action Movies" apiUrl="/movies/genre/action" />
        </section>

        {/* Drama Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Drama className="mr-2 text-red-600" />
              Drama Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Drama Movies" apiUrl="/movies/genre/drama" />
        </section>

        {/* Horror Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Ghost className="mr-2 text-red-600" />
              Horror Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Horror Movies" apiUrl="/movies/genre/horror" />
        </section>

        {/* Sci-Fi Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Rocket className="mr-2 text-red-600" />
              Sci-Fi Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Sci-Fi Movies" apiUrl="/movies/genre/sci-fi" />
        </section>

        {/* Romantic Movies */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold flex items-center">
              <Heart className="mr-2 text-red-600" />
              Romantic Movies
            </h2>
            <div className="flex space-x-2">
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronLeft size={20} />
              </button>
              <button className="bg-red-600 p-2 rounded-full hover:bg-red-700 transition">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
          <Movies title="Romantic Movies" apiUrl="/movies/genre/romantic" />
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-red-600 text-white py-6 px-6 text-center">
        <p>© 2024 Netflix Clone. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
