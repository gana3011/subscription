import { useEffect, useState } from "react";
import "../styles/dashboard.css";

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
    <div className="dashboard-container">
      <h1>Dashboard</h1>

      <div className="dashboard-grid">
        <div className="card">
          <h3>Current Plan</h3>
          <p className="plan">{subscription.plan}</p>
          <p>{subscription.price}</p>
          <p>Status: {subscription.status}</p>
        </div>

        <div className="card">
          <h3>Next Billing</h3>
          <p>{subscription.nextBilling}</p>
          <button className="manage-btn">Manage Billing</button>
        </div>

        <div className="card">
          <h3>Watch Statistics</h3>
          <p>{usage.hoursWatched} hours watched</p>
          <p>{usage.devices} devices connected</p>
        </div>

        <div className="card">
          <h3>Upgrade Plan</h3>
          <p>Get 4K streaming & more devices</p>
          <button className="upgrade-btn">Upgrade</button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
