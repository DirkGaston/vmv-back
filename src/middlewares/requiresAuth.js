import JWTUtils from "../utils/jwt-utils";

export default function requiresAuth(
  tokenType = "accessToken",
  requiredRole = null
) {
  return function (req, res, next) {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      try {
        var [bearer, token] = authHeader.split(" ");
        if (bearer.toLowerCase() !== "bearer" || !token) {
          throw Error;
        }
      } catch (err) {
        return res
          .status(401)
          .send({ success: false, message: "Bearer token malformado" });
      }
    } else {
      return res.status(401).send({
        success: false,
        message: "Cabecera Authorization no localizada",
      });
    }

    try {
      let jwt;
      switch (tokenType) {
        case "refreshToken":
          jwt = JWTUtils.verifyRefreshToken(token);
          break;
        case "accessToken":
          jwt = JWTUtils.verifyAccessToken(token);
          break;
      }
      req.body.jwt = jwt;

      if (requiredRole && jwt.role !== requiredRole) {
        return res.status(403).send({
          success: false,
          message: "No tienes permiso para acceder a este recurso",
        });
      }

      next();
    } catch (err) {
      return res
        .status(401)
        .send({ success: false, message: "Token no válido" });
    }
  };
}
