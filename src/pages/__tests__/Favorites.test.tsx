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
  }: {
    movie: Movie;
    isFavorite?: boolean;
    toggleFavorite: (movie: Movie) => void;
  }) => (
    <div data-testid="movie-card">
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
