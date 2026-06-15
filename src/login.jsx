import { useState } from "react";
import axios from "axios";

function Login({ setIsLoggedIn, setUser }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    axios.post("http://localhost:5000/api/login", {
      email: email,
      password: password
    })
    .then(res => {
      console.log("LOGIN SUCCESS:", res.data);

      setIsLoggedIn(true);
      setUser(res.data.user);

      localStorage.setItem("user", JSON.stringify(res.data.user));
    })
    .catch(err => {
      console.log("LOGIN ERROR:", err);
      alert("Invalid email or password");
    });
  };

  return (
    <div style={{
      width: "300px",
      margin: "100px auto",
      padding: "20px",
      border: "1px solid #ccc",
      borderRadius: "10px",
      textAlign: "center"
    }}>
      
      <h2>🏥 HMS Login</h2>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />

      <input
        type="password"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ width: "100%", padding: "8px", margin: "10px 0" }}
      />

      <button
        onClick={handleLogin}
        style={{
          width: "100%",
          padding: "10px",
          background: "green",
          color: "white",
          border: "none",
          cursor: "pointer"
        }}
      >
        Login
      </button>

    </div>
  );
}

export default Login;