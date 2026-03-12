import { useEffect, useState } from "react";

const Dashboard = () => {
  const [subscription, setSubscription] = useState({
    plan: "Premium",
    price: "₹799/month",
    status: "Active",
    nextBilling: "15 April 2026",
  });

  const [usage, setUsage] = useState({
    hoursWatched: 120,
    devices: 3,
  });

  useEffect(() => {
    // later you will call backend API here
  }, []);

  return (
    <div className="p-10 max-w-[1100px] mx-auto">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Current Plan</h3>
          <p className="text-xl font-bold">{subscription.plan}</p>
          <p>{subscription.price}</p>
          <p>Status: {subscription.status}</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Next Billing</h3>
          <p>{subscription.nextBilling}</p>
          <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:opacity-90">
            Manage Billing
          </button>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Watch Statistics</h3>
          <p>{usage.hoursWatched} hours watched</p>
          <p>{usage.devices} devices connected</p>
        </div>

        <div className="border border-gray-200 rounded-lg p-5 bg-white shadow-sm">
          <h3 className="mb-2 font-semibold">Upgrade Plan</h3>
          <p>Get 4K streaming & more devices</p>
          <button className="mt-3 px-4 py-2 bg-black text-white rounded-md hover:opacity-90">
            Upgrade
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
