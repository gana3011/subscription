export type Subscription = {
  id: number;
  plan_id: number;
  name: string;
  description: string;
  price: number;
  duration_days: number;
  start_date: string;
  end_date: string;
};