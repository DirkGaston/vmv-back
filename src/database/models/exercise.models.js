import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Exercise extends Model {
    static associate(models) {
      Exercise.hasMany(models.ExerciseRecording, {
        foreignKey: "exercise_id",
        sourceKey: "id",
      });
    }
  }

  Exercise.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      video_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Exercise",
      tableName: "exercises",
      underscored: true,
    }
  );

  return Exercise;
};
