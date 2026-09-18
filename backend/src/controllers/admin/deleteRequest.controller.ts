import { sql } from "../../config/db.js";
import { Request, Response } from "express";

export async function deleteTemplate(req: Request, res: Response) {
  try {
    const { fixture_id } = req.params;

    if (!fixture_id) {
      return res.status(400).json({
        message: "Template ID is required",
      });
    }

    // Archive the template instead of permanently deleting it.
    const archivedTemplate = await sql`
      UPDATE report_templates
      SET
        status = 'Archived',
        updated_at = CURRENT_TIMESTAMP
      WHERE fixture_id = ${fixture_id}
      RETURNING fixture_id, name, category, status, updated_at;
    `;

    // Template does not exist
    if (archivedTemplate.length === 0) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template archived successfully",
      template: archivedTemplate[0],
    });
  } catch (error) {
    console.error("DELETE TEMPLATE ERROR:", error);

    return res.status(500).json({
      message: "Error archiving template",
    });
  }
}