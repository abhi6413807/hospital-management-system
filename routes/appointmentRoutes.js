import express from "express";
import db from "../db.js";

const router = express.Router();

// Add Appointment
router.post("/", (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;

  db.query(
    "INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)",
    [patient_id, doctor_id, appointment_date],
    (err, result) => {
      if (err) return res.status(500).json(err);

      res.json({ message: "Appointment Added" });
    }
  );
});

// Get Appointments
router.get("/", (req, res) => {
  const sql = `
    SELECT 
      appointments.id,
      patients.name AS patient_name,
      doctors.name AS doctor_name,
      appointment_date
    FROM appointments
    JOIN patients ON appointments.patient_id = patients.id
    JOIN doctors ON appointments.doctor_id = doctors.id
  `;

  db.query(sql, (err, result) => {
    if (err) return res.status(500).json(err);

    res.json(result);
  });
});

export default router;