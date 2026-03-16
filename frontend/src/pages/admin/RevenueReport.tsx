import { useEffect, useState } from "react";
import type { RevenueReportData } from "../../types/Revenue";
import { useSubscription } from "../../context/SubscriptionContext";

const RevenueReport = () => {
  const [report, setReport] = useState<RevenueReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const { getRevenueReport } = useSubscription();

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      const res = await getRevenueReport();
      setReport(res);
    } catch (error) {
      console.error("Failed to fetch revenue report", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Loading revenue report...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg">Failed to load report</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold mb-10">Revenue Report</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Revenue</h2>
          <p className="text-2xl font-bold mt-2">₹{report.total_revenue}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Active Subscriptions</h2>
          <p className="text-2xl font-bold mt-2">
            {report.active_subscriptions}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Expired Subscriptions</h2>
          <p className="text-2xl font-bold mt-2">
            {report.expired_subscriptions}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Cancelled Subscriptions</h2>
          <p className="text-2xl font-bold mt-2">
            {report.cancelled_subscriptions}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">Total Subscriptions</h2>
          <p className="text-2xl font-bold mt-2">
            {report.total_subscriptions}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-10 mb-4">Revenue Per Plan</h2>

      <div className="bg-white p-6 rounded-lg shadow space-y-2">
        {report.revenue_per_plan.map((plan) => (
          <p key={plan.plan_name} className="text-lg">
            {plan.plan_name}: ₹{plan.revenue}
          </p>
        ))}
      </div>
    </div>
  );
};

export default RevenueReport;
