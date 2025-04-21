import React from "react";
import { useParams, Link } from "react-router-dom";
import { GetMovieById } from "../utils/fetcher";

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const movieId = id?.trim() ?? "";
  const { data: movie, error, isLoading } = GetMovieById(movieId);

  if (isLoading) {
    return <div className="text-center py-4">Loading movie details...</div>;
  }

  if ((!movie && !isLoading) || movie == null || !movie.Title || error) {
    return <div className="text-center text-red-500">Movie not found.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Link to="/" className="text-blue-600 hover:underline mb-4 inline-block">
        ← Back to search
      </Link>

      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={movie.Poster !== "N/A" ? movie.Poster : "/no-poster.jpg"}
          alt={movie.Title}
          loading="lazy"
          className="w-full md:w-64 rounded shadow"
        />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-2">{movie.Title}</h2>
          <p className="text-gray-700 mb-1">
            <strong>Year:</strong> {movie.Year}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Genre:</strong> {movie.Genre}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Director:</strong> {movie.Director}
          </p>
          <p className="text-gray-700 mb-1">
            <strong>Actors:</strong> {movie.Actors}
          </p>
          <p className="text-gray-700 mb-3">
            <strong>Plot:</strong> {movie.Plot}
          </p>
          <p className="text-sm text-gray-500">
            <strong>IMDB Rating:</strong> {movie.imdbRating}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
