import dotenv from "dotenv";

dotenv.config();

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import projectRoutes from "./routes/projectRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import adminProjectRoutes from "./routes/adminProjectRoutes.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || "http://localhost:5173",
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.status(200).json({ success: true, message: "Server is healthy." });
});

app.use("/api/projects", projectRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/projects", adminProjectRoutes);

app.use("/projects", projectRoutes);
app.use("/contact", contactRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
