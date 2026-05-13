import nodemailer from "nodemailer";

const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || "kunalpawar8805@gmail.com";

const createTransporter = () => {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS;

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be set to send contact emails.");
  }

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtp.gmail.com",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : true,
    auth: {
      user,
      pass,
    },
  });
};

export const sendContactEmail = async ({ name, email, message }) => {
  const transporter = createTransporter();

  await transporter.sendMail({
    from: `Portfolio Contact <${process.env.EMAIL_USER}>`,
    to: recipientEmail,
    replyTo: email,
    subject: `New portfolio message from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
        <h2 style="margin: 0 0 16px;">New Portfolio Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space: pre-wrap;">${message}</p>
      </div>
    `,
  });
};