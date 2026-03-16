import type { Movie } from "./Movie";
import type { Plan } from "./Plan";
import type { RevenueReportData } from "./Revenue";
import type { Subscription } from "./Subscription";
import type { User } from "./User";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signup: (name: string, email: string, password: string) => Promise<User>;
  login: (email: string, password: string) => Promise<User>;
  logout: () => Promise<void>;
};

export type SubscriptionContextType = {
  getMovies: () => Promise<Movie[]>;
  getMovie: (movie_id: number) => Promise<Movie>;
  getCurrentPlan: () => Promise<Subscription>;
  getAllPlans: () => Promise<Plan[]>;
  subscribePlan: (plan_id: number) => Promise<Subscription>;
  changeSubscription: (plan_id: number) => Promise<Subscription>;
  cancelSubscription: (subscription_id: number) => Promise<Subscription>;
  updatePlan: (plan: Plan) => Promise<Plan>;
  getRevenueReport: () => Promise<RevenueReportData>;
}