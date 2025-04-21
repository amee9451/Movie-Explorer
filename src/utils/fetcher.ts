import axios from "axios";
import useSWR, { type SWRResponse } from "swr";
import { type Movie } from "../types/movie";
import type { MovieSearchResponse } from "../types/utils/fetcher";
import { SWR_CONFIG, API_KEY, BASE_URL } from "../constants/Movie";

// Explicit return type
const fetcher = async (url: string): Promise<any> =>
  await axios.get(url).then((res) => res.data);

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  if (query.trim() === "") return []; // explicit check
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY ?? "",
      s: query,
    },
  });
  return Array.isArray(response.data?.Search) ? response.data.Search : [];
};

export const fetchMovieById = async (id: string): Promise<Movie | null> => {
  if (id.trim() === "") return null;
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data ?? null;
};

export const useMovies = (
  query: string,
): {
  data: Movie[];
  error: Error | null;
  isLoading: boolean;
} => {
  const shouldFetch = query.trim() !== "";
  const { data, error, isLoading }: SWRResponse<MovieSearchResponse, Error> =
    useSWR(
      shouldFetch ? `${BASE_URL}?apikey=${API_KEY}&s=${query}` : null,
      fetcher,
      SWR_CONFIG,
    );

  return {
    data: Array.isArray(data?.Search) ? data.Search : [],
    error: error ?? null,
    isLoading,
  };
};

// Explicit return type and string check
export const useMovieById = (id: string): SWRResponse<Movie, Error> =>
  useSWR(
    id.trim() !== "" ? `${BASE_URL}?apikey=${API_KEY}&i=${id}` : null,
    fetcher,
    SWR_CONFIG,
  );
