import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { Project } from "./models/Project.js";
import { seedProjects } from "./data/seedProjects.js";

dotenv.config();

const runSeed = async () => {
  try {
    await connectDB();
    await Project.deleteMany({});
    await Project.insertMany(seedProjects);
    console.log("Seed data inserted.");
    process.exit(0);
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

runSeed();
