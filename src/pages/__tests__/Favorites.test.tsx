import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "../Favorites";
import { MemoryRouter } from "react-router-dom";
import { type Movie } from "../../types/movie";

// Mock the MovieCard component
jest.mock("../../components/MovieCard", () => {
  const MockMovieCard = ({
    movie,
    isFavorite,
    toggleFavorite,
    ...rest
  }: {
    movie: Movie;
    isFavorite?: boolean;
    toggleFavorite: (movie: Movie) => void;
    [key: string]: unknown;
  }) => (
    <div data-testid="movie-card" {...rest}>
      <p>{movie.Title}</p>
      <button
        type="button"
        onClick={() => {
          toggleFavorite(movie);
        }}
      >
        {isFavorite === true ? "Remove Favorite" : "Add to Favorites"}
      </button>
    </div>
  );

  MockMovieCard.displayName = "MockMovieCard";
  return MockMovieCard;
});

// Sample mock data
const mockFavoriteMovies: Movie[] = [
  {
    Title: "Inception",
    Year: "2010",
    imdbID: "tt1375666",
    Type: "movie",
    Poster: "https://example.com/poster.jpg",
    Genre: "Action, Comedy, Drama",
    Director: "Dijo Jose Antony",
    Actors: "Nivin Pauly, Dhyan Sreenivasan, Anaswara Rajan",
    Plot: "An unemployed young man",
  },
];

describe("Favorites Page", (): void => {
  it("renders favorite movies from localStorage", (): void => {
    localStorage.setItem("favorites", JSON.stringify(mockFavoriteMovies));
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Favorite/i)).toBeInTheDocument();
  });

  it("shows a message when there are no favorites", (): void => {
    localStorage.removeItem("favorites");
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/No favorite movies added yet./i),
    ).toBeInTheDocument();
  });

  it("handles valid non-array data in localStorage gracefully", (): void => {
    localStorage.setItem("favorites", JSON.stringify([]));
    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );
    expect(
      screen.getByText(/No favorite movies added yet./i),
    ).toBeInTheDocument();
  });

  it("adds and removes a movie from favorites correctly", (): void => {
    const mockMovie: Movie = {
      Title: "Inception",
      Year: "2010",
      imdbID: "tt1375666",
      Type: "movie",
      Poster: "https://example.com/poster.jpg",
      Genre: "Action",
      Director: "Nolan",
      Actors: "Leonardo DiCaprio",
      Plot: "A dream within a dream",
    };

    // Set the movie as initial favorite
    localStorage.setItem("favorites", JSON.stringify([mockMovie]));

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>,
    );

    // Check that the movie renders and the button is visible
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();

    const removeBtn = screen.getByRole("button", { name: /Remove Favorite/i });
    fireEvent.click(removeBtn);

    // Now the movie should be removed from localStorage
    const updated = JSON.parse(localStorage.getItem("favorites") ?? "[]");
    expect(Array.isArray(updated)).toBe(true);
    expect(updated).toHaveLength(0);
  });
});
