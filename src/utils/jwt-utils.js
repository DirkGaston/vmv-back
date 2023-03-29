import jwt from "jsonwebtoken";
import environment from "../config/env.config";

export default class JWTUtils {
  static generateAccessToken(payload, options = {}) {
    const { expiresIn = "1d" } = options;
    return jwt.sign(payload, environment.jwtAccessTokenSecret, { expiresIn });
  }

  static generateRefreshToken(payload) {
    return jwt.sign(payload, environment.jwtRefreshTokenSecret);
  }

  static verifyAccessToken(accessToken) {
    console.log(`EL TOKEN DE LAS gyozasCHIOOOO:  ${accessToken}`);
    return jwt.verify(accessToken, environment.jwtAccessTokenSecret);
  }

  static verifyRefreshToken(refreshToken) {
    return jwt.verify(refreshToken, environment.jwtRefreshTokenSecret);
  }
}
