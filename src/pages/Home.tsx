import React, { useState, useEffect } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';
import { useMovies } from '../utils/fetcher';
import { sanitizeInput } from '../utils/sanitizeInput';
import SearchBar from '../components/SearchBar';

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
    const cleaned = sanitizeInput(query);
    setSearch(cleaned);
    localStorage.setItem('lastSearch', cleaned);
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
      <SearchBar handleSearch={handleSearch} initialState={query} />
      <div>
        {isLoading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-400">
            Failed to load movies for <b>{search}</b> keyword.
          </p>
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
    </div>
  );
};

export default Home;
