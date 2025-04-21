import { type Movie } from "../../types/movie";

export interface MovieSearchResponse {
  Search: Movie[];
  totalResults?: string;
  Response: "True" | "False";
  Error?: string;
}
