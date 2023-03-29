import { Router } from "express";
import SongRecordingController from "../../controller/songRecordings.controllers.js";
import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.get("/", requiresAuth(), SongRecordingController.getSongRecordings);
router.post("/", requiresAuth(), SongRecordingController.createSongRecording);
router.put("/:id", requiresAuth(), SongRecordingController.updateSongRecording);
router.delete(
  "/:id",
  requiresAuth(),
  SongRecordingController.deleteSongRecording
);
router.get("/:id", requiresAuth(), SongRecordingController.getSongRecording);

export default router;
