import models from "../database/models";
import JWTUtils from "../utils/jwt-utils";
import crypto from "crypto";
import sendEmail from "../utils/mailer";

const { User, RefreshToken } = models;

export default class AuthService {
  static async login({ email, password }) {
    const user = await User.scope("withPassword").findOne({ where: { email } });

    if (!user || !(await user.comparePasswords(password))) {
      throw new Error("Credenciales no válidas");
    }

    const role = user.role;
    const id = user.id;
    const username = user.username;
    const firstName = user.firstName;
    const payload = { email, role, id, username, firstName };
    const accessToken = JWTUtils.generateAccessToken(payload);
    const savedRefreshToken = await user.getRefreshToken();
    let refreshToken;

    if (!savedRefreshToken || !savedRefreshToken.token) {
      refreshToken = JWTUtils.generateRefreshToken(payload);

      if (!savedRefreshToken) {
        await user.createRefreshToken({ token: refreshToken });
      } else {
        savedRefreshToken.token = refreshToken;
        await savedRefreshToken.save();
      }
    } else {
      refreshToken = savedRefreshToken.token;
    }

    console.log(id);

    return { accessToken, refreshToken, email, role, id, username, firstName };
  }

  static async refreshToken({ email }) {
    const user = await User.findOne({
      where: { email },
      include: RefreshToken,
    });

    console.log(user);
    const savedToken = user.RefreshToken;

    if (!savedToken || !savedToken.token) {
      throw new Error("Debes loguearte primero");
    }

    const payload = { email, role };
    const newAccessToken = JWTUtils.generateAccessToken(payload);

    return { accessToken: newAccessToken };
  }

  static async logout({ email }) {
    const user = await User.findOne({
      where: { email },
      include: RefreshToken,
    });
    if (user.RefreshToken) {
      user.RefreshToken.token = null;
      await user.RefreshToken.save();
    }
    user.RefreshToken.token = null;
    await user.RefreshToken.save();
  }

  static async forgotPassword({ email }) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("No existe una cuenta con ese correo electrónico");
    }

    const token = crypto.randomBytes(20).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;

    const resetURL = `https://vmv-back.up.railway.app/api/v1/reset-password/${token}`;
    const mailContent = `
      <h1>Restablecer contraseña</h1>
      <p>Por favor, haga clic en el siguiente enlace para restablecer su contraseña:</p>
      <a href="${resetURL}">${resetURL}</a>
    `;

    await sendEmail({
      to: email,
      subject: "Restablecer contraseña VMV",
      html: mailContent,
    });

    return {
      message: "Se ha enviado un correo electrónico con las instrucciones",
    };
  }

  static async resetPassword({ token, newPassword }) {
    const user = await User.scope("withPassword").findOne({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: { [models.Sequelize.Op.gt]: Date.now() },
      },
    });

    if (!user) {
      throw new Error(
        "El token de restablecimiento de contraseña no es válido o ha expirado"
      );
    }

    user.password = newPassword;
    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await user.save();

    return { message: "Su contraseña ha sido restablecida con éxito" };
  }
}
