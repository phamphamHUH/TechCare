import type { ActivityStats as ActivityStatsType } from "../../../../interface/Activity.ts";

type Props = {
  stats: ActivityStatsType;
};

function ActivityStats({ stats }: Props) {
  const cards = [
    {
      label: "All Activities",
      value: stats.totalActivities,
      bg: "bg-blue-100",
      dot: "bg-blue-500",
    },
    {
      label: "Active Users",
      value: stats.activeUsers,
      bg: "bg-green-100",
      dot: "bg-green-500",
    },
    {
      label: "Inactive Users",
      value: stats.inactiveUsers,
      bg: "bg-orange-100",
      dot: "bg-orange-500",
    },
    {
      label: "Critical Actions",
      value: stats.criticalActions,
      bg: "bg-red-100",
      dot: "bg-red-500",
    },
    {
      label: "Today's Activities",
      value: stats.todayActivities,
      bg: "bg-purple-100",
      dot: "bg-purple-500",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
      {cards.map((card) => (
        <div key={card.label} className={`rounded-xl p-4 ${card.bg}`}>
          <div className="flex items-center gap-2 mb-2">
            <span className={`h-2.5 w-2.5 rounded-full ${card.dot}`} />
            <span className="text-xs font-medium text-gray-600">{card.label}</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
        </div>
      ))}
    </div>
  );
}

export default ActivityStats;
