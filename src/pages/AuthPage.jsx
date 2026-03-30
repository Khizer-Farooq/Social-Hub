import { useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";

 function AuthPage({ setUser }) {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="page auth-page">
      <div className="auth-card">
        <p className="brand-chip">Social Hub</p>
        <h1 className="auth-title">A focused place for your community updates.</h1>
        <p className="auth-subtitle">Sign in to continue or create an account to get started.</p>

        <div className="auth-tabs" role="tablist" aria-label="Authentication tabs">
          <button
            type="button"
            className={`tab-button ${isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            type="button"
            className={`tab-button ${!isLogin ? "active" : ""}`}
            onClick={() => setIsLogin(false)}
          >
            Register
          </button>
        </div>

        {isLogin ? <Login setUser={setUser} /> : <Register setUser={setUser} />}
      </div>
    </div>
  );
}
export default AuthPage;