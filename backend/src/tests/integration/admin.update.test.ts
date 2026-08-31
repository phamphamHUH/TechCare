import { describe, it, expect } from "vitest";
import request from "supertest";
import { app } from "../../app.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";

// UPDATE GENERAL USER INFORMATION
// describe("PATCH /api/admin/users/:user_id", () => {
//   it("updates user information successfully", () => {});
// });

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

  it("update fails without account status", async () => {
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

  it("update fails with invalid account status", async () => {
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

  it("updates fails with missing token", async () => {
    const testUser = await createTestUser({}, "doctor");

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .send({ account_status: "false" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it("updates fails with invalid token", async () => {
    const testUser = await createTestUser({}, "doctor");
    const testToken = "fakeToken";

    const res = await request(app)
      .patch(`/api/admin/users/${testUser.user_id}/status`)
      .set("Authorization", `Bearer ${testToken}`)
      .send({ account_status: "false" });

    expect(res.status).toBe(401);
    expect(res.body.message).toBe("Invalid or expired token");
  });
});
