import { beforeAll, afterEach } from "vitest";
import { connectNeon, sql } from "../config/db.js";

beforeAll(async () => {
  await connectNeon();
});

const TABLES = [
  "users",
  "patients",
  "services",
  "queue_entries",
  "consultation_records",
  "lab_requests",
  "laboratory_request_items",
  "laboratory_results",
  "bills",
  "system_activity",
  "packages",
];

afterEach(async () => {
  await sql.query(
    `TRUNCATE TABLE ${TABLES.join(", ")} RESTART IDENTITY CASCADE`,
  );
});
