import { Link } from "react-router-dom";
import { movies } from "../data/movies";
import "../styles/home.css";

const Home = () => {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Movie Library</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              overflow: "hidden",
              textAlign: "center",
              paddingBottom: "15px",
            }}
          >
            <Link
              to={`/movie/${movie.id}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              <img
                src={movie.image}
                alt={movie.title}
                style={{
                  width: "100%",
                  height: "280px",
                  objectFit: "cover",
                }}
              />

              <h3 style={{ marginTop: "10px" }}>{movie.title}</h3>
            </Link>

            <Link to={`/movie/${movie.id}`}>
              <button
                style={{
                  marginTop: "10px",
                  padding: "8px 15px",
                  border: "none",
                  background: "black",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
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
