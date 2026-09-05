import { describe, it, expect } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { createTestUser } from "../helper/testUser.js";

// TEST CASES UNDER LOGIN
describe("POST /api/auth/login", () => {
  it("logs in successfully with correct username and password", async () => {
    const testUser = await createTestUser();

    const res = await request(app).post("/api/auth/login").send({
      username: testUser.username,
      password: testUser.plainPassword,
    });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Login successful");
    expect(res.body.token).toBeDefined();
    expect(res.body.refreshToken).toBeDefined();
    expect(res.body.user.password_hash).toBeUndefined();
  });
});

// TEST CASES UNDER LOGOUT
