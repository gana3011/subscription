import { Link } from "react-router-dom";
import type { PlanCardProps } from "../types/Plan";

const MovieCard: React.FC<PlanCardProps> = ({ planName, movies }) => {
  return (
    <div className="p-6 rounded-lg w-full max-w-5xl">
      <h2 className="text-2xl font-semibold mb-3 text-center">{planName}</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">No movies available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="border border-gray-200 rounded-lg overflow-hidden text-center"
            >
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-[260px] object-cover"
                />
                <h3 className="py-2 font-semibold">{movie.title}</h3>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieCard;
