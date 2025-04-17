import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';
import { useMovies } from '../utils/fetcher';

const Home = () => {
  const [query, setQuery] = useState('');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const saved = localStorage.getItem('favorites');
    return saved ? JSON.parse(saved) : [];
  });
  const { data: movies, error, isLoading } = useMovies(search);
  const toggleFavorite = (movie: Movie): void => {
    let updated;
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);
    if (exists) {
      updated = favorites.filter((fav) => fav.imdbID !== movie.imdbID);
    } else {
      updated = [...favorites, movie];
    }
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  const handleSearch = (query: string): void => {
    setSearch(query);
    localStorage.setItem('lastSearch', query);
  };

  useEffect(() => {
    const savedQuery = localStorage.getItem('lastSearch');
    if (savedQuery) {
      setQuery(savedQuery);
      setSearch(savedQuery);
    }
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🎬 Movie Explorer</h1>

      <div className="flex justify-center mb-6">
        <input
          type="text"
          placeholder="Search for a movie..."
          className="w-full max-w-xl px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch(query)}
        />
        <button
          type="button"
          className="ml-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          onClick={() => handleSearch(query)}
        >
          Search
        </button>
      </div>

      {isLoading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">Failed to load movies. Try again later.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {movies &&
            movies.map((movie: Movie) => {
              return (
                <MovieCard
                  key={movie.imdbID}
                  movie={movie}
                  isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
                  toggleFavorite={toggleFavorite}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Home;
