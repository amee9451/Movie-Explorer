export const SWR_CONFIG = {
  dedupingInterval: 5 * 60 * 1000, // 5 minutes
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export const API_KEY = process.env.OMDB_API_KEY;
export const BASE_URL = "https://www.omdbapi.com/";
