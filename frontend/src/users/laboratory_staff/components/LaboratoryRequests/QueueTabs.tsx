import { type Dispatch, type SetStateAction } from "react";

type MainFilter = "All" | "Waiting" | "Serving" | "Completed" | "Skipped";

type mainFilterValue = {
  label: string;
  value: MainFilter;
};

type QueueStatusTabsProps = {
  mainFilterValues: mainFilterValue[];
  activeMainFilter: string;
  mainFilterCounts: Record<string, number>;
  onClick: (value: MainFilter) => void;
  setOpenQueueAccordion: Dispatch<SetStateAction<string | null>>;
};

function QueueTabs({
  mainFilterValues,
  activeMainFilter,
  mainFilterCounts,
  onClick,
  setOpenQueueAccordion,
}: QueueStatusTabsProps) {
  return (
    <div className="flex w-full justify-around h-10 items-end border-b border-gray-300">
      {mainFilterValues.map((mainFilter) => (
        <button
          key={mainFilter.value}
          type="button"
          onClick={() => {
            onClick(mainFilter.value);
            setOpenQueueAccordion(null);
          }}
          className={`px-5 py-1 text-sm ${
            activeMainFilter === mainFilter.value
              ? "text-blue-600 border-blue-600 border-b"
              : "text-gray-900"
          }`}
        >
          {mainFilter.label} ({mainFilterCounts[mainFilter.value]})
        </button>
      ))}
    </div>
  );
}

export default QueueTabs;
