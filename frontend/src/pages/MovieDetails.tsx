import { useParams, useNavigate } from "react-router-dom";
import { movies } from "../data/movies";
import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/movieDetails.css";

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
    return <h2>Movie not found</h2>;
  }

  const handleWatch = () => {
    if (!isSubscribed) {
      alert("You must subscribe to watch this movie");
      navigate("/dashboard");
      return;
    }

    alert("Playing movie...");
  };

  return (
    <div className="details-container">
      <img src={movie.image} className="poster" />

      <div className="details">
        <h1>{movie.title}</h1>

        <p>
          <b>Director:</b> {movie.director}
        </p>
        <p>
          <b>Cast:</b> {movie.cast}
        </p>
        <p>
          <b>Genre:</b> {movie.genre}
        </p>
        <p>
          <b>Description:</b> {movie.description}
        </p>
        <p>
          <b>Rating:</b> ⭐ {movie.rating}
        </p>

        <button className="watch-btn" onClick={handleWatch}>
          Watch
        </button>

        {!isSubscribed && (
          <p style={{ color: "red" }}>
            Subscription required to watch this movie
          </p>
        )}

        <h3>Comments</h3>

        {movie.comments.map((c, i) => (
          <p key={i}>• {c}</p>
        ))}
      </div>
    </div>
  );
};

export default MovieDetails;
