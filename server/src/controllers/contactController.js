import { firestore } from "../config/firebaseAdmin.js";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const createContactMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: "All fields are required." });
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Please provide a valid email address." });
    }

    const payload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };

    const saved = await firestore.collection("contactMessages").add(payload);
    res.status(201).json({
      success: true,
      message: "Message stored in Firebase successfully.",
      data: { id: saved.id, ...payload },
    });
  } catch (error) {
    next(error);
  }
};
