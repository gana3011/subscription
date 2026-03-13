import { useEffect, useState } from "react";
import API from "../services/api";
import PlanCard from "../components/PlanCard";

interface Movie {
  id: number;
  title: string;
  image: string;
  plan_id: number;
}

interface Plan {
  id: number;
  name: string;
}

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
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Movie Subscription Plans
      </h1>

      <div className="flex flex-col items-center gap-10">
        {plans.map((plan) => {
          const planMovies = movies.filter(
            (movie) => movie.plan_id === plan.id,
          );

          return (
            <PlanCard key={plan.id} planName={plan.name} movies={planMovies} />
          );
        })}
      </div>
    </div>
  );
};

export default Home;
