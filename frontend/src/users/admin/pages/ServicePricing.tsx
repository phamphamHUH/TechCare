import Header from "../../../components/Header";
import AddService from "../components/ServicePricing/AddService";
import { useEffect, useState } from "react";

type Service = {
  id: number;
  service_id: string;
  service_name: string;
  service_type: string;
  price: number;
  room: string;
  active: boolean;
};

type ServicePricingProps = {
  services: Service[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  loadData(): Promise<void>;
  loading: boolean;
};

function formatPrice(price: number): string {
  return new Intl.NumberFormat("en-PH", {
    style: "currency",
    currency: "PHP",
  }).format(price);
}

function ServicePricing({
  services,
  open,
  setOpen,
  loadData,
  loading,
}: ServicePricingProps) {
  const [search, setSearch] = useState("");
  const [showAddService, setShowAddService] = useState(false);

  const filteredService = services.filter(
    (service) =>
      service.service_name.toLowerCase().includes(search.toLowerCase()) ||
      service.service_id
        .toString()
        .toLowerCase()
        .includes(search.toLowerCase()),
  );

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <div className="flex-1 min-w-0">
      <Header
        page="Service Pricing"
        loading={loading}
        open={open}
        setOpen={setOpen}
        loadData={loadData}
      />

      <h2 className="mb-6 text-2xl font-bold px-6">
        Total Services: {filteredService.length}
      </h2>

      {showAddService && (
        <AddService
          onClose={() => setShowAddService(false)}
          loadData={loadData}
        />
      )}

      <div className="mb-4 flex items-center justify-between px-6">
        <input
          placeholder="Search for services..."
          className="w-80 border border-gray-300 p-2 text-sm focus:border-gray-900 focus:outline-none"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
        />

        <button
          className="border border-gray-900 px-4 py-2 text-sm font-medium hover:bg-gray-900 hover:text-white"
          onClick={() => setShowAddService(true)}
        >
          Add service
        </button>
      </div>

      <div className="overflow-x-auto border border-gray-200 mx-6">
        <table className="min-w-full text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                ID
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Service Name
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Type
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Room
              </th>
              <th className="px-4 py-3 text-right font-medium text-gray-500">
                Price
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500">
                Status
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredService.map((service) => (
              <tr
                key={service.service_id}
                className="border-t border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-3 text-gray-500">
                  {service.service_id}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {service.service_name}
                </td>
                <td className="px-4 py-3 capitalize text-gray-600">
                  {service.service_type}
                </td>
                <td className="px-4 py-3 text-gray-600">{service.room}</td>
                <td className="px-4 py-3 text-right text-gray-900">
                  {formatPrice(service.price)}
                </td>
                <td className="px-4 py-3 text-gray-600">
                  {service.active ? "Active" : "Inactive"}
                </td>
              </tr>
            ))}

            {filteredService.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500">
                  No services found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ServicePricing;
