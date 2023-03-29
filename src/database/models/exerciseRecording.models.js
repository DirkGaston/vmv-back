import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class ExerciseRecording extends Model {
    static associate(models) {
      ExerciseRecording.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      ExerciseRecording.belongsTo(models.Exercise, {
        foreignKey: "exercise_id",
      });
    }
  }

  ExerciseRecording.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      recording_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "ExerciseRecording",
      tableName: "exercise_recordings",
      underscored: true,
    }
  );

  return ExerciseRecording;
};
