import { describe, it, expect, beforeEach } from "vitest";
import request from "supertest";
import app from "../../app.js";
import { createTestUser } from "../helper/testUser.js";
import { loginAndGetTestToken } from "../helper/testAuth.js";

describe("POST /api/admin/actions", () => {
  let testToken: string;

  beforeEach(async () => {
    const testAdmin = await createTestUser({});
    testToken = await loginAndGetTestToken(
      testAdmin.username,
      testAdmin.plainPassword,
    );
  });

  it("creates an action with complete fields", async () => {
    const res = await request(app)
      .post("/api/admin/actions")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        action_name: "test.action",
        action_description: "test.description",
        module: "test.module",
        is_sensitive: true,
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Action successfully added.");
    expect(res.body.newAction).toBeDefined();
  });

  it("creates an action with only required fields", async () => {
    const res = await request(app)
      .post("/api/admin/actions")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        action_name: "test.action",
        module: "test.module",
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe("Action successfully added.");
    expect(res.body.newAction).toBeDefined();
  });

  it("returns 400 when module is missing", async () => {
    const res = await request(app)
      .post("/api/admin/actions")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        action_name: "test.action",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please fill out required fields.");
  });

  it("returns 400 when action_name is missing", async () => {
    const res = await request(app)
      .post("/api/admin/actions")
      .set("Authorization", `Bearer ${testToken}`)
      .send({
        module: "test.module",
      });

    expect(res.status).toBe(400);
    expect(res.body.message).toBe("Please fill out required fields.");
  });

  //   NOTE: CREATE TEST FOR STATUS 500, ARALIN MUNA MOCK
});
