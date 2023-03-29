import express from "express";
import authRoutes from "./auth.routes";
import userRoutes from "./users.routes";
import songRoutes from "./song.routes";
import exerciseRoutes from "./exercises.routes";
import exerciseRecordingRoutes from "./exerciseRecordings.routes";
import songRecordingRoutes from "./songRecordings.routes";

const app = express();

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/songs", songRoutes);
app.use("/exercises", exerciseRoutes);
app.use("/exercise-recordings", exerciseRecordingRoutes);
app.use("/song-recordings", songRecordingRoutes);

export default app;
