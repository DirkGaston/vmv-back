import AuthService from "../../services/auth.services";
import asyncWrapper from "../../utils/asyncWrapper";

export default class AuthController {
  static login = asyncWrapper(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const data = await AuthService.login({ email, password });
      res.json({ success: true, message: "Login con éxito", data });
    } catch (error) {
      if (error.message === "Credenciales no válidas") {
        return res
          .status(401)
          .json({ success: false, message: "Credenciales no válidas" });
      }
      next(error);
    }
  });

  static refreshToken = asyncWrapper(async (req, res, next) => {
    const { email } = req.body.jwt;
    const data = await AuthService.refreshToken({ email });
    res.json({ success: true, data });
  });

  static logout = asyncWrapper(async (req, res, next) => {
    const { email } = req.body.jwt;
    await AuthService.logout({ email });
    res.json({ success: true, message: "Log out con éxito" });
  });
}
