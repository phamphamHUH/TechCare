import { describe, it, expect, beforeAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";
import { fillServicesTable } from "../helper/testService.js";

describe("GET /api/admin/users", () => {
  let testToken: string;

  beforeEach(async () => {
    const testAdmin = await createTestUser({});
    testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );
  });

  it("returns all users", async () => {
    await createTestUser({}, "doctor");
    await createTestUser({}, "labstaff");

    const res = await request(app)
      .get("/api/admin/users")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.users).toBeDefined();
    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.length).toBeGreaterThanOrEqual(3);
  });
});

describe("GET /api/admin/services", () => {
  let testToken: string;

  beforeEach(async () => {
    const testAdmin = await createTestUser({});
    testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );
  });

  it("returns all services", async () => {
    await fillServicesTable();
    const res = await request(app)
      .get("/api/admin/services")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.services).toBeDefined();
    expect(Array.isArray(res.body.services)).toBe(true);
    expect(res.body.services.length).toBeGreaterThanOrEqual(2);
  });

  it("returns empty array", async () => {
    const res = await request(app)
      .get("/api/admin/services")
      .set("Authorization", `Bearer ${testToken}`);

    expect(res.status).toBe(200);
    expect(res.body.services).toBeDefined();
    expect(Array.isArray(res.body.services)).toBe(true);
    expect(res.body.services.length).toBe(0);
  });
});
