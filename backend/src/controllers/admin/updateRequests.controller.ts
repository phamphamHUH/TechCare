import { sql } from "../../config/db.js";
import cloudinary from "../../config/cloudinary.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

export async function updateUser(req: Request, res: Response) {
  // PATCH /api/admin/users/:user_id

  try {
    const { user_id } = req.params;

    const {
      username,
      password,
      first_name,
      middle_name,
      last_name,
      suffix,
      sex,
      email,
      contact_number,
      emergency_contact_name,
      emergency_contact,
      address,
      birthdate,
      role,
      department,
      employment_status,
      date_hired,
      shift_start,
      shift_end,
    } = req.body;

    // =========================
    // PASSWORD
    // =========================

    let hashedPassword: string | null = null;

    if (password?.trim()) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // =========================
    // PROFILE PHOTO
    // =========================

    let profilePhoto: string | null = null;

    if (req.file) {
      const uploadResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "techcare/user_photos",
      });

      profilePhoto = uploadResult.secure_url;
    }

    // =========================
    // UPDATE USER
    // =========================

    const updatedUser = await sql`
      UPDATE users
      SET
        username = COALESCE(${username}, username),

        password_hash = COALESCE(
          ${hashedPassword},
          password_hash
        ),

        first_name = COALESCE(
          ${first_name},
          first_name
        ),

        middle_name = COALESCE(
          ${middle_name},
          middle_name
        ),

        last_name = COALESCE(
          ${last_name},
          last_name
        ),

        suffix = COALESCE(
          ${suffix},
          suffix
        ),

        sex = COALESCE(
          ${sex},
          sex
        ),

        email = COALESCE(
          ${email},
          email
        ),

        contact_number = COALESCE(
          ${contact_number},
          contact_number
        ),

        emergency_contact_name = COALESCE(
          ${emergency_contact_name},
          emergency_contact_name
        ),

        emergency_contact = COALESCE(
          ${emergency_contact},
          emergency_contact
        ),

        address = COALESCE(
          ${address},
          address
        ),

        birthdate = COALESCE(
          ${birthdate},
          birthdate
        ),

        role = COALESCE(
          ${role},
          role
        ),

        department = COALESCE(
          ${department},
          department
        ),

        employment_status = COALESCE(
          ${employment_status},
          employment_status
        ),

        date_hired = COALESCE(
          ${date_hired},
          date_hired
        ),

        shift_start = COALESCE(
          ${shift_start},
          shift_start
        ),

        shift_end = COALESCE(
          ${shift_end},
          shift_end
        ),

        profile_photo = COALESCE(
          ${profilePhoto},
          profile_photo
        ),

        updated_at = CURRENT_TIMESTAMP

      WHERE user_id = ${user_id}

      RETURNING *;
    `;

    // =========================
    // USER NOT FOUND
    // =========================

    if (updatedUser.length === 0) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // =========================
    // RESPONSE
    // =========================

    return res.status(200).json({
      message: "User updated successfully!",
      user: updatedUser[0],
    });
  } catch (error) {
    console.error("UPDATE USER ERROR:", error);

    return res.status(500).json({
      message: "Failed to update user",
    });
  }
}

export async function updateUserStatus(req: Request, res: Response) {
  try {
    const { user_id } = req.params as { user_id: string };
    const { account_status } = req.body;

    if (account_status === undefined) {
      return res.status(400).json({
        message: "Account status is required.",
      });
    }

    if (typeof account_status !== "boolean") {
      return res.status(400).json({
        message: "Account status must be a boolean.",
      });
    }

    if (!account_status && user_id === req.user.user_id) {
      return res
        .status(400)
        .json({ message: "You can't deactivate your own account." });
    }

    const updatedAccountStatus = await sql`
        UPDATE users
        SET account_status = ${account_status}, updated_at = CURRENT_TIMESTAMP
        WHERE user_id = ${user_id}
        RETURNING user_id,
                  first_name,
                  last_name,
                  middle_name,
                  role,
                  account_status;  
        `;

    if (updatedAccountStatus.length !== 0) {
      return res.status(200).json({
        message: "User successfully deactivated.",
        updatedAccountStatus: updatedAccountStatus,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error.",
    });
  }
}
