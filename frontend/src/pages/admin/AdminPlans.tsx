import { useEffect, useState } from "react";
import type { Plan } from "../../types/Plan";
import { useSubscription } from "../../context/SubscriptionContext";

const AdminPlans = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);
  const { getAllPlans, updatePlan } = useSubscription();

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await getAllPlans();
      setPlans(res);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async () => {
    if (!editingPlan) return;
    try {
      await updatePlan(editingPlan);
      alert("Plan updated successfully");
    } catch (err) {
      console.log(err);
    } finally {
      setEditingPlan(null);
    }
    fetchPlans();
  };

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-8">Admin - Manage Plans</h1>

      <div className="grid grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Plans</h2>

          <table className="w-full">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2">Name</th>
                <th>Price</th>
                <th>Duration</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {plans.map((plan) => (
                <tr key={plan.id} className="border-b">
                  <td className="py-3">{plan.name}</td>

                  <td>₹{plan.price}</td>

                  <td>{plan.duration_days} days</td>

                  <td>
                    <button
                      className="px-3 py-1 bg-black text-white rounded text-sm"
                      onClick={() => setEditingPlan(plan)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingPlan ? "Edit Plan" : "Select a Plan"}
          </h2>

          {editingPlan ? (
            <>
              <label className="text-sm text-gray-600">Name</label>
              <input
                className="border p-2 w-full mb-4 rounded"
                value={editingPlan.name}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    name: e.target.value,
                  })
                }
              />

              <label className="text-sm text-gray-600">Price</label>
              <input
                className="border p-2 w-full mb-4 rounded"
                type="number"
                value={editingPlan.price}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    price: Number(e.target.value),
                  })
                }
              />

              <label className="text-sm text-gray-600">Duration (days)</label>
              <input
                className="border p-2 w-full mb-4 rounded"
                type="number"
                value={editingPlan.duration_days}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    duration_days: Number(e.target.value),
                  })
                }
              />

              <label className="text-sm text-gray-600">Description</label>
              <textarea
                className="border p-2 w-full mb-6 rounded"
                value={editingPlan.description}
                onChange={(e) =>
                  setEditingPlan({
                    ...editingPlan,
                    description: e.target.value,
                  })
                }
              />

              <div className="flex gap-3">
                <button
                  className="px-4 py-2 bg-gray-400 text-white rounded"
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
            </>
          ) : (
            <p className="text-gray-500">Click edit on a plan to modify it.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPlans;
