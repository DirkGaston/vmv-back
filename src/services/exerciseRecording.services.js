import models from "../database/models";

const { User, Exercise, ExerciseRecording } = models;

export default class ExerciseRecordingService {
  static async getAllExerciseRecordings() {
    return await ExerciseRecording.findAll({
      include: [User, Exercise],
    });
  }

  static async getExerciseRecordingById(id) {
    return await ExerciseRecording.findByPk(id, {
      include: [User, Exercise],
    });
  }

  static async createExerciseRecording({
    recording_url,
    user_id,
    exercise_id,
  }) {
    return await ExerciseRecording.create({
      recording_url,
      user_id,
      exercise_id,
    });
  }

  static async updateExerciseRecording(id, { recording_url }) {
    const exerciseRecording = await ExerciseRecording.findByPk(id);

    if (!exerciseRecording) {
      throw new Error(`Grabación con ID ${id} no encontrada`);
    }

    exerciseRecording.recording_url = recording_url;

    await exerciseRecording.save();

    return exerciseRecording;
  }

  static async deleteExerciseRecording(id) {
    const exerciseRecording = await ExerciseRecording.findByPk(id);

    if (!exerciseRecording) {
      throw new Error(`Grabación con ID ${id} no encontrada`);
    }

    await exerciseRecording.destroy();
  }
}
