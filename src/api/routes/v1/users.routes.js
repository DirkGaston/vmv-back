import { Router } from "express";
import UserController from "../../controller/users.controllers.js";
import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.get("/", requiresAuth(), UserController.getUsers);
router.post("/", UserController.createUser);
router.put("/:id", requiresAuth(), UserController.updateUser);
router.delete("/:id", requiresAuth(), UserController.deleteUser);

router.get("/:id", requiresAuth(), UserController.getUser);

router.get("/:id/recordings", requiresAuth(), UserController.getUserRecordings);
router.get("/:id/songs", requiresAuth(), UserController.getUserSongs);

export default router;
