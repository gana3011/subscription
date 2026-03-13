import { createContext, useContext } from "react";
import API from "../services/api";

/* SUBSCRIPTION TYPE */

type Subscription = {
  id: number;
  plan_name: string;
  status: "active" | "expired" | "cancelled";
  start_date: string;
  end_date: string;
};

/* CONTEXT TYPE */

type SubscriptionContextType = {
  getCurrentPlan: () => Promise<Subscription>;
};

const SubscriptionContext = createContext<SubscriptionContextType | null>(null);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getCurrentPlan = async (): Promise<Subscription> => {
    const res = await API.get("/subscriptions/active-subscription", {
      withCredentials: true,
    });

    return res.data;
  };

  return (
    <SubscriptionContext.Provider value={{ getCurrentPlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

/* CUSTOM HOOK */

export const useSubscription = () => {
  const context = useContext(SubscriptionContext);

  if (!context) {
    throw new Error("useSubscription must be used within SubscriptionProvider");
  }

  return context;
};
