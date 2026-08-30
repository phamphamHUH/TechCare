import { describe, it, expect } from "vitest";
import request from "supertest";
import bcrypt from "bcryptjs";
import { app } from "../../app.js";
import { sql } from "../../config/db.js";

// ----------------------
// CREATE TEST USERS
async function createTestUser(
  overrides: Partial<Record<string, string | null>> = {},
) {
  const plainPassword = "password123";
  const passwordHash = await bcrypt.hash(plainPassword, 10);

  const user = {
    user_id: "U-TEST-001",
    username: "testuser",
    email: "test@example.com",
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
    role: "admin",
    department: "Test Department",
    employment_status: "Full-time",
    date_hired: "2024-01-01",
    shift_start: "08:00:00",
    shift_end: "17:00:00",
    ...overrides,
  };

  await sql`
    INSERT INTO users (
      user_id, username, password_hash, first_name, middle_name, last_name, suffix,
      sex, email, contact_number, emergency_contact_name, emergency_contact,
      address, birthdate, role, department, employment_status, date_hired,
      shift_start, shift_end
    )
    VALUES (
      ${user.user_id}, ${user.username}, ${passwordHash}, ${user.first_name}, ${user.middle_name}, ${user.last_name}, ${user.suffix},
      ${user.sex}, ${user.email}, ${user.contact_number}, ${user.emergency_contact_name}, ${user.emergency_contact},
      ${user.address}, ${user.birthdate}, ${user.role}, ${user.department}, ${user.employment_status}, ${user.date_hired},
      ${user.shift_start}, ${user.shift_end}
    )
  `;

  return { ...user, plainPassword };
}

// TEST CASES UNDER LOGIN
describe("POST /api/auth/login", () => {
  it("logs in successfully with correct username and password", async () => {
    const testUser = createTestUser();

    const res = await request(app)
      .post("/api/auth/login")
      .send({
        username: (await testUser).username,
        password: (await testUser).plainPassword,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
  });
});

// TEST CASES UNDER LOGOUT
