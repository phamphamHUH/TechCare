import type { Activity } from "../../../../interface/Activity.ts";

type Props = {
  activities: Activity[];
  selectedId: number | null;
  onSelect: (activity: Activity) => void;
};

function ActivityTable({ activities, selectedId, onSelect }: Props) {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 text-gray-500">
          <tr>
            <th className="px-4 py-3 text-left font-medium">Date and Time</th>
            <th className="px-4 py-3 text-left font-medium">User</th>
            <th className="px-4 py-3 text-left font-medium">Action</th>
            <th className="px-4 py-3 text-left font-medium">Details</th>
          </tr>
        </thead>

        <tbody>
          {activities.length > 0 ? (
            activities.map((activity) => {
              const createdAt = new Date(activity.created_at);
              const isSelected = activity.id === selectedId;

              return (
                <tr
                  key={activity.id}
                  onClick={() => onSelect(activity)}
                  className={`border-t cursor-pointer transition-colors ${
                    isSelected
                      ? "bg-blue-50 border-l-2 border-l-blue-500"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <td className="px-4 py-3 align-top">
                    <div className="font-medium text-gray-800">
                      {createdAt.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>

                    <div className="text-xs text-gray-400">
                      {createdAt.toLocaleTimeString(undefined, {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </div>
                  </td>

                  <td className="px-4 py-3 align-top">
                    {activity.username}
                  </td>

                  <td className="px-4 py-3 align-top text-gray-700">
                    {activity.service_name}
                  </td>

                  <td className="px-4 py-3 align-top">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelect(activity);
                      }}
                      className="text-blue-600 underline underline-offset-2 hover:text-blue-800 cursor-pointer"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td
                colSpan={4}
                className="px-4 py-10 text-center text-gray-500"
              >
                No activities found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default ActivityTable;