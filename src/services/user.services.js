import bcrypt from "bcrypt";
import models from "../database/models";
import hashPassword from "../utils/hashPassword";
import { UserRoles } from "../database/enums";

const { User } = models;

export default class UserService {
  static async createNewUser({
    email,
    password,
    username,
    role,
    firstName,
    lastName,
    refreshToken,
  }) {
    return User.sequelize.transaction(async (t) => {
      const hashedPassword = await hashPassword(password);

      const user = await User.create(
        {
          email,
          password: hashedPassword,
          username,
          role: UserRoles.GUEST,
          firstName,
          lastName,
          RefreshToken: { token: refreshToken },
        },
        { include: ["RefreshToken"], transaction: t }
      );

      if (user.changed("password")) {
        const hashedPassword = await hashPassword(user.password);
        user.password = hashedPassword;
        await user.save({ transaction: t });
      }

      delete user.dataValues.password;

      return user;
    });
  }

  static async getUsers() {
    return User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });
  }

  static async updateUser(id, userData) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    console.log("Received userData:", userData);
    console.log("User before update:", user);

    const {
      email,
      username,
      birthday,
      firstName,
      lastName,
      phoneNumber,
      emergencyContactName,
      emergencyContactPhone,
      instagramLink,
      facebookLink,
      tiktokLink,
      youtubeLink,
      role,
    } = userData;

    user.email = email || user.email;
    user.birthday = birthday || user.birthday;
    user.username = username || user.username;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.emergencyContactName =
      emergencyContactName || user.emergencyContactName;
    user.emergencyContactPhone =
      emergencyContactPhone || user.emergencyContactPhone;
    user.instagramLink = instagramLink || user.instagramLink;
    user.facebookLink = facebookLink || user.facebookLink;
    user.tiktokLink = tiktokLink || user.tiktokLink;
    user.youtubeLink = youtubeLink || user.youtubeLink;
    user.role = role || user.role;

    await user.save();

    console.log("User after update:", user);

    delete user.dataValues.password;
    return user;
  }

  static async deleteUser(id) {
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    await user.destroy();
  }

  static async getUser(id) {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return user;
  }

  static async getUserRecordings(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return user.getSongRecordings();
  }

  static async getUserSongs(id) {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error(`Usuario con ID ${id} no encontrado`);
    }

    return user.getSongs();
  }
}
