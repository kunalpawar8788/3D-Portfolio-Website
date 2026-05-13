import { Project } from "../models/Project.js";
import { seedProjects } from "../data/seedProjects.js";

export const getProjects = async (_req, res, next) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });

    if (projects.length > 0) {
      return res.status(200).json({ success: true, data: projects });
    }

    return res.status(200).json({ success: true, data: seedProjects });
  } catch (error) {
    next(error);
  }
};
