import express from "express";
import db from "../db.js";

const router = express.Router();

// ➕ Add Patient
router.post("/", (req, res) => {
  const { name, age, disease } = req.body;

  const sql = "INSERT INTO patients (name, age, disease) VALUES (?, ?, ?)";

  db.query(sql, [name, age, disease], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Patient added" });
  });
});

// 📄 Get Patients
router.get("/", (req, res) => {
  db.query("SELECT * FROM patients", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

// ✏️ Update Patient
router.put("/:id", (req, res) => {
  const { name, age, disease } = req.body;

  db.query(
    "UPDATE patients SET name=?, age=?, disease=? WHERE id=?",
    [name, age, disease, req.params.id],
    (err) => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Updated" });
    }
  );
});

// ❌ Delete Patient
router.delete("/:id", (req, res) => {
  db.query("DELETE FROM patients WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Deleted" });
  });
});

export default router;