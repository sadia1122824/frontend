import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Form({ title }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/Signup", formData);
      setSuccess("✅ Signup successful! Redirecting...");
      setError("");

      // Redirect after 2 seconds
      setTimeout(() => {
        navigate("/recipes");
      }, 2000);
    } catch (err) {
      console.error("Error submitting form:", err.response?.data || err.message);
      setError(err.response?.data?.message || "❌ Signup failed. Try again.");
      setSuccess("");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      {/* Main Card */}
      <div
        className="card shadow-lg overflow-hidden"
        style={{ width: "900px", borderRadius: "12px" }}
      >
        <div className="row g-0">
          {/* Left Column - Signup Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-white p-4">
            <div style={{ width: "100%", maxWidth: "350px" }}>
              <h3 className="text-center mb-4 fw-bold">{title}</h3>

              {/* Success & Error Messages */}
              {success && (
                <div className="alert alert-success text-center p-2">{success}</div>
              )}
              {error && (
                <div className="alert alert-danger text-center p-2">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    required
                  />
                </div>

 <button 
  type="submit" 
  className="btn btn-primary w-100">
  Sign Up
</button>

              </form>

              <p className="text-center mt-3 text-muted">
                Already have an account? <a href="/login">Login</a>
              </p>
            </div>
          </div>

          {/* Right Column - Background Image */}
          <div
            className="col-md-6 d-none d-md-block"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1400&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Form;
