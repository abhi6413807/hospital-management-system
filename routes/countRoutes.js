import express from "express";
import db from "../db.js";

const router = express.Router();

// 🧮 Total Patients Count
router.get("/patients", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

router.get("/appointments", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM appointments", (err, result) => {
    if (err) return res.json(err);
    res.json(result[0]);
  });
});
// 🧮 Total Doctors Count
router.get("/doctors", (req, res) => {
  db.query("SELECT COUNT(*) AS total FROM doctors", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result[0]);
  });
});

export default router;