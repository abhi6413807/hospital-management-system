import express from "express";
import cors from "cors";

// routes import
import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import countRoutes from "./routes/countRoutes.js";
import authRoutes from "./routes/authRoutes.js"
import appointmentRoutes from "./routes/appointmentRoutes.js"
const app = express();

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json());

app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "1234") {
    return res.json({
      user: {
        name: "Admin",
        role: "admin"
      }
    });
  }

  if (email === "doctor@gmail.com" && password === "1234") {
    return res.json({
      user: {
        name: "Doctor",
        role: "doctor"
      }
    });
  }

  return res.status(401).json({ message: "Invalid credentials" });
});

// ---------------- ROUTES ----------------
app.use("/api", authRoutes);

// Patients API
app.use("/api/patients", patientRoutes);

app.use("/api/appointments", appointmentRoutes);

// Doctors API
app.use("/api/doctors", doctorRoutes);

// Count API (dashboard numbers)
app.use("/api/count", countRoutes);

console.log("auth loaded");

// ---------------- SERVER START ----------------
app.listen(5000, () => {
  console.log(" Server running on port 5000");
});