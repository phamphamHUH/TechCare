export type Activity = {
  id: number;
  user_id: string;
  action_id: string;
  status: string;
  target_type: string;
  target_id: string;
  metadata: string;
  created_at: string;
};

export type ActivityStats = {
  totalActivities: number;
  activeUsers: number;
  inactiveUsers: number;
  criticalActions: number;
  todayActivities: number;
};
