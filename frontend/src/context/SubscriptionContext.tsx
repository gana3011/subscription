import { createContext, useContext } from "react";
import API from "../services/api";

interface SubscriptionContextType {
  getCurrentPlan: () => Promise<any>;
  getAllPlans: () => Promise<any>;
  subscribePlan: (plan_id: number) => Promise<any>;
  changePlan: (plan_id: number) => Promise<any>;
}

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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

  const changePlan = async (plan_id: number) => {
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

  return (
    <SubscriptionContext.Provider
      value={{ getCurrentPlan, getAllPlans, subscribePlan, changePlan }}
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
