import models from "../database/models";

const { Exercise } = models;

export default class ExerciseService {
  static async getExercises() {
    try {
      const exercises = await Exercise.findAll();
      return exercises;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async getExercise(id) {
    try {
      const exercise = await Exercise.findOne({
        where: {
          id,
        },
      });
      return exercise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async createExercise({ title, description, video_url }) {
    try {
      const newExercise = await Exercise.create({
        title,
        description,
        video_url,
      });
      return newExercise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async updateExercise(id, { title, description, video_url }) {
    try {
      const exercise = await Exercise.findByPk(id);
      exercise.set({ title, description, video_url });
      await exercise.save();
      return exercise;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  static async deleteExercise(id) {
    try {
      await Exercise.destroy({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
