import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Plan } from "../types/Plan";
import { useSubscription } from "../context/SubscriptionContext";
import { useAuth } from "../context/AuthContext";

const Plans = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { getAllPlans, subscribePlan, getCurrentPlan, changeSubscription } =
    useSubscription();
  const [plans, setPlans] = useState<Plan[] | null>(null);
  const [activePlanId, setActivePlanId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllPlans = async () => {
      try {
        const res = await getAllPlans();
        const activePlan = await getCurrentPlan();
        setPlans(res);
        setActivePlanId(activePlan.plan_id);
      } catch (err) {
        console.error("Failed to fetch subscription", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllPlans();
  }, [getAllPlans]);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = async (plan_id: number) => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      if (
        !activePlanId &&
        confirm("Are you sure you want to subscribe to this plan?")
      )
        await subscribePlan(plan_id);
      else {
        if (confirm("Are you sure you want to change to this plan?"))
          await changeSubscription(plan_id);
      }

      alert("Subscribed successfully");
      navigate("/dashboard");
    } catch (err) {
      alert("Error subscribing to plan");
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Subscription Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {plans?.map((plan) => {
          const isActive = plan.id === activePlanId;

          return (
            <div
              key={plan.id}
              className="bg-white w-[300px] p-6 rounded-lg shadow-md border"
            >
              <h2 className="text-2xl font-semibold text-center mb-4">
                {plan?.name}
              </h2>

              <p className="text-center text-3xl font-bold mb-2">
                Rs {plan.price}
              </p>

              <p className="text-center text-gray-500 mb-4">
                Duration: {plan?.duration_days / 30} months
              </p>

              <p className="text-center text-gray-500 mb-4">
                {plan?.description}
              </p>

              {isActive ? (
                <button
                  disabled
                  className="w-full bg-green-500 text-white py-2 rounded-md cursor-not-allowed"
                >
                  Subscribed
                </button>
              ) : (
                <button
                  className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
                  onClick={() => handleClick(plan.id)}
                >
                  Subscribe
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Plans;
