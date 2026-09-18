import { Calendar, Clock, X } from "lucide-react";
import type { Activity } from "../../../../interface/Activity.ts";

type Props = {
  activity?: Activity | null;
  details?: Record<string, unknown> | null;
  onClose?: () => void;
};

function ActivityDetails({ activity, details, onClose }: Props) {
  const isActivityMode = Boolean(activity);
  const currentDetails = activity?.details ?? details ?? {};

  if (!activity && !details) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-sm text-gray-400">
        Select an activity to see its details.
      </div>
    );
  }

  const createdAt = activity ? new Date(activity.created_at) : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-2xl rounded-xl border border-gray-200 bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h3 className="text-lg font-semibold text-gray-800">Activity Details</h3>
          {onClose && (
            <button
              type="button"
              aria-label="Close activity details"
              onClick={onClose}
              className="rounded-full p-1 text-gray-500 transition hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <div className="space-y-4 p-5 text-sm">
          {isActivityMode && activity && (
            <>
              <div>
                <div className="mb-1 flex items-center gap-2 font-medium text-gray-700">
                  <Calendar size={14} />
                  Date and Time
                </div>

                <div className="flex items-center gap-2 text-gray-500">
                  <Clock size={14} />

                  {createdAt?.toLocaleDateString(undefined, {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}

                  {" · "}

                  {createdAt?.toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <div>
                <div className="mb-1 font-medium text-gray-700">User</div>
                <div className="text-gray-500">{activity.username}</div>
              </div>

              <div>
                <div className="mb-1 font-medium text-gray-700">Action</div>
                <div className="text-gray-500">{activity.service_name}</div>
              </div>
            </>
          )}

          <div>
            <div className="mb-1 font-medium text-gray-700">Details</div>
            <pre className="max-h-64 overflow-y-auto rounded-md border border-gray-100 bg-gray-50 p-3 text-xs whitespace-pre-wrap text-gray-600">
              {JSON.stringify(currentDetails, null, 2)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ActivityDetails;
