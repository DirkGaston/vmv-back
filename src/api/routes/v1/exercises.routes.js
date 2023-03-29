import { Router } from "express";
import ExerciseController from "../../controller/exercises.controllers.js";
import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.get("/", requiresAuth(), ExerciseController.getExercises);
router.post("/", requiresAuth(), ExerciseController.createExercise);
router.put("/:id", requiresAuth(), ExerciseController.updateExercise);
router.delete("/:id", requiresAuth(), ExerciseController.deleteExercise);
router.get("/:id", requiresAuth(), ExerciseController.getExercise);

export default router;
