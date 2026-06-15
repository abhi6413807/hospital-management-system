import express from "express";

console.log("auth running");

const router = express.Router();

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    return res.json({
      success: true,
      message: "Login successful"
    });
  }

  res.json({
    success: false,
    message: "Invalid credentials"
  });
});

export default router;