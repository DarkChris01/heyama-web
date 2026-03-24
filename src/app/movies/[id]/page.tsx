"use client";

import { useMovie } from "@/hooks/useMovie";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect } from "react";

const MovieDetail = () => {
  const params = useParams();

  const { id } = params;
  const { selectedMovie, fetchMovie, loading, error } = useMovie();

  useEffect(() => {
    if (!id) return;
    fetchMovie(id as string);
  }, [id]);

  if (loading) return <div className="text-center mt-10">Please wait while loading...</div>;
  if (!selectedMovie)
    return <div className="text-center mt-10">Film introuvable</div>;

  const formattedDate = new Date(selectedMovie.createdAt).toLocaleDateString();
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8 bg-white shadow-2xl rounded-lg overflow-hidden">
        {/* Image avec overlay titre au hover */}
        <div className="relative group md:w-2/3 h-96 group-hover:scale-105 transition-transform duration-500">
          <Image
            src={"/images/icone.jpg"}
            alt={selectedMovie.title}
            width={400}
            height={300}
            className="w-full h-full object-cover transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition flex items-end p-4">
            <h2 className="text-white text-2xl font-bold uppercase">
              {selectedMovie.title}
            </h2>
          </div>
        </div>

        {/* Infos */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl font-bold text-gray-800">
                Date de sortie
              </h3>
              <p className="text-gray-500 mb-12">{formattedDate}</p>
            </div>
            <div className="flex flex-col space-y-1">
              <h3 className="text-xl font-bold text-gray-800">Description</h3>
              <p className="text-gray-800 text-lg leading-relaxed">
                {selectedMovie.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
