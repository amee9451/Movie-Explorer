import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieDetails from "../MovieDetails";
import { GetMovieById } from "../../utils/fetcher";
import type { SWRResponse } from "swr";

jest.mock("../../utils/fetcher", () => ({
  GetMovieById: jest.fn(),
}));

const mockedGetMovieById = GetMovieById as jest.MockedFunction<
  typeof GetMovieById
>;

// Helper to mock the SWR response shape
const mockSWR = <T, E = Error>(
  overrides: Partial<SWRResponse<T, E>>,
): SWRResponse<T, E> => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: jest.fn(),
  ...overrides,
});
describe("MovieDetails Component", () => {
  it("displays loading state", () => {
    mockedGetMovieById.mockReturnValue(mockSWR({ isLoading: true }));

    render(
      <MemoryRouter initialEntries={["/movie/tt1375666"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Loading movie details/i)).toBeInTheDocument();
  });

  it("displays error state", () => {
    mockedGetMovieById.mockReturnValue(
      mockSWR({ error: new Error("Not found") }),
    );

    render(
      <MemoryRouter initialEntries={["/movie/tt1375666"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/Movie not found/i)).toBeInTheDocument();
  });
});
