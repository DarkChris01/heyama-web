"use client";
import { Movie } from "@/types/movie";
import { useState } from "react";

const url = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3001";

interface AddMovieProps {
  title: string;
  description: string;
  image?: File | null;
}

export const useMovie = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

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

  const storeMovie = async (movie: AddMovieProps) => {
    setActionLoading(true);
    try {
      const response = await fetch(`${url}/movie`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(movie),
      });

      if (response.status !== 201) {
        setActionLoading(false);
        setError("Failed to store movie");
        return;
      }
      setIsSuccess(true);
    } catch (error) {
      setError("Failed to store movie");
      throw new Error("Failed to store movie");
    }
    setActionLoading(false);
  };

  return {
    fetchMovies,
    storeMovie,
    fetchMovie,
    actionLoading,
    movies,
    loading,
    error,
    selectedMovie,
    isSuccess,
    setError
  };
};
