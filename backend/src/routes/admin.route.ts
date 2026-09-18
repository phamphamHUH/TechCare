import { Router } from "express";
import { ENV } from "../config/env.js";
import {
  getAllUsers,
  getAllservices,
  getMyActivities,
  getAllActivities,
  getAllTemplates,
} from "../controllers/admin/getRequests.controller.js";
import {
  addUser,
  addService,
  addActivity,
  addAction,
  addTemplate,
} from "../controllers/admin/postRequests.controller.js";
import {
  updateUser,
  updateUserStatus,
  updateTemplate,
} from "../controllers/admin/updateRequests.controller.js";
import {
  archiveTemplate,
  deleteTemplate,
} from "../controllers/admin/deleteRequests.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
const router = Router();

 //if (ENV.IS_PRODUCTION) {
 //  router.use(authMiddleware, adminMiddleware);
 //  console.log("Lab Staff routes enabled");
 //}

router.use(authMiddleware, adminMiddleware);

router.get("/services", getAllservices);
router.get("/activity", getMyActivities);
router.get("/activities", getAllActivities);
router.get("/users", getAllUsers);
router.get("/templates", getAllTemplates);

router.post("/add-user", upload.single("image"), addUser);
router.post("/services", addService);
router.post("/activities", addActivity);
router.post("/actions", addAction);
router.post("/templates", addTemplate);

router.patch("/users/:user_id", upload.single("image"), updateUser);
router.patch("/users/:user_id/status", updateUserStatus);
router.patch("/templates/:template_id", updateTemplate);

router.patch("/templates/:template_id/archive", archiveTemplate);
router.delete("/templates/:template_id", deleteTemplate);

export default router;
