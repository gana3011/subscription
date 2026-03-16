import { useEffect, useState } from "react";
import API from "../services/api";
import MovieCard from "../components/MovieCard";
import type { Movie } from "../types/Movie";
import type { Plan } from "../types/Plan";

const Home = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [movies, setMovies] = useState<Movie[]>([]);

  const getMovies = async () => {
    try {
      const res = await API.get("/plans/get-movies");
      setMovies(res.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const getAllPlans = async () => {
    try {
      const res = await API.get("/plans/get-plans", {
        withCredentials: true,
      });
      setPlans(res.data);
    } catch (error) {
      console.error("Error fetching plans:", error);
    }
  };

  useEffect(() => {
    getMovies();
    getAllPlans();
  }, []);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center">All Plans</h1>

      <div className="flex flex-col items-center">
        {plans.map((plan) => {
          const planMovies = movies.filter(
            (movie) => movie.plan_id === plan.id,
          );

          return (
            <MovieCard key={plan.id} planName={plan.name} movies={planMovies} />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
