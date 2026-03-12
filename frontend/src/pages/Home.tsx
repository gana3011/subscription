import { Link } from "react-router-dom";
import { movies } from "../data/movies";

const Home = () => {
  return (
    <div className="p-10 max-w-[1200px] mx-auto">

      <h1 className="text-3xl font-bold">Movie Library</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">

        {movies.map((movie) => (
          <div
            key={movie.id}
            className="border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm text-center pb-4"
          >
            <Link
              to={`/movie/${movie.id}`}
              className="text-black no-underline"
            >
              <img
                src={movie.image}
                alt={movie.title}
                className="w-full h-[300px] object-cover"
              />

              <h3 className="mt-3 font-semibold">
                {movie.title}
              </h3>
            </Link>

            <Link to={`/movie/${movie.id}`}>
              <button className="mt-2 px-4 py-2 bg-black text-white rounded hover:opacity-90">
                Watch Now
              </button>
            </Link>

          </div>
        ))}

      </div>
    </div>
  );
};

export default Home;