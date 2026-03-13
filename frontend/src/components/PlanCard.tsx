import { Link } from "react-router-dom";

interface Movie {
  id: number;
  title: string;
  image: string;
  plan_id: number;
}

interface PlanCardProps {
  planName: string;
  movies: Movie[];
}

const PlanCard: React.FC<PlanCardProps> = ({ planName, movies }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-5xl">
      <h2 className="text-2xl font-semibold mb-6 text-center">{planName}</h2>

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
                <h3 className="mt-3 font-semibold">{movie.title}</h3>
              </Link>
              <Link to={`/movie/${movie.id}`}>
                <button className="mt-3 mb-4 px-4 py-2 bg-black text-white rounded-md hover:bg-gray-900">
                  Watch Now
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlanCard;
