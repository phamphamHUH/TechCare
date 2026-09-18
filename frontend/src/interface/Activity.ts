export type Activity = {
  id: number;
  activity_id: string;
  user_id: number;
  username: string;
  service_name: string;
  details: Record<string, unknown>;
  created_at: string;
};

export type ActivityStats = {
  totalActivities: number;
  activeUsers: number;
  inactiveUsers: number;
  criticalActions: number;
  todayActivities: number;
};