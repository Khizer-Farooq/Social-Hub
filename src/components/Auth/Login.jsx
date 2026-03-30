import { useState } from "react";
import { useNavigate } from "react-router-dom";

 function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (event) => {
    event.preventDefault();

    const Email = email.trim().toLowerCase();

    if (!Email || !password) {
      setError("Enter both email and password.");
      return;
    }

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      users = [];
    }

    const user = users.find(
      (storedUser) =>
        storedUser.email.toLowerCase() === Email &&
        storedUser.password === password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user));
      setUser(user);
      navigate("/posts");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form className="auth-form" onSubmit={handleLogin}>
      <div className="field-group">
        <label htmlFor="login-email">Email</label>
        <input
          id="login-email"
          type="email"
          className="text-field"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="login-password">Password</label>
        <input
          id="login-password"
          type="password"
          className="text-field"
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button " type="submit">
        Login
      </button>
    </form>
  );
}
export default Login;