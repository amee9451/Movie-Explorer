import React, { useEffect, useState } from "react";
import type { SearchProps } from "../types/movie";

const SearchBar: React.FC<SearchProps> = ({ handleSearch, initialState }) => {
  const [query, setQuery] = useState("");
  useEffect(() => {
    setQuery(initialState);
  }, [initialState]);
  return (
    <div className="flex justify-center mb-6">
      <input
        type="text"
        placeholder="Search for movie..."
        className="w-full max-w-xl px-4 py-2 rounded-lg border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(query);
          }
        }}
      />
      <button
        type="button"
        name="search"
        className="ml-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        onClick={() => {
          handleSearch(query);
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
