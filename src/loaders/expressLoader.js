import express from "express";
import logger from "morgan";
import cors from "cors";
import errorsMiddleware from "../middlewares/errors";
import environment from "../config/env.config";
import { v1Routes } from "../api/routes";
import { Server } from "socket.io";

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

  initSocketIO() {
    const server = this.app.listen(environment.port, () => {
      console.log(`Servidor escuchando en el puerto ${environment.port}`);
    });

    const io = new Server(server);

    io.on("connection", (socket) => {
      console.log(`New socket connection: ${socket.id}`);

      socket.on("event", (data) => {
        console.log(`Received event data: ${data}`);
      });

      socket.on("disconnect", () => {
        console.log(`Socket disconnected: ${socket.id}`);
      });
    });
  }
}
