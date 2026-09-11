import { Request, Response, NextFunction } from "express";

function adminMiddleware(req: Request, res: Response, next: NextFunction) {
  try {
    if (!req.user) {
      // redundant but for safety fpurposes because TS doesnt alawayys know that this middlwware comes first
      return res.status(403).json({ message: "Unauthorized" });
    }
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Invalid role" });
    }

    next();
  } catch {
    res.status(403).json("invalid role");
  }
}

export default adminMiddleware;
