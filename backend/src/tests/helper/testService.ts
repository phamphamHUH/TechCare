import { sql } from "../../config/db.js";

export async function createTestService() {
  const serviceId = Date.now();
  const service = {
    serviceId: `S-Test-${serviceId}`,
    service_type: `Test-Service Type`,
    service_name: `Test-Service-${serviceId}`,
    price: 1000,
    room: `Test-Room`,
  };

  await sql`
      INSERT INTO services (
        service_id,
        service_type, 
        service_name, 
        price, 
        room
      )
      VALUES (
        ${service.serviceId},
        ${service.service_type},  
        ${service.service_name}, 
        ${service.price}, 
        ${service.room}
      )
    `;
  return { service };
}
