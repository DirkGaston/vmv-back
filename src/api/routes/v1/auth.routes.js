import { Router } from "express";
import AuthController from "../../controller/auth.controllers.js";

import requiresAuth from "../../../middlewares/requiresAuth.js";

const router = Router();

router.post("/login", AuthController.login);
router.post(
  "/token",
  requiresAuth("refreshToken"),
  AuthController.refreshToken
);
router.post("/logout", requiresAuth(), AuthController.logout);

export default router;
