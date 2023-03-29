import { Model, DataTypes } from "sequelize";
import bcrypt from "bcrypt";

export default (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Song, {
        foreignKey: "user_id",
      });
      User.hasMany(models.ExerciseRecording, {
        foreignKey: "user_id",
      });
      User.hasMany(models.SongRecording, {
        foreignKey: "user_id",
      });
      User.hasOne(models.RefreshToken, {
        foreignKey: "user_id",
      });
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: {
            msg: "No es una dirección de email válida",
          },
          notNull: {
            msg: "Se requiere un email",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "La contraseña no puede ser nula",
          },
        },
      },
      username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          len: {
            args: [2, 50],
            msg: "El nombre de usuario debe contener entre 2 y 50 caracteres.",
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.STRING(50),
        validate: {
          isIn: [["guest", "student", "admin"]],
        },
      },
      firstName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "El nombre debe contener entre 3 y 50 caracteres.",
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "El apellido debe contener entre 3 y 50 caracteres.",
          },
        },
      },
      birthday: {
        type: DataTypes.DATEONLY,
        allowNull: true,
        validate: {
          isDate: {
            msg: "El cumpleaños debe ser una fecha válida",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          is: {
            args: /^(\+56[- ]?)?(\(\d{1,3}\)[- ]?)?\d{3}[- ]?\d{4}$/,
            msg: "Formato incorrecto de número de teléfono",
          },
        },
      },
      emergencyContactName: {
        type: DataTypes.STRING(50),
        allowNull: true,
        validate: {
          len: {
            args: [3, 50],
            msg: "El nombre del contacto de emergencia debe contener entre 3 y 50 caracteres.",
          },
        },
      },
      emergencyPhoneNumber: {
        type: DataTypes.STRING(20),
        allowNull: true,
        validate: {
          is: {
            args: /^(\+56[- ]?)?(\(\d{1,3}\)[- ]?)?\d{3}[- ]?\d{4}$/,
            msg: "Formato incorrecto de número de teléfono",
          },
        },
      },
      facebookLink: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      instagramLink: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      tiktokLink: {
        type: DataTypes.STRING(100),
        allowNull: true,
      },
      photoUrl: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      defaultScope: {
        attributes: { exclude: ["password"] },
      },
      scopes: {
        withPassword: {
          attributes: { include: ["password"] },
        },
      },
      underscored: true,
    }
  );

  User.prototype.comparePasswords = async function (password) {
    return bcrypt.compare(password, this.password);
  };

  return User;
};
