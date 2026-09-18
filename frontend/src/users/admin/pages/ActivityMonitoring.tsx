import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityMonitoring/ActivityDetails";

type Activity = {
  id: number;
  activity_id: string;
  user_id: number;
  username: string;
  service_name: string;
  details: Record<string, unknown>;
  created_at: string;
};

type ActivityModalProps = {
  activities: Activity[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  loading: boolean;
};

function ActivityMonitoring({
  activities,
  open,
  setOpen,
  loadData,
  loading,
}: ActivityModalProps) {
  useEffect(() => {
    loadData();
  }, [loadData]);

  const [selectedDetails, setSelectedDetails] = useState<Record<
    string,
    unknown
  > | null>(null);
  const [showActivityDetails, setShowActivityDetails] = useState(false);
  return (
    <main className="flex-1 min-w-0">
      <Header
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
        page="Activity Monitoring"
      />
      {showActivityDetails && (
        <ActivityDetails
          details={selectedDetails ?? {}}
          onClose={() => setShowActivityDetails(false)}
        />
      )}
      {/* <button
        onClick={() => setShowActivityDetails(true)}
      >Show </button> */}

      <div className="overflow-x-auto rounded-lg border border-gray-300 bg-white mx-6">
        <table className="min-w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left">Time stamps</th>
              <th className="px-4 py-3 text-left">User</th>
              <th className="px-4 py-3 text-left">Action</th>

              <th className="px-4 py-3 text-center"></th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">{activity.created_at}</td>
                <td className="px-4 py-3">{activity.username}</td>
                <td className="px-4 py-3">{activity.service_name}</td>

                <td className="px-4 py-3 text-center">
                  <button
                    className="bg-gray-200"
                    onClick={() => {
                      setSelectedDetails(activity.details);
                      setShowActivityDetails(true);
                    }}
                  >
                    Show Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default ActivityMonitoring;
