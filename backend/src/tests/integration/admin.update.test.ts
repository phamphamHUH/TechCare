import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { sql } from "../../config/db.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";
import { fillActionsTable } from "../helper/testAction.js";

// UPDATE GENERAL USER INFORMATION
describe("PATCH /api/admin/users/:user_id", () => {
  it("updates all user fields successfully", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const updatePayload = {
      username: "updateduser123",
      password: "newPassword123!",
      first_name: "Juan",
      middle_name: "Santos",
      last_name: "Dela Cruz",
      suffix: "Jr.",
      sex: "Male",
      email: "juan.delacruz@example.com",
      contact_number: "09171234567",
      emergency_contact_name: "Maria Dela Cruz",
      emergency_contact: "09187654321",
      address: "123 Rizal Street, Barangay San Jose, Calamba, Laguna",
      birthdate: "1995-06-15",
      role: "staff",
      department: "Laboratory",
      employment_status: "Full-time",
      date_hired: "2023-03-01",
      shift_start: "08:00:00",
      shift_end: "17:00:00",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updatePayload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully!");
    expect(res.body.user).toBeDefined();
  });

  it("updates specific field successfully", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updatePayload);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User updated successfully!");
    expect(res.body.user).toBeDefined();
  });

  it("returns 404 when user id doesn't exist", async () => {
    const testUserID = "fakeUserID";
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUserID}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updatePayload);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe("User not found");
  });
});

// UPDATE USER ACCOUNT STATUS
describe("PATCH /api/admin/users/:user_id/status", () => {
  it("updates account status successfully with user id and account status", async () => {
    await fillActionsTable();
    const testUser = await createTestUser({}, "doctor");
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ account_status: false });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("User successfully deactivated.");
    expect(res.body.updatedAccountStatus).toBeDefined();

    const logs = await sql`
    SELECT
      al.status,
      al.target_type,
      al.target_id,
      a.action_name,
      al.metadata
    FROM activity_logs al
    JOIN actions a ON a.action_id = al.action_id
    WHERE al.target_id = ${testUser.user_id}
    ORDER BY al.created_at DESC
    LIMIT 1
  `;

    expect(logs).toHaveLength(1);
    expect(logs[0].action_name).toBe("user.deactivate");
    expect(logs[0].status).toBe("success");
    expect(logs[0].target_type).toBe("user");
    expect(logs[0].target_id).toBe(testUser.user_id);
    expect(logs[0].metadata).toEqual({
      newStatus: "deactivated",
    });
  });

  it("blocks self-deactivation and logs the blocked attempt", async () => {
    await fillActionsTable();
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );
    const res = await request(app)
      .patch(`/api/admin/users/${testAdmin.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        account_status: false,
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toContain("own account");

    const logs = await sql`
    SELECT
      al.status,
      al.target_type,
      al.target_id,
      a.action_name,
      al.metadata
    FROM activity_logs al
    JOIN actions a ON a.action_id = al.action_id
    WHERE al.target_id = ${testAdmin.user_id}
    ORDER BY al.created_at DESC
    LIMIT 1
  `;

    expect(logs).toHaveLength(1);
    expect(logs[0].action_name).toBe("user.deactivate");
    expect(logs[0].status).toBe("blocked");
    expect(logs[0].metadata).toEqual({
      reason: "self-deactivation attempt",
    });
  });

  it("returns 400 when account_status is missing", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({});

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Account status is required.");
  });

  it("returns 400 when account_status is not boolean", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testAdmin = await createTestUser({});
    const testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ account_status: "false" });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Account status must be a boolean.");
  });
});
