import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import MovieDetails from '../MovieDetails';
import { useMovieById } from '../../utils/fetcher';
import { Movie } from '../../types/movie';
import type { SWRResponse } from 'swr';

jest.mock('../../utils/fetcher', () => ({
  useMovieById: jest.fn(),
}));

const mockedUseMovieById = useMovieById as jest.MockedFunction<typeof useMovieById>;

// Helper to mock the SWR response shape
const mockSWR = <T,>(overrides: Partial<SWRResponse<T>>): SWRResponse<T> => ({
  data: undefined,
  error: undefined,
  isLoading: false,
  isValidating: false,
  mutate: jest.fn(),
  ...overrides,
});

const mockMovie: Movie = {
  Title: 'Inception',
  Year: '2010',
  imdbID: 'tt1375666',
  Type: 'movie',
  Poster: 'https://example.com/poster.jpg',
  Genre: 'Action, Sci-Fi, Thriller',
  Director: 'Christopher Nolan',
  Actors: 'Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page',
  Plot: 'A thief who steals corporate secrets through use of dream-sharing technology.',
  imdbRating: '8.8',
};

describe('MovieDetails Component', () => {
  it('displays loading state', () => {
    mockedUseMovieById.mockReturnValue(mockSWR({ isLoading: true }));

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Loading movie details/i)).toBeInTheDocument();
  });

  it('displays error state', () => {
    mockedUseMovieById.mockReturnValue(mockSWR({ error: new Error('Not found') }));

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Movie not found/i)).toBeInTheDocument();
  });

  it('displays movie details correctly', () => {
    mockedUseMovieById.mockReturnValue(mockSWR({ data: mockMovie }));

    render(
      <MemoryRouter initialEntries={['/movie/tt1375666']}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/2010/i)).toBeInTheDocument();
    expect(screen.getByText(/Christopher Nolan/i)).toBeInTheDocument();
    expect(screen.getByText(/Leonardo DiCaprio/i)).toBeInTheDocument();
    expect(screen.getByText(/A thief who steals corporate secrets/i)).toBeInTheDocument();
    expect(screen.getByText(/8.8/i)).toBeInTheDocument();
  });
});
