import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class Song extends Model {
    static associate(models) {
      Song.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Song.hasMany(models.SongRecording, {
        foreignKey: "song_id",
      });
    }
  }

  Song.init(
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
      artist: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Song",
      tableName: "songs",
      underscored: true,
    }
  );

  return Song;
};
