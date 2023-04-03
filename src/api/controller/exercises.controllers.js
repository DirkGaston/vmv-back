import ExerciseService from "../../services/exercise.services.js";
import asyncWrapper from "../../utils/asyncWrapper.js";

export default class ExerciseController {
  static getExercises = asyncWrapper(async (req, res) => {
    const exercises = await ExerciseService.getExercises();
    res.json(exercises);
  });

  static getExercise = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const exercise = await ExerciseService.getExercise(id);

    if (!exercise)
      return res.status(404).json({ message: "Ejercicio no existe" });
    res.json(exercise);
  });

  static createExercise = asyncWrapper(async (req, res) => {
    const { title, description, video_url, image_url } = req.body;

    const newExercise = await ExerciseService.createExercise({
      title,
      description,
      video_url,
      image_url
    });

    res.json(newExercise);
  });

  static updateExercise = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const { title, description, video_url } = req.body;

    const exercise = await ExerciseService.updateExercise(id, {
      title,
      description,
      video_url,
    });

    res.json(exercise);
  });

  static deleteExercise = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    await ExerciseService.deleteExercise(id);

    res.sendStatus(204);
  });
}
