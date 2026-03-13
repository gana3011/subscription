import { useEffect, useState } from "react";
import { useSubscription } from "../context/SubscriptionContext";
import type { Subscription } from "../types/Subscription";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { getCurrentPlan } = useSubscription();
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchActivePlan = async () => {
      try {
        const res = await getCurrentPlan();
        setSubscription(res);
      } catch (err) {
        console.error("Failed to fetch subscription", err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivePlan();
  }, [getCurrentPlan]);

  useEffect(() => {
    console.log(subscription);
  }, [subscription]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!subscription) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-gray-200 rounded-xl shadow-sm p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">
            No Active Subscription
          </h2>

          <p className="text-gray-500 mt-2 text-sm">
            Subscribe to a plan to unlock premium features.
          </p>

          <Link to={"/plans"}>
            <button className="mt-6 w-full bg-black text-white py-2 rounded-lg font-medium hover:opacity-90 transition">
              View Plans
            </button>
          </Link>
        </div>
      </div>
    );
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

          <p>{new Date(subscription.start_date).toLocaleDateString()}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Next Billing</h3>
          <p>{new Date(subscription.end_date).toLocaleDateString()}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Upgrade Plan</h3>

          <Link to={"/plans"}>
            <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:opacity-90">
              Upgrade
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
