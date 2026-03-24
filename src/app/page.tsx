"use client";

import MovieCard from "@/components/movieCard";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMovie } from "@/hooks/useMovie";
import { Loader2, Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const { fetchMovies, movies, loading, error } = useMovie();
  const [showModal, setModal] = useState(false);

  useEffect(() => {
    fetchMovies();
  }, []);

  if (loading)
    return (
      <div className="text-center mt-10">Please wait while loading...</div>
    );

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

        <h3 className="text-start mt-2 mb-12 text-zinc-400 px-4">
          Découvrez notre sélection de films
        </h3>

        <div className="flex flex-col space-2-3">
          <div className="space-x-4 flex flex-row justify-end">
            {/* <a href="#" className="hover:underline">Home</a>
                      <a href="#" className="hover:underline">Movies</a>*/}
            <Button
              variant={"outline"}
              className="uppercase text-sm lg:text:md md:p-4 hover:scale-105 transition-transform duration-300 cursor-pointer"
              onClick={() => setModal(true)}
            >
              {" "}
              Ajouter un film <Plus />{" "}
            </Button>
          </div>
          {showModal && <Modal handleClose={() => setModal(false)} />}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4 mt-24">
            {movies.map((movie) => (
              <MovieCard key={movie._id} movie={movie} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

function Modal({ handleClose }: { handleClose: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const { storeMovie, isSuccess, error, actionLoading, setError } = useMovie();

  const submit = async () => {
    await storeMovie({
      title,
      description,
      image,
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setDescription(e.target.value);
  };

  if (isSuccess) {
    handleClose();
  }

  if (error) {
    alert(error);
    setError(null);
  }

  return (
    <div className="fixed inset-0 bg-black/50 p-4 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-2xl">
        <h2 className="text-xl font-bold mb-4">Ajouter un film</h2>
        {/* Formulaire d'ajout de film */}

        <form>
          <Field className="mt-4">
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              onChange={(e) => handleTitleChange(e)}
              id="title"
              type="text"
              placeholder="Enter movie title..."
              className="p-5"
            />
            <FieldDescription>Enter the title of the movie.</FieldDescription>
          </Field>

          <Field className="mt-4">
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              onChange={(e) => handleDescriptionChange(e)}
              id="description"
              placeholder="Enter movie description..."
              className="p-5"
            />
          </Field>

          <Field className="mt-4">
            <FieldLabel htmlFor="image">Image</FieldLabel>
            <Input
              id="image"
              type="file"
              placeholder="Enter movie image URL"
              onChange={(e) => handleImageChange(e)}
            />
            <FieldDescription>
              Enter the image URL of the movie.
            </FieldDescription>
          </Field>
          <div className="flex flex-row space-x-4 justify-end">
            <button
              type="button"
              onClick={() => handleClose()}
              className="mt-4 px-4 py-2 bg-gray-300 rounded text-xs lg:text-base"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={submit}
              className="mt-4 px-4 py-2 flex flex-x-4 bg-green-600 text-gray-50 rounded text-xs lg:text-base disabled:bg-gray-400 disabled:cursor-not-allowed"
              disabled={actionLoading}
            >
              <span>Ajouter</span>
              {actionLoading && <Loader2 className="ml-2 animate-spin" />}{" "}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
