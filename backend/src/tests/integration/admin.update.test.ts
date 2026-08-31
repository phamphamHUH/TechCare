import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../app.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";

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

  it("fails with invalid token", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testToken = "fakeToken";

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updatePayload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("fails with missing token", async () => {
    const testUser = await createTestUser({}, "doctor");

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .send(updatePayload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("fails with invalid token", async () => {
    const testUser = await createTestUser({}, "doctor");

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .send(updatePayload);

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("requires admin role", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testNonAdmin = await createTestUser({}, "doctor");
    const testToken = await loginAndGetTestToken(
      testNonAdmin.username,
      testNonAdmin.plainPassword,
    );

    const updatePayload = {
      password: "newPassword123!",
    };

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}`)
      .set("Authorization", `Bearer ${testToken}`)
      .send(updatePayload);

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid role");
  });
});

// UPDATE USER ACCOUNT STATUS
describe("PATCH /api/admin/users/:user_id/status", () => {
  it("updates account status successfully with user id and account status", async () => {
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
  });

  it("fails without account status", async () => {
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

  it("fails with invalid account status", async () => {
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

  it("fails with missing token", async () => {
    const testUser = await createTestUser({}, "doctor");

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .send({ account_status: "false" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("fails with invalid token", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testToken = "fakeToken";

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ account_status: "false" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });

  it("requires admin role", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testNonAdmin = await createTestUser({}, "doctor");
    const testToken = await loginAndGetTestToken(
      testNonAdmin.username,
      testNonAdmin.plainPassword,
    );

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ account_status: false });

    expect(res.status).toBe(403);
    expect(res.body.message).toBe("Invalid role");
  });
});
