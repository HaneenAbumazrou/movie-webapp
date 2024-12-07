import React from 'react';
import Movies from '../components/Movies';

const Home = () => {
    return (
        <div>
            <header className="header">
                <h1>Jo Best</h1>
            </header>

            <section className="banner">
                <Movies title="Featured Movies" apiUrl="/movies/featured" />
            </section>

            <Movies title="Trending Movies" apiUrl="/movies/trending" />
            <Movies title="Action Movies" apiUrl="/movies/genre/action" />
            <Movies title="Drama Movies" apiUrl="/movies/genre/drama" />
            <Movies title="Horror Movies" apiUrl="/movies/genre/horror" />
            <Movies title="Sci-Fi Movies" apiUrl="/movies/genre/sci-fi" />
            <Movies title="Romantic Movies" apiUrl="/movies/genre/romantic" />

            <footer className="footer">
                <p>© 2024 Netflix Clone. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Home;
