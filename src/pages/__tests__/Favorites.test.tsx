// src/pages/__tests__/Favorites.test.tsx

import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from '../Favorites';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../components/MovieCard', () => (props: any) => {
  return (
    <div data-testid="movie-card">
      <p>{props.movie.Title}</p>
      <button onClick={() => props.toggleFavorite(props.movie.imdbID)}>
        {props.isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );
});

const mockFavoriteMovies = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg',
  },
];

describe('Favorites Page', () => {
  beforeEach(() => {
    localStorage.setItem('favorites', JSON.stringify(['tt1375666']));
    localStorage.setItem('movieDetails_tt1375666', JSON.stringify(mockFavoriteMovies[0]));
  });

  it('renders favorite movies from localStorage', () => {
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Favorite/i)).toBeInTheDocument();
  });

  it('shows a message when there are no favorites', () => {
    localStorage.clear();
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText(/No favorite movies found./i)).toBeInTheDocument();
  });
});
