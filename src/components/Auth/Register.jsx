import { useState } from "react";
import { useNavigate } from "react-router-dom";

 function Register({ setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    event.preventDefault();

    const Name = name.trim();
    const Email = email.trim().toLowerCase();
    const Password = password.trim();

    if (!Name || !Email || !Password) {
      setError("Name, email, and password are required.");
      return;
    }

    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(Email)) {
      setError("Please enter a valid email address.");
      return;
    }

    let users = [];
    try {
      users = JSON.parse(localStorage.getItem("users")) || [];
    } catch {
      users = [];
    }

    const alreadyExists = users.some(
      (savedUser) => savedUser.email.toLowerCase() === Email
    );

    if (alreadyExists) {
      setError("That email is already registered. Please log in.");
      return;
    }

    const newUser = {
      id: Date.now(),
      name: Name,
      email: Email,
      password: Password
    };

    localStorage.setItem("users", JSON.stringify([...users, newUser]));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    setUser(newUser);
    navigate("/posts");
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <div className="field-group">
        <label htmlFor="register-name">Name</label>
        <input
          id="register-name"
          className="text-field"
          placeholder="Your display name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="register-email">Email</label>
        <input
          id="register-email"
          type="email"
          className="text-field"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>

      <div className="field-group">
        <label htmlFor="register-password">Password</label>
        <input
          id="register-password"
          type="password"
          className="text-field"
          placeholder="Create a password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>

      {error && <p className="form-error">{error}</p>}

      <button className="primary-button success" type="submit">
        Create Account
      </button>
    </form>
  );
}
export default Register;