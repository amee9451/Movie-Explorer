import axios from 'axios';
import useSWR, { SWRResponse } from 'swr';
import { Movie } from '../types/movie';
import { SWR_CONFIG, API_KEY, BASE_URL } from '../constants/Movie';

const fetcher = (url: string) => axios.get(url).then((res) => res.data);

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      s: query,
    },
  });
  return response.data.Search || [];
};

export const fetchMovieById = async (id: string): Promise<Movie> => {
  const response = await axios.get(BASE_URL, {
    params: {
      apikey: API_KEY,
      i: id,
    },
  });
  return response.data;
};
type MovieSearchResponse = {
  Search: Movie[];
  totalResults?: string;
  Response: 'True' | 'False';
  Error?: string;
};

export const useMovies = (
  query: string
): {
  data: Movie[];
  error: SWRResponse<MovieSearchResponse, unknown>['error'];
  isLoading: boolean;
} => {
  const { data, error, isLoading }: SWRResponse<MovieSearchResponse, unknown> = useSWR(
    query ? `${BASE_URL}?apikey=${API_KEY}&s=${query}` : null,
    fetcher,
    SWR_CONFIG
  );
  return {
    data: data?.Search ?? [],
    error: error || data?.Search ? false : true,
    isLoading,
  };
};

export const useMovieById = (id: string) =>
  useSWR(id ? `${BASE_URL}?apikey=${API_KEY}&i=${id}` : null, fetcher, SWR_CONFIG);
