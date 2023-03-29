import { Router } from "express";
import ExerciseRecordingController from "../../controller/exerciseRecordings.controllers.js";
import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.get(
  "/",
  requiresAuth(),
  ExerciseRecordingController.getExerciseRecordings
);
router.post(
  "/",
  requiresAuth(),
  ExerciseRecordingController.createExerciseRecording
);
router.put(
  "/:id",
  requiresAuth(),
  ExerciseRecordingController.updateExerciseRecording
);
router.delete(
  "/:id",
  requiresAuth(),
  ExerciseRecordingController.deleteExerciseRecording
);
router.get(
  "/:id",
  requiresAuth(),
  ExerciseRecordingController.getExerciseRecording
);

export default router;
