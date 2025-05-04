import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiOutlineUser, HiLockClosed } from "react-icons/hi";
import styles from "./pages/css/Login.module.css"; // Ensure this is the correct path

function Login({ setIsAuthenticated }) {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (credentials.username === "bipin" && credentials.password === "1234") {
      
      localStorage.setItem("user", JSON.stringify(credentials));
      setIsAuthenticated(true);
      navigate("/");
    } else {
      alert("Invalid credentials! Try again.");
    }
  };

  return (
    <div className={styles["login-container"]}>
      <h2>Login</h2>
      <form onSubmit={handleLogin} className={styles.form}>
        
        <div className={styles.inputContainer}>
          <HiOutlineUser className={styles.icon} />
          <input
            type="text"
            placeholder="Username"
            value={credentials.username}
            onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
            required
          />
        </div>

        <div className={styles.inputContainer}>
          <HiLockClosed className={styles.icon} />
          <input
            type="password"
            placeholder="Password"
            value={credentials.password}
            onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
            required
          />
        </div>

        <button type="submit" className={styles.btn}>Login</button>
      </form>
    </div>
  );
}

export default Login;
