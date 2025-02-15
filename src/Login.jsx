import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./pages/css/Login.css"

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Dummy authentication (Replace this with real API authentication)
    if (credentials.username === "admin" && credentials.password === "1234") {
      localStorage.setItem("user", JSON.stringify(credentials));  // Store user data
      setIsAuthenticated(true);
      navigate("/");  // Redirect to home page
    } else {
      alert("Invalid credentials! Try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={credentials.username}
          onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
