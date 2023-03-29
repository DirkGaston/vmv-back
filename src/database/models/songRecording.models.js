import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class SongRecording extends Model {
    static associate(models) {
      SongRecording.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      SongRecording.belongsTo(models.Song, {
        foreignKey: "song_id",
      });
    }
  }

  SongRecording.init(
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
        unique: true,
      },
    },
    {
      sequelize,
      modelName: "SongRecording",
      tableName: "song_recordings",
      underscored: true,
    }
  );

  return SongRecording;
};
