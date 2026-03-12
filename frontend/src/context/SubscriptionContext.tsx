import { createContext, useContext } from "react";
import API from "../services/api";

const SubscriptionContext = createContext<any>(null);

export const SubscriptionProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const getCurrentPlan = async () => {
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

export const useSubscription = () => {
  return useContext(SubscriptionContext);
};
