import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import { useEffect, useState } from "react";
import API from "../services/api";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [isSubscribed, setIsSubscribed] = useState(false);

  const movie = movies.find((m) => m.id === Number(id));

  useEffect(() => {
    const checkSubscription = async () => {
      try {
        const res = await API.get("/subscriptions/me");
        if (res.data.status === "active") {
          setIsSubscribed(true);
        }
      } catch (error) {
        console.log("User not subscribed");
      }
    };

    checkSubscription();
  }, []);

  if (!movie) {
    return <h2 className="text-center text-xl mt-10">Movie not found</h2>;
  }

  const handleWatch = () => {
    // BASIC PLAN → always allow
    if (movie.plan === "basic") {
      alert("Playing movie...");
      return;
    }

    // STANDARD / PREMIUM → require subscription
    if (!isSubscribed) {
      alert("You must subscribe to watch this movie");
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

        <p className="mt-3">
          <b>Description:</b> {movie.description}
        </p>

        <p className="mt-2">
          <b>Rating:</b> ⭐ {movie.rating}
        </p>

        {/* BUTTON LOGIC */}
        {movie.plan === "basic" || isSubscribed ? (
          <button
            className="mt-4 px-5 py-2 bg-black text-white rounded-md hover:opacity-90"
            onClick={handleWatch}
          >
            Watch
          </button>
        ) : (
          <button
            className="mt-4 px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            onClick={() => navigate("/dashboard")}
          >
            Subscribe to Watch
          </button>
        )}

        {/* MESSAGE ONLY FOR STANDARD / PREMIUM */}
        {movie.plan !== "basic" && !isSubscribed && (
          <p className="text-red-500 mt-2">
            Subscription required to watch this movie
          </p>
        )}

        <h3 className="mt-6 text-lg font-semibold">Comments</h3>

        {movie.comments.map((c, i) => (
          <p key={i}>• {c}</p>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
