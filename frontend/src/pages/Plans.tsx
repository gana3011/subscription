import { useNavigate } from "react-router-dom";

const Plans = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Basic Plan",
      price: "₹99",
      duration: "1 Month",
      features: [
        "Access to basic movie library",
        "Watch on 1 device",
        "HD Quality",
      ],
    },
    {
      name: "Standard Plan",
      price: "₹199",
      duration: "1 Month",
      features: [
        "Access to standard movie library",
        "Watch on 2 devices",
        "Full HD Quality",
      ],
    },
    {
      name: "Premium Plan",
      price: "₹299",
      duration: "1 Month",
      features: [
        "Access to all movies",
        "Watch on 4 devices",
        "Ultra HD Quality",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-4xl font-bold text-center mb-10">
        Choose Your Subscription Plan
      </h1>

      <div className="flex flex-wrap justify-center gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className="bg-white w-[300px] p-6 rounded-lg shadow-md border"
          >
            <h2 className="text-2xl font-semibold text-center mb-4">
              {plan.name}
            </h2>

            <p className="text-center text-3xl font-bold mb-2">{plan.price}</p>

            <p className="text-center text-gray-500 mb-4">{plan.duration}</p>

            <ul className="mb-6 space-y-2">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>

            <button
              className="w-full bg-black text-white py-2 rounded-md hover:opacity-90"
              onClick={() => navigate("/dashboard")}
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
