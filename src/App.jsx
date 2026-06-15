import { useEffect, useState } from "react";
import axios from "axios";
import Login from "./Login";

function App() {

  // ---------------- USER / LOGIN ----------------
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("user");
  });

  // ---------------- DATA ----------------
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [patientCount, setPatientCount] = useState(0);
  const [doctorCount, setDoctorCount] = useState(0);
  const [appointmentCount, setAppointmentCount] = useState(0);
  const [todayAppointments, setTodayAppointments] = useState(0);

  const [page, setPage] = useState("dashboard");

  // ---------------- FORM ----------------
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [disease, setDisease] = useState("");

  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");

  const BASE_URL = "http://localhost:5000/api";

  // ---------------- FETCH DATA ----------------
  const fetchPatients = () => {
    axios.get(`${BASE_URL}/patients`)
      .then(res => setPatients(res.data));
  };

  const fetchDoctors = () => {
    axios.get(`${BASE_URL}/doctors`)
      .then(res => setDoctors(res.data));
  };

  const fetchAppointments = () => {
    axios.get(`${BASE_URL}/appointments`)
      .then(res => setAppointments(res.data));
  };

  const fetchCounts = () => {
    axios.get(`${BASE_URL}/count/patients`).then(res => setPatientCount(res.data.total));
    axios.get(`${BASE_URL}/count/doctors`).then(res => setDoctorCount(res.data.total));
    axios.get(`${BASE_URL}/count/appointments`).then(res => setAppointmentCount(res.data.total));
  };

  const fetchTodayAppointments = () => {
    axios.get(`${BASE_URL}/appointments`)
      .then(res => {
        const today = new Date();
        today.setHours(0,0,0,0);

        const filtered = res.data.filter(a => {
          const d = new Date(a.appointment_date);
          d.setHours(0,0,0,0);
          return d.getTime() === today.getTime();
        });

        setTodayAppointments(filtered.length);
      });
  };

  // ---------------- ON LOAD ----------------
  useEffect(() => {
    fetchPatients();
    fetchDoctors();
    fetchAppointments();
    fetchCounts();
    fetchTodayAppointments();
  }, []);

  // ---------------- LOGIN CHECK ----------------
  if (!isLoggedIn) {
    return (
      <Login
        setIsLoggedIn={setIsLoggedIn}
        setUser={(u) => {
          setUser(u);
          localStorage.setItem("user", JSON.stringify(u));
        }}
      />
    );
  }

  return (
    <div style={{ display: "flex" }}>

      {/* SIDEBAR */}
      <div style={{ width: "200px", height: "100vh", background: "#333", color: "#fff", padding: "20px" }}>
        <h3>🏥 HMS</h3>

        {/* ADMIN */}
        {user?.role === "admin" && (
          <>
            <p onClick={() => setPage("dashboard")}>Dashboard</p>
            <p onClick={() => setPage("patients")}>Patients</p>
            <p onClick={() => setPage("doctors")}>Doctors</p>
            <p onClick={() => setPage("appointments")}>Appointments</p>
          </>
        )}

        {/* DOCTOR */}
        {user?.role === "doctor" && (
          <>
            <p onClick={() => setPage("dashboard")}>Dashboard</p>
            <p onClick={() => setPage("patients")}>Patients</p>
            <p onClick={() => setPage("appointments")}>Appointments</p>
          </>
        )}

        {/* PATIENT */}
        {user?.role === "patient" && (
          <>
            <p onClick={() => setPage("dashboard")}>Dashboard</p>
          </>
        )}

      </div>

      {/* MAIN */}
      <div style={{ flex: 1, padding: "20px" }}>

       {page === "dashboard" && (
  <div>
    <h1 style={{ marginBottom: "20px", color: "#111" }}>
      🏥 Dashboard
    </h1>

    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "20px"
    }}>

      <div style={{
        background: "#e3f2fd",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#111"
      }}>
        <h3>👨‍⚕️ Patients</h3>
        <h1 style={{color: "#000"}}>{patientCount}</h1>
      </div>

      <div style={{
        background: "#e8f5e9",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#111"
      }}>
        <h3>🩺 Doctors</h3>
        <h1 style={{color: "#000"}}>{doctorCount}</h1>
      </div>

      <div style={{
        background: "#fff3e0",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#111"
      }}>
        <h3>📅 Appointments</h3>
        <h1 style={{color: "#000"}}>{appointmentCount}</h1>
      </div>

      <div style={{
        background: "#fce4ec",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
        color: "#111"
      }}>
        <h3>📆 Today</h3>
        <h1 style={{color: "#000"}}>{todayAppointments}</h1>
      </div>

    </div>
  </div>
)}

        {/* PATIENTS */}
        {page === "patients" && (
          <div>
            <h1>Patients</h1>

            {user?.role === "admin" && (
              <div>
                <input placeholder="Name" onChange={(e) => setName(e.target.value)} />
                <input placeholder="Age" onChange={(e) => setAge(e.target.value)} />
                <input placeholder="Disease" onChange={(e) => setDisease(e.target.value)} />
              </div>
            )}

            <table border="1">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Age</th><th>Disease</th>
                </tr>
              </thead>
              <tbody>
                {patients.map(p => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.age}</td>
                    <td>{p.disease}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DOCTORS */}
        {page === "doctors" && (
          <div>
            <h1>Doctors</h1>

            <table border="1">
              <thead>
                <tr>
                  <th>ID</th><th>Name</th><th>Specialization</th>
                </tr>
              </thead>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.name}</td>
                    <td>{d.specialization}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* APPOINTMENTS */}
        {page === "appointments" && (
          <div>
            <h1>Appointments</h1>

            {user?.role === "admin" && (
              <div>
                <select onChange={(e) => setPatientId(e.target.value)}>
                  <option>Select Patient</option>
                  {patients.map(p => (
                    <option value={p.id}>{p.name}</option>
                  ))}
                </select>

                <select onChange={(e) => setDoctorId(e.target.value)}>
                  <option>Select Doctor</option>
                  {doctors.map(d => (
                    <option value={d.id}>{d.name}</option>
                  ))}
                </select>

                <input type="date" onChange={(e) => setDate(e.target.value)} />
              </div>
            )}

            <table border="1">
              <thead>
                <tr>
                  <th>ID</th><th>Patient</th><th>Doctor</th><th>Date</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(a => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.patient_name}</td>
                    <td>{a.doctor_name}</td>
                    <td>{a.appointment_date}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>
        )}

      </div>
    </div>
  );
}

export default App;