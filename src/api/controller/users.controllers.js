import UserService from "../../services/user.services.js";
import asyncWrapper from "../../utils/asyncWrapper";
import JWTUtils from "../../utils/jwt-utils.js";
import models from "../../database/models/index.js";

const { User } = models;

export default class UserController {
  static createUser = asyncWrapper(async (req, res, next) => {
    const { email } = req.body;
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      res.status(200).json({ success: false, message: "Usuario ya existe" });
    }

    const payload = { email: req.body.email };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const refreshToken = JWTUtils.generateRefreshToken(payload);

    const data = await UserService.createNewUser({ ...req.body, refreshToken });
    res.json({
      success: true,
      message: "Usuario registrado con éxito",
      data: { accessToken, refreshToken },
    });
  });

  static getUsers = asyncWrapper(async (req, res, next) => {
    const data = await UserService.getUsers();
    res.json({
      success: true,
      message: "Usuarios recuperados con éxito",
      data,
    });
  });

  static updateUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await UserService.updateUser(id, req.body);
    res.json({
      success: true,
      message: "Usuario actualizado con éxito",
      data,
    });
  });

  static deleteUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    await UserService.deleteUser(id);
    res.json({
      success: true,
      message: "Usuario eliminado con éxito",
    });
  });

  static getUser = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await UserService.getUser(id);
    res.json({
      success: true,
      message: "Usuario recuperado con éxito",
      data,
    });
  });

  static getUserRecordings = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await UserService.getUserRecordings(id);
    res.json({
      success: true,
      message: `Grabaciones del usuario con ID ${id} recuperadas con éxito`,
      data,
    });
  });

  static getUserSongs = asyncWrapper(async (req, res, next) => {
    const { id } = req.params;
    const data = await UserService.getUserSongs(id);
    res.json({
      success: true,
      message: `Canciones del usuario con ID ${id} recuperadas con éxito`,
      data,
    });
  });
}
