import { sql } from "../../config/db.js";

export async function fillServicesTable(): Promise<void> {
  await sql`
    INSERT INTO services (
      service_id,
      service_type,
      service_name,
      price,
      room
    )
    VALUES
      (
        'S-CONSULTATION',
        'Consultation',
        'General Consultation',
        500.00,
        'Lab Room 1'
      ),
      (
        'S-PEDIATRIC',
        'Consultation',
        'Pediatric Consultation',
        600.00,
        'Lab Room 1'
      ),
      (
        'S-CBC',
        'Laboratory',
        'Complete Blood Count',
        350.00,
        'Lab Room 1'
      ),
      (
        'S-URINALYSIS',
        'Laboratory',
        'Urinalysis',
        200.00,
        'Lab Room 1'
      ),
      (
        'S-CHEST-XRAY',
        'Radiology',
        'Chest X-Ray',
        800.00,
        'Lab Room 2'
      )
    ON CONFLICT (service_id) DO NOTHING
  `;
}
