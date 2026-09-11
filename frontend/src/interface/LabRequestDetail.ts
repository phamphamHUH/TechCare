export type LaboratoryRequestDetail = {
  request: {
    request_id: string;
    consultation_record_id: string | null;
    doctor_id: string | null;
    is_paid: boolean;
    is_priority: boolean;
    status: string;
    patient_id: string;
    first_name: string;
    last_name: string;
    middle_name: string | null;
    suffix: string | null;
    sex: string;
    email: string;
    contact_number: string;
    address: string;
    blood_type: string | null;
    birthdate: string;
    emergency_contact_name: string | null;
    emergency_contact: string | null;
    requested_at: string;
    updated_at: string;
  };
  items: {
    lab_item_id: string;
    status: string;
    created_at: string;
    updated_at: string;
    service: {
      service_name: string;
      service_type: string;
      room: string;
    };
  }[];
};
