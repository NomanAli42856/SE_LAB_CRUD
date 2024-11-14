import React, { useState } from "react";
import axios from "axios";
import "./SignIn.css";
import { NavLink,useNavigate } from "react-router-dom";


function SignInForm({ onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      const response = await axios.post("http://localhost:5000/auth/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        setSuccessMessage("Sign in successful!");
        onSignIn(true); // Update App state to indicate sign-in success
        navigate("/products");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Invalid credentials or server error. Please try again.");
    }
  };

  return (
    <div className="signin-form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="signin-button">
          Sign In
        </button>
      </form>
      <div>
        Make your Account
        <NavLink to="/signup"> Sign Up</NavLink>
      </div>
    </div>
  );
}

export default SignInForm;
