import axios from "axios";
import { renderHook } from "@testing-library/react";
import useSWR from "swr";
import {
  fetchMovies,
  fetchMovieById,
  GetMovies,
  GetMovieById,
} from "../fetcher";

jest.mock("axios");
jest.mock("swr");

const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedSWR = useSWR as jest.Mock;

const mockMovie = {
  Title: "Inception",
  Year: "2010",
  imdbID: "tt1375666",
  Poster: "some-url",
  Type: "movie",
};

describe("Fetcher utilities", () => {
  describe("fetchMovies", () => {
    it("returns a movie list from the API", async () => {
      mockedAxios.get.mockResolvedValueOnce({
        data: {
          Search: [mockMovie],
        },
      });

      const result = await fetchMovies("inception");
      expect(mockedAxios.get).toHaveBeenCalledWith(expect.any(String), {
        params: expect.objectContaining({ s: "inception" }),
      });
      expect(result).toEqual([mockMovie]);
    });

    it("returns empty array if Search result is missing", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: {} });
      const result = await fetchMovies("unknown");
      expect(result).toEqual([]);
    });
  });

  describe("fetchMovieById", () => {
    it("returns movie object by ID", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: mockMovie });
      const result = await fetchMovieById("tt1375666");
      expect(result).toEqual(mockMovie);
    });
  });

  describe("GetMovies", () => {
    it("calls SWR with the correct URL and returns movie list", () => {
      mockedSWR.mockReturnValue({
        data: { Search: [mockMovie] },
        error: null,
        isLoading: false,
      });

      const { result } = renderHook(() => GetMovies("batman"));

      expect(mockedSWR).toHaveBeenCalledWith(
        expect.stringContaining("s=batman"),
        expect.any(Function),
        expect.any(Object),
      );

      expect(result.current.data).toEqual([mockMovie]);
      expect(result.current.error).toBeNull(); // Checking for null instead of false
      expect(result.current.isLoading).toBe(false);
    });

    it("returns empty array if no query is provided", () => {
      mockedSWR.mockReturnValue({
        data: undefined,
        error: null,
        isLoading: false,
      });
      const { result } = renderHook(() => GetMovies(""));
      expect(result.current.data).toEqual([]); // Not null, but an empty array
      expect(mockedSWR).toHaveBeenCalledWith(
        null,
        expect.any(Function),
        expect.any(Object),
      );
    });
  });

  describe("GetMovieById", () => {
    it("calls SWR with correct ID query", () => {
      mockedSWR.mockReturnValue({
        data: mockMovie,
        error: null,
        isLoading: false,
      });

      const { result } = renderHook(() => GetMovieById("tt1375666"));

      expect(result.current.data).toEqual(mockMovie);
      expect(mockedSWR).toHaveBeenCalledWith(
        expect.stringContaining("i=tt1375666"),
        expect.any(Function),
        expect.any(Object),
      );
    });

    it("returns null if ID is not provided", () => {
      renderHook(() => GetMovieById(""));
      expect(mockedSWR).toHaveBeenCalledWith(
        null,
        expect.any(Function),
        expect.any(Object),
      );
    });
  });
});
