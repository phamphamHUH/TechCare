import Header from "../../../components/Header";
import { useEffect, useState } from "react";
import ActivityDetails from "../components/ActivityMonitoring/ActivityDetails";
import ActivityTable from "../components/ActivityMonitoring/ActivityTable";
import type { Activity } from "../../../interface/Activity";

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
      <ActivityTable activities={activities} />
      {showActivityDetails && (
        <ActivityDetails
          details={selectedDetails ?? {}}
          onClose={() => setShowActivityDetails(false)}
        />
      )}
      {/* <button
        onClick={() => setShowActivityDetails(true)}
      >Show </button> */}
    </main>
  );
}

export default ActivityMonitoring;
