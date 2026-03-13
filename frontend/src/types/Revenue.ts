export type RevenuePerPlan = {
  plan_name: string;
  revenue: number;
};

export type RevenueReportData = {
  total_revenue: number;
  active_subscriptions: number;
  expired_subscriptions: number;
  cancelled_subscriptions: number;
  total_subscriptions: number;
  revenue_per_plan: RevenuePerPlan[];
};