import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import api from "../../../../lib/axios";
import QueueTabs from "./QueueTabs";
import QueueTable from "./QueueTable";
import type { LaboratoryItem } from "../../../../interface/LaboratoryItem";
import type { Queue } from "../../../../interface/Queue";
import type { Service } from "../../../../interface/Service";

type MainFilter = "All" | "Waiting" | "Serving" | "Completed" | "Skipped";

type RequestTableProps = {
  // setRequestIdCard: React.Dispatch<React.SetStateAction<string | null>>;
  // setPatientIdCard: React.Dispatch<React.SetStateAction<string | null>>;
  // setOpenInformationCard: React.Dispatch<React.SetStateAction<boolean>>;
  queues: Queue[];
  services: Service[];
  loading: boolean;
  error: string | null;
  setOpenQueueAccordion: Dispatch<SetStateAction<string | null>>;
  openQueueAccordion: string | null;
  setOpenInformationCard: Dispatch<SetStateAction<boolean>>;
  setQueueIdCard: Dispatch<SetStateAction<string | null>>;
};

function LaboratoryQueuePanel({
  queues,
  services,
  loading,
  error,
  setOpenQueueAccordion,
  openQueueAccordion,
  setOpenInformationCard,
  setQueueIdCard,
}: RequestTableProps) {
  // MAIN STATUS TABS AND ADDITIONAL FILTER AND SORT
  const [activeMainTab, setActiveMainTab] = useState<MainFilter>("All");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchFilter, setSerchFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [sortFilter, setSortFilter] = useState("");

  // LABORATORY REQUEST ITEM STORAGE
  const [laboratoryItems, setLaboratoryItems] = useState<LaboratoryItem[]>([]);

  // ACCORDION HELPERS
  const [accordionError, setAccordionError] = useState<string | null>(null);
  const [accordionLoading, setAccordionLoading] = useState(false);

  // FOR FETCHING ITEMS WHEN QUEUE ACCORDION IS OPENED
  useEffect(() => {
    if (!openQueueAccordion) {
      return;
    }

    async function fetchLaboratoryItems() {
      try {
        setAccordionLoading(true);
        setAccordionError(null);

        const itemResponse = await api.get(
          `/api/labstaff/laboratory-queues/${openQueueAccordion}/items`,
        );
        setLaboratoryItems(itemResponse.data ?? []);
      } catch (err) {
        const message =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Unable to fetch data.";
        setAccordionError(message);
        setLaboratoryItems([]);
      } finally {
        setAccordionLoading(false);
      }
    }

    fetchLaboratoryItems();
  }, [openQueueAccordion]);

  const mainFilterValues: {
    label: string;
    value: MainFilter;
  }[] = [
    { label: "All", value: "All" },
    { label: "Waiting", value: "Waiting" },
    { label: "Serving", value: "Serving" },
    { label: "Completed", value: "Completed" },
    { label: "Skipped", value: "Skipped" },
  ];

  const filterQueues = queues
    .filter((queue) => {
      const matchesActiveMainFilter =
        activeMainTab === "All" ||
        (activeMainTab === "Waiting" && queue.status === "Waiting") ||
        (activeMainTab === "Serving" && queue.status === "Serving") ||
        (activeMainTab === "Completed" && queue.status === "Completed") ||
        (activeMainTab === "Skipped" && queue.status === "Skipped");

      const searchLower = searchFilter.trim().toLowerCase();
      const matchesSearch =
        !searchLower ||
        queue.queue_id.toLowerCase().includes(searchLower) ||
        queue.patient_id.toLowerCase().includes(searchLower);

      const priorityMatches =
        priorityFilter === "" ||
        (priorityFilter === "Priority" && queue.is_priority) ||
        (priorityFilter === "Non-priority" && !queue.is_priority);

      return matchesActiveMainFilter && matchesSearch && priorityMatches;
    })
    .sort((a, b) => {
      if (sortFilter === "oldest") {
        return (
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
        );
      }
      if (sortFilter === "newest") {
        return (
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        );
      }

      return a.queue_number - b.queue_number;
    });

  const mainFilterCounts = queues.reduce(
    (counts, queue) => {
      counts.All += 1;

      if (queue.is_priority) {
        counts.Priority += 1;
      }

      if (queue.status === "Waiting") {
        counts.Waiting += 1;
      }

      if (queue.status === "Serving") {
        counts["Serving"] += 1;
      }

      if (queue.status === "Completed") {
        counts.Completed += 1;
      }

      if (queue.status === "Skipped") {
        counts.Skipped += 1;
      }

      return counts;
    },
    {
      All: 0,
      Waiting: 0,
      Priority: 0,
      Serving: 0,
      Completed: 0,
      Skipped: 0,
    },
  );

  return (
    <div className="w-full min-h-20 border rounded-3xl border-gray-300 flex flex-col gap-5 items-center justify-around">
      {/* MAIN FILTERS */}
      <QueueTabs
        mainFilterValues={mainFilterValues}
        activeMainFilter={activeMainTab}
        mainFilterCounts={mainFilterCounts}
        setOpenQueueAccordion={setOpenQueueAccordion}
        onClick={setActiveMainTab}
      />
      {/* SEARCH BAR AND ADDITIONAL FILTERS */}
      <div className="flex w-full items-center justify-start gap-3 px-5">
        {/* Search */}
        <input
          type="text"
          placeholder="Patient ID, Queue ID..."
          value={searchFilter}
          className="w-full max-w-56 border rounded-lg px-3 py-1"
          onChange={(e) => setSerchFilter(e.target.value)}
        />

        {/* Priority */}
        <select
          className="border rounded-lg px-3 py-2"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="">Priority: All</option>
          <option value="Priority">Priority</option>
          <option value="Non-priority">Non-priority</option>
        </select>

        {/* Service */}
        <select
          className="border rounded-lg px-3 py-2"
          value={serviceFilter}
          onChange={(e) => setServiceFilter(e.target.value)}
        >
          <option value="">Services: All</option>
          {services.map((service) => (
            <option key={service.id} value={service.service_name}>
              {service.service_name}
            </option>
          ))}
        </select>

        {/* Sort */}
        <select
          className="border rounded-lg px-3 py-2"
          value={sortFilter}
          onChange={(e) => setSortFilter(e.target.value)}
        >
          <option value="">Sort: Queue #</option>
          <option value="newest">Sort: Newest</option>
          <option value="oldest">Sort: Oldest</option>
        </select>
      </div>
      {/* TABLE HEADERS */}
      {error ? (
        <div className=" border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          {error}
        </div>
      ) : null}
      {loading ? (
        <div className=" border border-gray-200 bg-gray-100 p-4 text-sm">
          Loading {activeMainTab} laboratory queues...
        </div>
      ) : filterQueues.length === 0 ? (
        <div className="w-full text-center mb-8 border-gray-200 bg-gray-100 p-4 text-sm">
          No laboratory requests found.
        </div>
      ) : (
        <div className="mb-8">
          <QueueTable
            filterQueues={filterQueues}
            laboratoryItems={laboratoryItems}
            accordionError={accordionError}
            accordionLoading={accordionLoading}
            setOpenQueueAccordion={setOpenQueueAccordion}
            openQueueAccordion={openQueueAccordion}
            setOpenInformationCard={setOpenInformationCard}
            setQueueIdCard={setQueueIdCard}
          />
        </div>
      )}
    </div>
  );
}

export default LaboratoryQueuePanel;
