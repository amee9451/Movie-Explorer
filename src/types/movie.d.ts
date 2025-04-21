export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
  Genre?: string;
  Plot?: string;
  Director?: string;
  Actors?: string;
  imdbRating?: string;
}

export interface Props {
  movie: Movie;
  isFavorite: boolean;
  toggleFavorite: (movie: Movie) => void;
}

export interface SearchProps {
  handleSearch: (query: string) => void;
  initialState: string;
}
