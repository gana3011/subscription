import { useEffect, useState } from "react";
import API from "../services/api";

interface Plan {
  id: number;
  name: string;
  price: number;
}

const Plans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await API.get("/plans", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setPlans(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlans();
  }, []);

  const subscribePlan = async (planId: number) => {
    try {
      await API.post(
        `/subscribe/${planId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Subscribed successfully");
    } catch (error) {
      console.log(error);
      alert("Subscription failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h2 style={{ textAlign: "center" }}>Subscription Plans</h2>

      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          marginTop: "30px",
        }}
      >
        {plans.map((plan) => (
          <div
            key={plan.id}
            style={{
              border: "1px solid #ddd",
              padding: "20px",
              borderRadius: "8px",
              width: "200px",
              textAlign: "center",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
            }}
          >
            <h3>{plan.name}</h3>
            <p>${plan.price}</p>

            <button
              onClick={() => subscribePlan(plan.id)}
              style={{
                background: "#007bff",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plans;
