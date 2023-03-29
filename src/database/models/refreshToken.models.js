import { Model, DataTypes } from "sequelize";

export default (sequelize) => {
  class RefreshToken extends Model {
    static associate(models) {
      RefreshToken.belongsTo(models.User, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }

  RefreshToken.init(
    {
      token: {
        type: DataTypes.TEXT,
        defaultValue: "",
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "RefreshToken",
      tableName: "refresh_tokens",
      underscored: true,
    }
  );

  return RefreshToken;
};
