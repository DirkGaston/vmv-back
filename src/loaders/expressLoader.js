import express from "express";
import logger from "morgan";
import cors from "cors";
import errorsMiddleware from "../middlewares/errors";
import environment from "../config/env.config";
import { v1Routes } from "../api/routes";

export default class ExpressLoader {
  constructor() {
    this.app = express();
    this.app.use(
      logger("dev", { skip: (req, res) => environment.nodeEnv === "test" })
    );
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(cors());
    this.setRoutes();
  }

  getApp() {
    return this.app;
  }

  setRoutes() {
    this.app.use("/api/v1", v1Routes);
    this.app.use(errorsMiddleware);
  }
}
