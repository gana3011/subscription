import { movies } from "../data/movies";
import PlanCard from "../components/PlanCard";

const Home = () => {
  const basicMovies = movies.filter((m) => m.plan === "basic");
  const standardMovies = movies.filter((m) => m.plan === "standard");
  const premiumMovies = movies.filter((m) => m.plan === "premium");

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Movie Subscription Plans
      </h1>

      <div className="flex flex-col items-center gap-10">
        <PlanCard planName="Basic Plan" movies={basicMovies} />
        <PlanCard planName="Standard Plan" movies={standardMovies} />
        <PlanCard planName="Premium Plan" movies={premiumMovies} />
      </div>
    </div>
  );
};

export default Home;
