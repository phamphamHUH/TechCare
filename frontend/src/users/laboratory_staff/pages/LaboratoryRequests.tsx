import Header from "../../../components/Header";
import RequestSummary from "../components/LaboratoryRequests/RequestSummary";
import LaboratoryQueuePanel from "../components/LaboratoryRequests/LaboratoryQueuePanel";
import { useState } from "react";
import InformationCard from "../components/LaboratoryRequests/InformationCard";
import type { Queue } from "../../../interface/Queue";
import type { Service } from "../../../interface/Service";

type LaboratoryRequestsProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  queues: Queue[];
  services: Service[];
  loading: boolean;
  error: string | null;
  loadData: () => Promise<void>;
  room: string;
};

function LaboratoryRequests({
  open,
  setOpen,
  queues,
  services,
  loading,
  error,
  loadData,
  room,
}: LaboratoryRequestsProps) {
  const [openInformationCard, setOpenInformationCard] = useState(false);
  const [queueIdCard, setQueueIdCard] = useState<string | null>(null);
  const [openQueueAccordion, setOpenQueueAccordion] = useState<string | null>(
    null,
  );

  return (
    <main className="flex-1 min-w-0 bg-white border-l border-gray-300">
      <Header
        page="Laboratory Requests"
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
      />
      <div className="px-6 overflow-x-auto flex flex-col space-y-6 z-0">
        <RequestSummary queues={queues} services={services} room={room} />
        <LaboratoryQueuePanel
          queues={queues}
          services={services}
          loading={loading}
          error={error}
          setOpenQueueAccordion={setOpenQueueAccordion}
          openQueueAccordion={openQueueAccordion}
          setOpenInformationCard={setOpenInformationCard}
          setQueueIdCard={setQueueIdCard}
        />
        {openInformationCard && (
          <InformationCard
            onClose={() => setOpenInformationCard(false)}
            queueIdCard={queueIdCard}
          />
        )}
      </div>
    </main>
  );
}

export default LaboratoryRequests;
