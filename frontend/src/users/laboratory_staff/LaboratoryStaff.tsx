import { useCallback, useEffect, useState } from "react";
import { LayoutGrid, ClipboardList, FileCheck } from "lucide-react";
import api from "../../lib/axios";
import LaboratoryRequests from "./pages/LaboratoryRequests";
import SideBar from "../../components/SideBar";
import { useSearchParams } from "react-router";
import LabstaffDashboard from "./pages/LabstaffDashboard";
import LaboratoryResults from "./pages/LaboratoryResults";
import type { Queue } from "../../interface/Queue";
import type { Service } from "../../interface/Service";

type LabRequest = {
  request_id: string;
  consultation_id: string | null;
  patient_id: string;
  doctor_id: string | null;
  test_type: string;
  results: Record<string, unknown> | null;
  status: string;
  requested_at: string;
  updated_at: string;
};

function LaboratoryStaff() {
  const [open, setOpen] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [requestItems, setRequestItems] = useState<LabRequest[]>([]);
  const [queues, setQueues] = useState<Queue[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const page = searchParams.get("page") ?? "dashboard";
  function setPage(newPage: string) {
    setSearchParams({ page: newPage });
  }

  const room = "LAB-01";

  const loadData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const queueResponse = await api.get(
        `/api/labstaff/laboratory-queues/${room}`,
      );
      const serviceResponse = await api.get(`/api/labstaff/services/${room}`);
      setQueues(queueResponse.data ?? []);
      setServices(serviceResponse.data ?? []);
    } catch (err) {
      const message =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Unable to fetch data.";
      setError(message);
      setQueues([]);
      setServices([]);
    } finally {
      setLoading(false);
    }
  }, []);
  const navItems = [
    {
      page: "dashboard",
      label: "Dashboard",
      icon: <LayoutGrid size={20} />,
    },
    {
      page: "laboratory-requests",
      label: "Laboratory Requests",
      icon: <ClipboardList size={20} />,
    },
    {
      page: "laboratory-results",
      label: "Laboratory Results",
      icon: <FileCheck size={20} />,
    },
  ];

  useEffect(() => {
    (async () => {
      await loadData();
    })();
  }, [loadData]);

  return (
    <div className="flex min-h-screen cursor-default">
      <SideBar open={open} page={page} setPage={setPage} navItems={navItems} />
      {page === "dashboard" && (
        <LabstaffDashboard
          open={open}
          setOpen={setOpen}
          loading={loading}
          loadData={() => loadData()}
        />
      )}

      {page === "laboratory-requests" && (
        <LaboratoryRequests
          open={open}
          setOpen={setOpen}
          queues={queues}
          services={services}
          loading={loading}
          error={error}
          loadData={() => loadData()}
          room={room}
        />
      )}

      {page === "laboratory-results" && (
        <LaboratoryResults
          open={open}
          setOpen={setOpen}
          requests={requestItems}
          loading={loading}
          error={error}
          loadData={() => loadData()}
        />
      )}
    </div>
  );
}

export default LaboratoryStaff;
