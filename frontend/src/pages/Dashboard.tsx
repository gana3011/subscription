import { useEffect, useState } from "react";
import { useSubscription } from "../context/SubscriptionContext";
import type { Subscription } from "../types/Subscription";

const Dashboard = () => {
  const { getCurrentPlan } = useSubscription();

  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const res = await getCurrentPlan();
        setSubscription(res);
      } catch (err) {
        console.error("Failed to fetch subscription", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [getCurrentPlan]);

  if (loading) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="p-10 max-w-[1100px] mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Current Plan</h3>
          <p className="text-xl font-bold">{subscription?.name}</p>
          <p>${subscription?.price}</p>

          <h3 className="mb-2 font-semibold">Start Date</h3>
          <p>{subscription?.start_date}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Next Billing</h3>
          <p>{subscription?.end_date}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Upgrade Plan</h3>
          <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:opacity-90">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
