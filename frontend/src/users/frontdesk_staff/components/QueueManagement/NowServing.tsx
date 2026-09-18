import api from "../../../../lib/axios";

type QueueItem = {
  id: number;
  queue_id: string;
  patient_id: string;
  patient_name: string;
  queue_number: number;
  service_name: string;
  service_type: string;
  is_priority: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}[];
type QueuesProps = {
  queues: QueueItem;
  loadData: () => Promise<void>;
};
function NowServing({ queues, loadData }: QueuesProps) {
  async function handleServiceDone(queueId: string) {
    try {
      const response = await api.delete(`/api/fdstaff/queues/${queueId}`);
      alert("Service done successfully!" + response.data.message);
      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to mark service as done.");
    }
  }
  return (
    <div className="max-h-80 overflow-y-auto rounded-lg border">
      <h1 className="text-xl font-bold p-3"> Active Sessions</h1>
      <table className="w-full table-auto divide-y divide-gray-200">
        <thead className="sticky top-0 bg-gray-50">
          <tr>
            <th className="px-3 py-2 text-left text-sm">Queue ID</th>
            <th className="px-3 py-2 text-left text-sm">Patient ID</th>
            <th className="px-3 py-2 text-left text-sm">Patient Name</th>
            <th className="px-3 py-2 text-left text-sm">Service</th>
            <th className="px-3 py-2 text-left text-sm">Patient status</th>
            <th className="px-3 py-2 text-left text-sm">ACTIONS</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 bg-white">
          {queues.map(
            (queueItem) =>
              queueItem.status === "serving" && (
                <tr key={queueItem.queue_id} className="hover:bg-gray-50">
                  <td className="px-3 py-2 text-sm">{queueItem.queue_id}</td>
                  <td className="px-3 py-2 text-sm">
                    {queueItem.patient_id || "Not registered"}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {queueItem.patient_name || "Not registered"}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {queueItem.service_name}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    {queueItem.is_priority ? "Priority" : "Regular"}
                  </td>
                  <td className="px-3 py-2 text-sm">
                    <button
                      onClick={() => handleServiceDone(queueItem.queue_id)}
                      className="border cursor-pointer p-1"
                    >
                      service done
                    </button>
                  </td>
                </tr>
              ),
          )}
        </tbody>
      </table>
    </div>
  );
}

export default NowServing;
