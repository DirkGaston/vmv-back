import models from "../database/models";
import JWTUtils from "../utils/jwt-utils";

const { User, RefreshToken } = models;

export default class AuthService {
  static async login({ email, password }) {
    const user = await User.scope("withPassword").findOne({ where: { email } });

    if (!user || !(await user.comparePasswords(password))) {
      throw new Error("Credenciales no válidas");
    }

    const payload = { email };
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

    return { accessToken, refreshToken };
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

    const payload = { email };
    const newAccessToken = JWTUtils.generateAccessToken(payload);

    return { accessToken: newAccessToken };
  }

  static async logout({ email }) {
    const user = await User.findOne({
      where: { email },
      include: RefreshToken,
    });
    user.RefreshToken.token = null;
    await user.RefreshToken.save();
  }
}
