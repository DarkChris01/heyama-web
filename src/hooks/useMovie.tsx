import { Movie } from "@/types/movie";
import { useState } from "react";

const url = process.env.BACKEND_URL || "http://localhost:3001";

export const useMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`${url}/movie`);
      const movies = await response.json();
      setMovies(movies);
    } catch (error) {
      setError("Failed to fetch movies");
      throw error;
    }
    setLoading(false);
  };

  const fetchMovie = async (id: string) => {
    try {
      const response = await fetch(`${url}/movie/${id}`);
      const movie = await response.json();
      setSelectedMovie(movie);
    } catch (error) {
      setError("Failed to fetch movie details");
      throw error;
    }
    setLoading(false);
  };

  return { fetchMovies, fetchMovie, movies, loading, error, selectedMovie };
};
