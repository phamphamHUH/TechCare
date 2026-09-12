import { sql } from "../../config/db.js";

export async function fillActionsTable(): Promise<void> {
  await sql`
    INSERT INTO actions (action_name, action_description, module) VALUES
      ('user.activate',         'Activated a user account',                     'Admin'),
      ('user.deactivate',       'Deactivated a user account',                   'Admin'),
      ('user.role_change',      'Changed a user''s role or permissions',        'Admin')
    ON CONFLICT (action_name) DO NOTHING
  `;
}
