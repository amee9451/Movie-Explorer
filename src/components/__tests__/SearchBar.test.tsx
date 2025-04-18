import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';
import axios from 'axios';
import { Movie } from '../../types/movie';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('SearchBar', () => {
  const mockMovies: Movie[] = [
    {
      Title: 'Inception',
      Year: '2010',
      imdbID: 'tt1375666',
      Type: 'movie',
      Poster: 'https://example.com/poster.jpg',
    },
  ];

  const mockSetMovies = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input and button', () => {
    render(<SearchBar setMovies={mockSetMovies} />);
    expect(screen.getByPlaceholderText(/Search for movies/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('calls API and sets movies on search', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { Search: mockMovies } });

    render(<SearchBar setMovies={mockSetMovies} />);

    const input = screen.getByPlaceholderText(/Search for movies/i);
    fireEvent.change(input, { target: { value: 'Inception' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.stringContaining('s=Inception'));
      expect(mockSetMovies).toHaveBeenCalledWith(mockMovies);
    });
  });

  it('handles no results from API', async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { Search: undefined } });

    render(<SearchBar setMovies={mockSetMovies} />);

    const input = screen.getByPlaceholderText(/Search for movies/i);
    fireEvent.change(input, { target: { value: 'Nonexistent Movie' } });

    const button = screen.getByRole('button', { name: /search/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSetMovies).toHaveBeenCalledWith([]);
    });
  });
});
