import { useEffect, useState } from "react";
import API from "../../services/api";

interface Plan {
  id: number;
  name: string;
  price: number;
  description: string;
  duration_days: number;
}

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const res = await API.get("/admin/plans");
    setPlans(res.data);
  };

  const handleUpdate = async () => {
    if (!editingPlan) return;

    await API.put(`/admin/plans/${editingPlan.id}`, editingPlan);

    setEditingPlan(null);
    fetchPlans();
  };

  return (
    <div className="min-h-screen bg-gray-200 p-10">
      <h1 className="text-3xl font-bold mb-8">Admin - Manage Plans</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">{plan.name}</h2>

            <p>
              <b>Price:</b> ₹{plan.price}
            </p>

            <p>
              <b>Duration:</b> {plan.duration_days} days
            </p>

            <p className="mt-2 text-gray-600">{plan.description}</p>

            <button
              className="mt-4 px-4 py-2 bg-black text-white rounded-md"
              onClick={() => setEditingPlan(plan)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      {/* EDIT MODAL */}

      {editingPlan && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40">
          <div className="bg-white p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit Plan</h2>

            <input
              className="border p-2 w-full mb-3"
              value={editingPlan.name}
              onChange={(e) =>
                setEditingPlan({ ...editingPlan, name: e.target.value })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              type="number"
              value={editingPlan.price}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  price: Number(e.target.value),
                })
              }
            />

            <input
              className="border p-2 w-full mb-3"
              type="number"
              value={editingPlan.duration_days}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  duration_days: Number(e.target.value),
                })
              }
            />

            <textarea
              className="border p-2 w-full mb-3"
              value={editingPlan.description}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  description: e.target.value,
                })
              }
            />

            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-400 rounded"
                onClick={() => setEditingPlan(null)}
              >
                Cancel
              </button>

              <button
                className="px-4 py-2 bg-black text-white rounded"
                onClick={handleUpdate}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPlans;
