import { Movie } from "@/types/movie";
import Image from "next/image";
import Link from "next/link";

const MovieCard = ({ movie }: { movie: Movie }) => {
  const formattedDate = new Date(movie.createdAt).toLocaleDateString();

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 p-4 rounded-lg">
      <Link  href={'/movies/'+movie._id}>
        <Image
          src={"/images/icone.jpg"}
          alt={movie.title}
          width={500}
          height={400}
          className="w-full h-auto object-cover rounded-t-lg"
        />
      </Link>
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 uppercase">{movie.title}</div>
        <p className="text-gray-700 text-base line-clamp-3">
          {movie.description}
        </p>
      </div>
      <div className="px-6 py-4 text-gray-600 text-sm">{formattedDate}</div>
    </div>
  );
};

export default MovieCard;
