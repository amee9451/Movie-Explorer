import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from '../../pages/Home';
import { useMovies } from '../../utils/fetcher';
import { sanitizeInput } from '../../utils/sanitizeInput';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

jest.mock('../../utils/fetcher');
jest.mock('../../utils/sanitizeInput');

const mockMovies = [
  { Title: 'Inception', imdbID: '1', Year: '2010', Poster: 'url1' },
  { Title: 'Interstellar', imdbID: '2', Year: '2014', Poster: 'url2' },
];
describe('Home Component', () => {
  beforeEach(() => {
    localStorage.clear();
    (useMovies as jest.Mock).mockReturnValue({
      data: mockMovies,
      isLoading: false,
      error: null,
    });
  });

  it('renders search input and search button', () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByPlaceholderText(/search for a movie/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /search/i })).toBeInTheDocument();
  });

  it('loads favorites from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify([mockMovies[0]]));
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/inception/i)).toBeInTheDocument();
  });

  it('sets query and triggers search on button click', async () => {
    (sanitizeInput as jest.Mock).mockImplementation((input) => input.trim());
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    const input = screen.getByPlaceholderText(/search for a movie/i);
    const button = screen.getByRole('button', { name: /search/i });

    fireEvent.change(input, { target: { value: 'batman ' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(sanitizeInput).toHaveBeenCalledWith('batman ');
      expect(localStorage.getItem('lastSearch')).toBe('batman');
    });
  });

  it('shows loading state', () => {
    (useMovies as jest.Mock).mockReturnValue({ isLoading: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('shows error state', () => {
    (useMovies as jest.Mock).mockReturnValue({ error: true });
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByText(/failed to load movies/i)).toBeInTheDocument();
  });
  it('loads lastSearch from localStorage on mount', () => {
    localStorage.setItem('lastSearch', 'marvel');
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );
    expect(screen.getByDisplayValue('marvel')).toBeInTheDocument();
  });
});
