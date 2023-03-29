import { Router } from "express";
import SongController from "../../controller/songs.controllers.js";
import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.get("/", requiresAuth(), SongController.getSongs);
router.get("/:id", requiresAuth(), SongController.getSong);
router.post("/", requiresAuth(), SongController.createSong);
router.put("/:id", requiresAuth(), SongController.updateSong);
router.delete("/:id", requiresAuth(), SongController.deleteSong);

export default router;
