import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";

const routes = [
  { method: "get", path: "/services" },
  { method: "get", path: "/activity" },
  { method: "get", path: "/activities" },
  { method: "get", path: "/users" },
  { method: "post", path: "/add-user" },
  { method: "post", path: "/services" },
  { method: "patch", path: "/users/507f1f77bcf86cd799439011" },
  { method: "patch", path: "/users/507f1f77bcf86cd799439011/status" },
  { method: "post", path: "/activities" },
];

describe("admin router auth gate", () => {
  it.each(routes)("returns 401 with no token", async ({ method, path }) => {
    const res = await (request(app) as any)[method](`/api/admin${path}`);
    expect(res.status).toBe(401);
    expect(res.body.message).toBe("No token provided");
  });

  it.each(routes)(
    "returns 401 with invalid token",
    async ({ method, path }) => {
      const res = await (request(app) as any)
        [method](`/api/admin${path}`)
        .set("Authorization", "Bearer fakeToken");
      expect(res.status).toBe(401);
      expect(res.body.message).toBe("Invalid or expired token");
    },
  );

  it.each(routes)(
    "returns 403 for non-admin role",
    async ({ method, path }) => {
      const testNonAdmin = await createTestUser({}, "doctor");
      const token = await loginAndGetTestToken(
        testNonAdmin.username,
        testNonAdmin.plainPassword,
      );

      const res = await (request(app) as any)
        [method](`/api/admin${path}`)
        .set("Authorization", `Bearer ${token}`);
      expect(res.status).toBe(403);
      expect(res.body.message).toBe("Invalid role");
    },
  );
});
