import { useEffect, useState } from "react";

import api from "../../../lib/axios";
import Header from "../../../components/Header";
import LabAndConsuQueues from "../components/QueueManagement/LabAndConsuQueues";
import NowServing from "../components/QueueManagement/NowServing";
import SubmitNewQueue from "../components/QueueManagement/SubmitNewQueue";

type Queue = {
  id: number;
  queue_id: string;
  patient_id: string;
  patient_name: string;
  queue_number: number;
  service_name: string;
  service_id: string;
  service_type: string;
  is_priority: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}[];
type Patient = {
  id: number;
  patient_id: string;
  first_name: string;
  last_name: string;
  date_of_birth: string;
  sex: string;
  contact_number: string;
  email: string;
  address: string;
  emergency_contact: string;
}[];
type Service = {
  id: number;
  service_id: string;
  service_name: string;
  service_type: string;
  price: number;
}[];
type QueueManagementProps = {
  patients: Patient;
  services: Service;
  queues: Queue;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData: () => Promise<void>;
  loading: boolean;
};

function QueueManagement({
  services,
  loading,
  queues,
  open,
  setOpen,
  loadData,
  patients,
}: QueueManagementProps) {
  const [patientId, setPatientId] = useState<string | null>(null);
  const [isPriority, setIsPriority] = useState(false);
  const [serviceId, setServiceId] = useState<string | null>(null);
  // const [serviceType, setServiceType] = useState<string | null>(null)
  const [serviceName, setServiceName] = useState<string | null>(null);
  useEffect(() => {
    loadData();
  }, [loadData]);
  async function submitQueue(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault(); // Prevent the default form submission behavior
      console.log("Submitting queue with data:", {
        patient_id: patientId,
        is_priority: isPriority,
        service_id: serviceId,
        // service_type: serviceType
      });
      const response = await api.post("/api/fdstaff/queues", {
        patient_id: patientId,
        is_priority: isPriority,
        service_id: serviceId,
        // service_type: serviceType,
        service_name: serviceName,
      });

      console.log("Queue submitted:", response.data);
      alert("Queue submitted successfully!");
      setPatientId(null);
      setIsPriority(false);
      setServiceId(null);
      // setServiceType(null);
      setServiceName(null);
      loadData();
    } catch (error) {
      alert(
        (error as { response?: { data?: { message?: string } } }).response?.data
          ?.message,
      );
    }
  }
  return (
    <main className="flex-1 min-w-0 ">
      <Header
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
        page="Queue Management"
      />

      <h1 className="mb-6 text-3xl font-bold text-gray-800 px-6">
        Queue Management
      </h1>

      <SubmitNewQueue
        patients={patients}
        services={services}
        patientId={patientId}
        setPatientId={setPatientId}
        submitQueue={submitQueue}
        setServeQueueId={setServiceId}
        setServiceName={setServiceName}
        serviceId={serviceId}
        isPriority={isPriority}
        setIsPriority={setIsPriority}
        setServiceId={setServiceId}
      />
      <div className="mt-8 flex flex-col gap-6 px-6">
        <NowServing queues={queues} loadData={loadData} />
        <LabAndConsuQueues
          queues={queues}
          queuesType="consultation"
          loadData={loadData}
        />

        <LabAndConsuQueues
          queues={queues}
          queuesType="laboratory"
          loadData={loadData}
        />
      </div>
    </main>
  );
}

export default QueueManagement;
