import { createContext, useContext } from "react";
import API from "../services/api";
import type { Plan } from "../types/Plan";

interface SubscriptionContextType {
  getMovies: () => Promise<any>;
  getMovie: (movie_id: number) => Promise<any>;
  getCurrentPlan: () => Promise<any>;
  getAllPlans: () => Promise<any>;
  subscribePlan: (plan_id: number) => Promise<any>;
  changeSubscription: (plan_id: number) => Promise<any>;
  cancelSubscription: (subscription_id: number) => Promise<any>;
  updatePlan: (plan: Plan) => Promise<any>;
  getRevenueReport: () => Promise<any>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getMovies = async () => {
    try {
      const res = await API.get("/plans/get-movies", { withCredentials: true });

      return res.data;
    } catch (error: any) {
      console.error("Error fetching current subscription:", error);
    }
  };

  const getMovie = async (movie_id: number) => {
    try {
      const res = await API.get(`/plans/movies/${movie_id}`);
      return res.data;
    } catch (error) {
      console.error("Error fetching movie", error);
    }
  };

  const getCurrentPlan = async () => {
    try {
      const res = await API.get("/subscriptions/active-subscription", {
        withCredentials: true,
      });

      return res.data;
    } catch (error: any) {
      console.error("Error fetching current subscription:", error);
    }
  };

  const getAllPlans = async () => {
    try {
      const res = await API.get("/plans/get-plans", {
        withCredentials: true,
      });

      return res.data;
    } catch (error: any) {
      console.error("Error fetching plans:", error);
    }
  };

  const subscribePlan = async (plan_id: number) => {
    try {
      const res = await API.post(
        "/subscriptions/create",
        { plan_id },
        { withCredentials: true },
      );

      return res.data;
    } catch (error: any) {
      console.error("Error subscribing to plan:", error);
    }
  };

  const changeSubscription = async (plan_id: number) => {
    try {
      const res = await API.post(
        `/subscriptions/change/${plan_id}`,
        { plan_id },
        { withCredentials: true },
      );

      return res.data;
    } catch (error: any) {
      console.error("Error subscribing to plan:", error);
    }
  };

  const cancelSubscription = async (subscription_id: number) => {
    try {
      const res = await API.post(
        `/subscriptions/${subscription_id}/cancel`,
        {},
        { withCredentials: true },
      );
      return res.data;
    } catch (error: any) {
      console.error("Error cancelling plan", error);
    }
  };

  const updatePlan = async (plan: Plan) => {
    try {
      const res = await API.put(
        `/plans/update/${plan.id}`,
        {
          name: plan.name,
          description: plan.description,
          price: plan.price,
          duration_days: plan.duration_days,
        },
        { withCredentials: true },
      );
      return res.data;
    } catch (error: any) {
      console.error("Error updating plan", error);
    }
  };

  const getRevenueReport = async () => {
    try {
      const res = await API.get("/subscriptions/revenue-report", {
        withCredentials: true,
      });
      return res.data;
    } catch (error) {
      console.error("Error getting report", error);
    }
  };

  return (
    <SubscriptionContext.Provider
      value={{
        getCurrentPlan,
        getAllPlans,
        subscribePlan,
        changeSubscription,
        cancelSubscription,
        getMovies,
        getMovie,
        updatePlan,
        getRevenueReport,
      }}
    >
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error(
      "useSubscription must be used within a SubscriptionProvider",
    );
  }

  return context;
};
