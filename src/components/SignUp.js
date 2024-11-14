import React, { useState } from "react";
import axios from "axios";
import "./SignUp.css";
import { NavLink } from "react-router-dom";

function SignupForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!name || !email || !password) {
      setError("All fields are required");
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setError("");
    setSuccessMessage("");

    try {
      // Send POST request to the backend
      const response = await axios.post("http://localhost:5000/auth/signup", {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        setSuccessMessage("User signed up successfully");
        setName("");
        setEmail("");
        setPassword("");
      }
    } catch (err) {
      setError("Error signing up. Please try again.");
      console.error("Error:", err);
    }
  };

  return (
    <div className="signup-form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            required
          />
        </div>
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <button type="submit" style={{ marginTop: "10px" }}>
          Sign Up
        </button>

              <div style={{Alignitems:"center"}}>
          Previously Have an Account?
          <NavLink to="/signin">Sign In</NavLink>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;
