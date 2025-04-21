import React, { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { type Movie } from "../types/movie";

const Favorites: React.FC = () => {
  const [favorites, setFavorites] = useState<Movie[]>(() => {
    const stored = localStorage.getItem("favorites");
    if (typeof stored === "string" && stored.trim() !== "") {
      try {
        const parsed = JSON.parse(stored);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (typeof storedFavorites === "string" && storedFavorites.trim() !== "") {
      try {
        const parsed: unknown = JSON.parse(storedFavorites);
        if (Array.isArray(parsed)) {
          setFavorites(parsed as Movie[]);
        }
      } catch {
        // Invalid JSON; fallback silently
      }
    }
  }, []);

  const toggleFavorite = (movie: Movie): void => {
    const exists = favorites.some((fav) => fav.imdbID === movie.imdbID);
    const updated = exists
      ? favorites.filter((fav) => fav.imdbID !== movie.imdbID)
      : [...favorites, movie];

    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
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
              key={movie.imdbID}
              movie={movie}
              isFavorite={favorites.some((fav) => fav.imdbID === movie.imdbID)}
              toggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
