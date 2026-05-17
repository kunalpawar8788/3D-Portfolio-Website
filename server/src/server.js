import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const currentFilePath = fileURLToPath(import.meta.url);
const envFilePath = path.resolve(path.dirname(currentFilePath), "../.env");

dotenv.config({ path: envFilePath });

const { default: app } = await import("./app.js");
const { connectDB } = await import("./config/db.js");

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
