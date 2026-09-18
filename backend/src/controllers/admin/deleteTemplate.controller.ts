import { Request, Response } from "express";
import { sql } from "../../config/db.js";

export async function deleteTemplate(req: Request, res: Response) {
  try {
    const { fixture_id } = req.params;

    const result = await sql`
      DELETE FROM report_templates
      WHERE fixture_id = ${fixture_id}
      RETURNING fixture_id;
    `;

    if (result.length === 0) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template permanently deleted",
    });
  } catch (error) {
    console.error("Error deleting template:", error);

    return res.status(500).json({
      message: "Failed to delete template",
    });
  }
}