import express from "express";
import db from "../db.js";

const router = express.Router();


// ➕ ADD DOCTOR
router.post("/add", (req, res) => {
  const { name, specialization, experience, phone } = req.body;

  const sql =
    "INSERT INTO doctors (name, specialization, experience, phone) VALUES (?, ?, ?, ?)";

  db.query(sql, [name, specialization, experience, phone], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Doctor added successfully" });
  });
});


// 📄 GET ALL DOCTORS
router.get("/", (req, res) => {
  db.query("SELECT * FROM doctors", (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});


// ❌ DELETE DOCTOR
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM doctors WHERE id = ?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);

    res.json({ message: "Doctor deleted successfully" });
  });
});


// 🔚 EXPORT
export default router;