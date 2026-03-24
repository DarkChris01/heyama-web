"use client";

import MovieCard from "@/components/movieCard";
import { useMovie } from "@/hooks/useMovie";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() 
{

const {fetchMovies,movies,loading,error} =useMovie(); 
  useEffect(() => {
    fetchMovies();
  }, []);


  if (loading) {
    return <div>Please wait while loading...</div>;
  }

  console.log(movies);
  

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex flex-col flex-1 font-sans dark:bg-black">
      <main className="p-4 lg:p-12">
        <h1 className="text-3xl text-zinc-300 font-bold text-center sm:text-left">
          Bienvenue sur{" "}
          <a
            href="/"
            className="text-teal-600 text-3xl font-extrabold tracking-tight sm:text-[5rem]"
          >
            FilmAttitude
          </a>
        </h1>
        
        <h3 className="text-start mt-2 mb-12 text-zinc-400 px-4">Découvrez notre sélection de films</h3>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 mt-24">
          {movies.map((movie) => (
            <MovieCard key={movie._id} movie={movie}/>
          ))}
        </div>
      </main>
    </div>
  );
}
