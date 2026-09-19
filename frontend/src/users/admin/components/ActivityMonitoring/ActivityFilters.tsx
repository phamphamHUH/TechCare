import { Search } from "lucide-react";
import type { SortOrder, SeverityFilter } from "../../../../interface/Activity";

type ActivityFiltersProps = {
  search: string;
  setSearch: (value: string) => void;
  sort: SortOrder;
  setSort: (value: SortOrder) => void;
  moduleFilter: string;
  setModuleFilter: (value: string) => void;
  moduleOptions: string[];
  severity: SeverityFilter;
  setSeverity: (value: SeverityFilter) => void;
};

function ActivityFilters({
  search,
  setSearch,
  sort,
  setSort,
  moduleFilter,
  setModuleFilter,
  moduleOptions,
  severity,
  setSeverity,
}: ActivityFiltersProps) {
  return (
    <div className="flex flex-wrap items-center gap-3 mb-4">
      <div className="relative flex-1 min-w-55">
        <Search
          size={18}
          strokeWidth={1.5}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search..."
          className="w-full border border-gray-300 rounded-lg pl-10 pr-4 py-2.5 text-sm outline-none focus:border-gray-500"
        />
      </div>

      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as SortOrder)}
        className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-500"
      >
        <option value="newest">Newest</option>
        <option value="oldest">Oldest</option>
      </select>

      <select
        value={moduleFilter}
        onChange={(e) => setModuleFilter(e.target.value)}
        className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-500"
      >
        <option value="all">Module</option>
        {moduleOptions.map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      <select
        value={severity}
        onChange={(e) => setSeverity(e.target.value as SeverityFilter)}
        className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-500"
      >
        <option value="all">Severity</option>
        <option value="critical">Critical</option>
        <option value="low">Low</option>
      </select>
    </div>
  );
}

export default ActivityFilters;
