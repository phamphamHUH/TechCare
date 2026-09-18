import { sql } from "../../config/db.js";
import { Request, Response } from "express";

// =========================
// ARCHIVE TEMPLATE
// =========================
export async function archiveTemplate(
  req: Request<{ form_id: string }>,
  res: Response,
) {
  // PATCH /api/admin/templates/:template_id/archive

  try {
    const { form_id } = req.params;

    const archivedTemplate = await sql`
      UPDATE form_templates
      SET status = 'Archived', updated_at = CURRENT_TIMESTAMP
      WHERE form_id = ${form_id}
      RETURNING *;
    `;

    if (archivedTemplate.length === 0) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template archived successfully!",
      template: archivedTemplate[0],
    });
  } catch (error) {
    console.error("ARCHIVE TEMPLATE ERROR:", error);

    return res.status(500).json({
      message: "Failed to archive template",
    });
  }
}

// =========================
// DELETE TEMPLATE
// =========================
export async function deleteTemplate(
  req: Request<{ form_id: string }>,
  res: Response,
) {
  // DELETE /api/admin/templates/:form_id

  try {
    const { form_id } = req.params;

    const deletedTemplate = await sql`
      DELETE FROM form_templates
      WHERE form_id = ${form_id}
      RETURNING *;
    `;

    if (deletedTemplate.length === 0) {
      return res.status(404).json({
        message: "Template not found",
      });
    }

    return res.status(200).json({
      message: "Template deleted successfully!",
      template: deletedTemplate[0],
    });
  } catch (error) {
    console.error("DELETE TEMPLATE ERROR:", error);

    return res.status(500).json({
      message: "Failed to delete template",
    });
  }
}