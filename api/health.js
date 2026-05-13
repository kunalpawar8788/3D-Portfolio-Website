module.exports = (_req, res) => {
  res.status(200).json({ success: true, message: "Serverless API is healthy." });
};