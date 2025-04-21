// src/components/__tests__/MovieCard.test.tsx

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieCard from "../MovieCard";
import { BrowserRouter } from "react-router-dom";
import { type Movie } from "../../types/movie";

const mockMovie: Movie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Type: "movie",
  Poster: "https://example.com/poster.jpg",
};

describe("MovieCard component", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  const setup = (isFavorite = false): jest.Mock => {
    const toggleFavorite = jest.fn();
    render(
      <BrowserRouter>
        <MovieCard
          movie={mockMovie}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </BrowserRouter>,
    );
    return toggleFavorite;
  };

  it("renders movie details correctly", () => {
    setup();
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/2010/i)).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", mockMovie.Poster);
  });

  it("calls toggleFavorite when favorite button is clicked", () => {
    const toggleFavorite = setup();
    const button = screen.getByRole("button");
    fireEvent.click(button);
    // expect(toggleFavorite).toHaveBeenCalledWith(mockMovie.imdbID);
    expect(toggleFavorite).toHaveBeenCalledWith(mockMovie);
  });

  it("shows correct button text based on favorite state", () => {
    setup(true);
    expect(screen.getByText(/Remove Favorite/i)).toBeInTheDocument();
  });
});
