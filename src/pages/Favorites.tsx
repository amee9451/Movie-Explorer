import React, { useEffect, useState } from 'react';
import MovieCard from '../components/MovieCard';
import { Movie } from '../types/movie';

const Favorites = () => {
 const [favorites, setFavorites] = useState<Movie[]>(() => {
  const stored = localStorage.getItem('favorites');
  return stored ? JSON.parse(stored) : [];
});

  useEffect(() => {
    // Get the favorites from localStorage when the component mounts
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

 const toggleFavorite = (movie: Movie) => {
  const exists = favorites.some(fav => fav.imdbID === movie.imdbID);
  const updated = exists
    ? favorites.filter(fav => fav.imdbID !== movie.imdbID)
    : [...favorites, movie];

  setFavorites(updated);
  localStorage.setItem('favorites', JSON.stringify(updated));
};

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorite movies added yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {favorites.map((movie) => (
            <MovieCard
              movie={movie}
              isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
