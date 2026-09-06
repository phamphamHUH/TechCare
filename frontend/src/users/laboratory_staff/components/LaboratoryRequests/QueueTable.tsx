import { ChevronDown, ChevronUp } from "lucide-react";
import React, { type Dispatch, type SetStateAction } from "react";
import type { LaboratoryItem } from "../../../../interface/LaboratoryItem";
import type { Queue } from "../../../../interface/Queue";

type QueueTableProps = {
  filterQueues: Queue[];
  laboratoryItems: LaboratoryItem[];
  accordionError: string | null;
  accordionLoading: boolean;
  setOpenQueueAccordion: Dispatch<SetStateAction<string | null>>;
  openQueueAccordion: string | null;
  setOpenInformationCard: Dispatch<SetStateAction<boolean>>;
  setQueueIdCard: Dispatch<SetStateAction<string | null>>;
};

function QueueTable({
  filterQueues,
  laboratoryItems,
  accordionLoading,
  accordionError,
  setOpenQueueAccordion,
  openQueueAccordion,
  setOpenInformationCard,
  setQueueIdCard,
}: QueueTableProps) {
  const handleToggleAccordion = (queue_id: string) => {
    setOpenQueueAccordion((currentQueueId) =>
      currentQueueId === queue_id ? null : queue_id,
    );
  };

  return (
    <table className="w-full table-fixed">
      <colgroup>
        <col className="w-1/40" />
        <col className="w-4/40" />
        <col className="w-8/40" />
        <col className="w-5/40" />
        <col className="w-5/40" />
        <col className="w-5/40" />
        <col className="w-12/40" />
      </colgroup>
      <thead className=" bg-gray-100">
        <tr>
          <th className="px-1 py-2"></th>
          <th className="px-1 py-2">Queue ID</th>
          <th className="px-1 py-2">Patient ID</th>
          <th className="px-1 py-2">Priority</th>
          <th className="px-1 py-2">Requested At</th>
          <th className="px-1 py-2">Status</th>
          <th className="px-1 py-2">Action</th>
        </tr>
      </thead>
      <tbody className="">
        {filterQueues.map((queue) => (
          <React.Fragment key={queue.id}>
            <tr className="border-b border-gray-300">
              <td className="px-3 py-3">
                {openQueueAccordion === queue.queue_id ? (
                  <ChevronUp
                    size={20}
                    className="cursor-pointer text-gray-300 transition-all duration-75 hover:text-black"
                    onClick={() => handleToggleAccordion(queue.queue_id)}
                  />
                ) : (
                  <ChevronDown
                    size={20}
                    className="cursor-pointer text-gray-300 transition-all duration-75 hover:text-black"
                    onClick={() => handleToggleAccordion(queue.queue_id)}
                  />
                )}
              </td>
              <td className="px-1 py-3 text-sm text-center ">
                {queue.queue_id}
              </td>
              <td className="px-1 py-3 text-sm text-center ">
                {queue.patient_id}
              </td>
              <td className="px-1 py-3 text-sm text-center ">
                {queue.is_priority ? "Priority" : "Non-priority"}
              </td>
              <td className="px-1 py-3 text-sm text-center ">
                {(() => {
                  const date = new Date(queue.created_at);
                  const h24 = date.getHours();
                  const m = date.getMinutes().toString().padStart(2, "0");
                  const suffix = h24 >= 12 ? "PM" : "AM";
                  const h12 = h24 % 12 || 12;
                  return `${h12}:${m} ${suffix}`;
                })()}
              </td>
              <td className="px-1 py-3 text-sm text-center">{queue.status}</td>
              <td className="px-1 py-3 flex items-center justify-center gap-3 ">
                <button
                  className="cursor-pointer px-4 py-2 text-xs rounded-sm border-2 border-blue-500 text-blue-500 transition-all duration-300 hover:scale-105 hover:bg-blue-100"
                  onClick={() => {
                    setOpenInformationCard(true);
                    setQueueIdCard(queue.queue_id);
                  }}
                >
                  View
                </button>
                <button className="cursor-pointer px-4 py-2 text-xs  rounded-sm border-2 border-green-500 text-green-500 transition-all duration-300 hover:scale-105 hover:bg-green-100">
                  Accept
                </button>
                <button className="cursor-pointer px-4 py-2 text-xs rounded-sm border-2 border-yellow-500 text-yellow-500 transition-all duration-300 hover:scale-105 hover:bg-yellow-100">
                  Skip
                </button>
              </td>
            </tr>
            {openQueueAccordion === queue.queue_id && (
              <tr className="border-b border-gray-300 bg-gray-50">
                <td colSpan={7} className="p-4">
                  {accordionLoading ? (
                    <p className="text-sm text-gray-500">
                      Loading laboratory items...
                    </p>
                  ) : accordionError ? (
                    <p className="rounded-md border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
                      {accordionError}
                    </p>
                  ) : laboratoryItems.length === 0 ? (
                    <p className="text-sm text-gray-500">
                      No laboratory items found.
                    </p>
                  ) : (
                    <table className="w-full bg-gray-100 table-fixed">
                      <colgroup>
                        <col className="w-4/40" />
                        <col className="w-4/40" />
                        <col className="w-8/40" />
                        <col className="w-5/40" />
                        <col className="w-5/40" />
                      </colgroup>
                      <thead className="bg-gray-300">
                        <tr>
                          <th className="px-3 py-2 text-center text-sm font-medium">
                            Lab Item ID
                          </th>
                          <th className="px-3 py-2 text-center text-sm font-medium">
                            Service Name
                          </th>
                          <th className="px-3 py-2 text-center text-sm font-medium">
                            Service Type
                          </th>
                          <th className="px-3 py-2 text-center text-sm font-medium">
                            Status
                          </th>
                          <th className="px-3 py-2 text-center text-sm font-medium">
                            Updated At
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {laboratoryItems.map((item) => (
                          <tr
                            key={item.lab_item_id}
                            className="border-b border-gray-200 bg-white text-sm"
                          >
                            <td className="px-3 py-3 text-xs text-center">
                              {item.lab_item_id}
                            </td>
                            <td className="px-3 py-3 text-xs text-center">
                              {item.service_name}
                            </td>
                            <td className="px-3 py-3 text-xs text-center">
                              {item.service_type}
                            </td>
                            <td className="px-3 py-3 text-xs text-center">
                              {item.status}
                            </td>
                            <td className="px-3 py-3 text-xs text-center">
                              {(() => {
                                const date = new Date(item.created_at);
                                const h24 = date.getHours();
                                const m = date
                                  .getMinutes()
                                  .toString()
                                  .padStart(2, "0");
                                const suffix = h24 >= 12 ? "PM" : "AM";
                                const h12 = h24 % 12 || 12;
                                return `${h12}:${m} ${suffix}`;
                              })()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

export default QueueTable;
