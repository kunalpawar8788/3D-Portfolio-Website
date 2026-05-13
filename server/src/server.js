import dotenv from "dotenv";

dotenv.config();

import app from "./app.js";
import { connectDB } from "./config/db.js";

const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
