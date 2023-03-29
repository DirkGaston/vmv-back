import ExerciseRecordingService from "../../services/exerciseRecording.services";
import asyncWrapper from "../../utils/asyncWrapper";

export default class ExerciseRecordingController {
  static getExerciseRecordings = asyncWrapper(async (req, res, next) => {
    try {
      const exerciseRecordings =
        await ExerciseRecordingService.getAllExerciseRecordings();
      res.json(exerciseRecordings);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  static getExerciseRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    try {
      const exerciseRecording =
        await ExerciseRecordingService.getExerciseRecordingById(id);
      res.json(exerciseRecording);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  static createExerciseRecording = asyncWrapper(async (req, res, next) => {
    try {
      const { recording_url, user_id, exercise_id } = req.body;

      const newExerciseRecording =
        await ExerciseRecordingService.createExerciseRecording({
          recording_url,
          user_id,
          exercise_id,
        });

      res.json(newExerciseRecording);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  static updateExerciseRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    try {
      const updatedExerciseRecording =
        await ExerciseRecordingService.updateExerciseRecording(id, req.body);
      res.json(updatedExerciseRecording);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  static deleteExerciseRecording = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    try {
      await ExerciseRecordingService.deleteExerciseRecording(id);
      return res.sendStatus(204);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
}
