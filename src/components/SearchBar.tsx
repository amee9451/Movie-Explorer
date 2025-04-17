import React, { useState } from 'react';
import axios from 'axios';
import { Movie } from '../types/movie';
const API_KEY = process.env.OMDB_API_KEY;

interface Props {
  setMovies: (movies: Movie[]) => void;
}

const SearchBar: React.FC<Props> = ({ setMovies }) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const response = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`);
    setMovies(response.data.Search || []);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Search for movies..."
        className="w-full p-2 border rounded"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="button"
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
