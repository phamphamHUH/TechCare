import request from "supertest";
import app from "../../app"; // adjust path

export async function loginAndGetTestToken(username: string, password: string) {
  const res = await request(app)
    .post("/api/auth/login") // adjust to your real login route
    .send({ username, password });

  if (res.status !== 200) {
    throw new Error(`Login failed: ${res.status} ${JSON.stringify(res.body)}`);
  }

  // Adjust to your actual response shape, e.g. res.body.token or res.body.user.token
  return res.body.token as string;
}
