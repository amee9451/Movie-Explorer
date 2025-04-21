import React from "react";
import { Link } from "react-router-dom";
import type { Props } from "../types/movie";

const MovieCard: React.FC<Props> = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <div className="bg-white rounded shadow p-2">
      <Link to={`/movie/${movie.imdbID}`}>
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-full h-64 object-cover mb-2"
        />
        <h3 className="font-semibold">
          {movie.Title} ({movie.Year})
        </h3>
      </Link>
      <button
        data-testid={`toggleFavoriteButton${movie.imdbID}`}
        type="button"
        name="toggleFavoriteButton"
        onClick={() => {
          toggleFavorite(movie);
        }}
        className={`mt-2 text-sm px-2 py-1 rounded ${isFavorite ? "bg-red-500 text-white" : "bg-gray-300"}`}
      >
        {isFavorite ? "Remove Favorite" : "Favorite"}
      </button>
    </div>
  );
};

export default MovieCard;
