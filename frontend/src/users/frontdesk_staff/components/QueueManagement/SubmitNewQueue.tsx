import { useState, useEffect, useRef } from "react";

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

type SubmitNewQueueProps = {
  patients: Patient;
  patientId: string | null;
  setPatientId: React.Dispatch<React.SetStateAction<string | null>>;
  services: Service;
  submitQueue: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  setServeQueueId: React.Dispatch<React.SetStateAction<string | null>>;
  setServiceName: React.Dispatch<React.SetStateAction<string | null>>;
  serviceId: string | null;
  isPriority: boolean;
  setIsPriority: React.Dispatch<React.SetStateAction<boolean>>;
  setServiceId: React.Dispatch<React.SetStateAction<string | null>>;
};

function SubmitNewQueue({
  patients,
  patientId,
  setPatientId,
  services,
  submitQueue,
  setServiceId,
  setServiceName,
  serviceId,
  isPriority,
  setIsPriority,
}: SubmitNewQueueProps) {
  const [showResults, setShowResults] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const filteredPatients = patients.filter((patient) => {
    const query = (patientId ?? "").toLowerCase();

    return (
      patient.patient_id.toLowerCase().includes(query) ||
      patient.first_name.toLowerCase().includes(query) ||
      patient.last_name.toLowerCase().includes(query)
    );
  });
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div className="rounded-xl border p-6 mx-6 shadow-md">
      <form onSubmit={submitQueue} className="space-y-4">
        <p className="text-sm text-gray-600">
          if you have already been admitted before pleas einsert your pateint ID
        </p>

        <div className="grid gap-4 md:grid-cols-3">
          <div ref={containerRef} className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
              placeholder="Search Patient ID, First Name, or Last Name"
              value={patientId ?? ""}
              onFocus={() => setShowResults(true)}
              onChange={(e) => {
                setPatientId(e.target.value);
                setShowResults(true);
              }}
            />

            {showResults && filteredPatients.length > 0 && (
              <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-lg border bg-white shadow-lg">
                {filteredPatients.map((patient) => (
                  <button
                    type="button"
                    key={patient.patient_id}
                    className="block w-full border-b px-4 py-2 text-left hover:bg-gray-100"
                    onClick={() => {
                      setPatientId(patient.patient_id);
                      setShowResults(false);
                    }}
                  >
                    <div className="font-medium">
                      {patient.first_name} {patient.last_name}
                    </div>

                    <div className="text-sm text-gray-500">
                      {patient.patient_id}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          <select
            className="rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none"
            value={serviceId ?? ""}
            onChange={(e) => {
              setServiceId(e.target.value);
              setServiceName(e.target.selectedOptions[0].text);
              // setServiceType(e.target.selectedOptions[0].getAttribute("data-service-type"));
            }}
          >
            <option value="">Select a service</option>

            {services.map((service) => (
              <option key={service.service_id} value={service.service_id}>
                {service.service_name} {service.service_type}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={isPriority}
              onChange={(e) => setIsPriority(e.target.checked)}
            />
            <span>Priority Patient</span>
          </div>
        </div>

        <button
          type="submit"
          className="rounded-lg bg-red-800 px-5 py-2 font-medium text-white transition cursor-pointer hover:bg-red-900"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default SubmitNewQueue;
