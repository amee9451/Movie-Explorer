import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../../pages/Home";
import { GetMovies } from "../../utils/fetcher";
import "@testing-library/jest-dom";
import { MemoryRouter } from "react-router-dom";

jest.mock("../../utils/fetcher");

const mockMovies = [
  { Title: "Inception", imdbID: "1", Year: "2010", Poster: "url1" },
  { Title: "Interstellar", imdbID: "2", Year: "2014", Poster: "url2" },
];
describe("Home Component", () => {
  beforeEach(() => {
    localStorage.clear();
    (GetMovies as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
    });
  });

  it("loads favorites from localStorage", () => {
    localStorage.setItem("favorites", JSON.stringify([mockMovies[0]]));
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/inception/i)).toBeInTheDocument();
  });

  it("shows loading state", () => {
    (GetMovies as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("shows error state", () => {
    (GetMovies as jest.Mock).mockReturnValue({ error: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByText(/failed to load movies/i)).toBeInTheDocument();
  });
  it("loads lastSearch from localStorage on mount", () => {
    localStorage.setItem("lastSearch", "marvel");
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>,
    );
    expect(screen.getByDisplayValue("marvel")).toBeInTheDocument();
  });
});
