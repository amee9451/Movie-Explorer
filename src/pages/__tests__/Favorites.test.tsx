import React from 'react';
import { render, screen } from '@testing-library/react';
import Favorites from '../Favorites';
import { BrowserRouter } from 'react-router-dom';
import { Movie } from '../../types/movie';

// Mock the MovieCard component
jest.mock('../../components/MovieCard', () => {
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
      <button type="button" onClick={() => toggleFavorite(movie)}>
        {isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
      </button>
    </div>
  );

  MockMovieCard.displayName = 'MockMovieCard';
  return MockMovieCard;
});

// Sample mock data
const mockFavoriteMovies: Movie[] = [
  {
    Title: 'Inception',
    Year: '2010',
    imdbID: 'tt1375666',
    Type: 'movie',
    Poster: 'https://example.com/poster.jpg',
    Genre: 'Action, Comedy, Drama',
    Director: 'Dijo Jose Antony',
    Actors: 'Nivin Pauly, Dhyan Sreenivasan, Anaswara Rajan',
    Plot: 'An unemployed young man',
  },
];

describe('Favorites Page', () => {
  it('renders favorite movies from localStorage', () => {
    localStorage.setItem('favorites', JSON.stringify(mockFavoriteMovies));
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText(/Inception/i)).toBeInTheDocument();
    expect(screen.getByText(/Remove Favorite/i)).toBeInTheDocument();
  });

  it('shows a message when there are no favorites', () => {
    localStorage.removeItem('favorites');
    render(
      <BrowserRouter>
        <Favorites />
      </BrowserRouter>
    );
    expect(screen.getByText(/No favorite movies added yet./i)).toBeInTheDocument();
  });
});
