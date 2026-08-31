import bcrypt from "bcryptjs";
import { sql } from "../../config/db.js";

export async function createTestUser(
  overrides: Partial<Record<string, string | null>> = {},
  role: "admin" | "doctor" | "labstaff" | "fdstaff" | string = "admin",
) {
  const uniqueId = Date.now();
  const plainPassword = "password123";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = {
    user_id: `U-TEST-${uniqueId}`,
    username: `testuser${uniqueId}`,
    email: `test${uniqueId}@example.com`,
    first_name: "Test",
    middle_name: "TestMiddle",
    last_name: "User",
    suffix: null,
    sex: "Male",
    contact_number: "09123456789",
    emergency_contact_name: "Test Emergency Contact",
    emergency_contact: "09000000000",
    address: "Test Address",
    birthdate: "2000-01-01",
    role: role,
    department: "Test Department",
    employment_status: "Full-time",
    date_hired: "2024-01-01",
    shift_start: "08:00:00",
    shift_end: "17:00:00",
    active: true,
    ...overrides,
  };

  await sql`
    INSERT INTO users (
      user_id, username, password_hash, first_name, middle_name, last_name, suffix,
      sex, email, contact_number, emergency_contact_name, emergency_contact,
      address, birthdate, role, department, employment_status, date_hired,
      shift_start, shift_end, active
    )
    VALUES (
      ${user.user_id}, ${user.username}, ${passwordHash}, ${user.first_name}, ${user.middle_name}, ${user.last_name}, ${user.suffix},
      ${user.sex}, ${user.email}, ${user.contact_number}, ${user.emergency_contact_name}, ${user.emergency_contact},
      ${user.address}, ${user.birthdate}, ${user.role}, ${user.department}, ${user.employment_status}, ${user.date_hired},
      ${user.shift_start}, ${user.shift_end}, ${user.active}
    )
  `;

  return { ...user, plainPassword };
}
