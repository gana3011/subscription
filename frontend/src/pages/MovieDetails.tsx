import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSubscription } from "../context/SubscriptionContext";
import type { Movie } from "../types/Movie";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getMovie, getCurrentPlan } = useSubscription();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [userPlanId, setUserPlanId] = useState<number | null>(null);

  const fetchMovie = async (movie_id: number) => {
    try {
      const res = await getMovie(movie_id);
      console.log(res);
      setMovie(res);
    } catch (err) {
      setMovie(null);
    }
  };

  const fetchCurrentPlan = async () => {
    try {
      const res = await getCurrentPlan();
      setUserPlanId(res.plan_id);
    } catch (error) {
      console.log("User not subscribed");
    }
  };

  useEffect(() => {
    if (id) {
      fetchMovie(Number(id));
      fetchCurrentPlan();
    }
  }, [id]);

  if (!movie) {
    return <h2 className="text-center text-xl mt-10">Movie not found</h2>;
  }

  const canWatch = userPlanId !== null && userPlanId >= movie.plan_id;

  const handleWatch = () => {
    if (!canWatch) {
      alert("Your subscription plan does not allow this movie");
      navigate("/dashboard");
      return;
    }

    alert("Playing movie...");
  };

  return (
    <div className="flex gap-10 p-10 max-w-[1000px] mx-auto">
      <img src={movie.image} className="w-[300px] rounded-lg" />

      <div className="max-w-[600px]">
        <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>

        <p>
          <b>Director:</b> {movie.director}
        </p>

        <p>
          <b>Cast:</b> {movie.cast}
        </p>

        <p>
          <b>Genre:</b> {movie.genre}
        </p>

        {movie.description && (
          <p className="mt-3">
            <b>Description:</b> {movie.description}
          </p>
        )}

        {canWatch ? (
          <button
            className="mt-4 px-5 py-2 bg-black text-white rounded-md hover:opacity-90"
            onClick={handleWatch}
          >
            Watch
          </button>
        ) : (
          <button
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate("/plans")}
          >
            Upgrade Plan
          </button>
        )}

        {!canWatch && (
          <p className="text-red-500 mt-2">
            Your current subscription does not include this movie
          </p>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
