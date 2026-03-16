import type { Movie } from "./Movie";

export type Plan = {
  id: number;
  name: string;
  price: number;
  description: string;
  duration_days: number
}

export type PlanCardProps = {
  planName: string;
  movies: Movie[];
}