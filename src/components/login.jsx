import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginForm({ title }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://edcba7fc-c004-4b3b-bd3d-b81f09e98080-00-24crlninme5mr.sisko.replit.dev/api/login", formData, {
        withCredentials: true,
      });
      if (res.status === 200) {
        navigate("/recipes");
      }
    } catch (err) {
      console.error("Error logging in:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Login failed. Try again.");
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
          {/* Left Column - Form */}
          <div className="col-md-6 d-flex justify-content-center align-items-center bg-white p-4">
            <div style={{ width: "100%", maxWidth: "350px" }}>
              <h3 className="text-center mb-4 fw-bold">{title}</h3>

              {error && (
                <div className="alert alert-danger text-center p-2">{error}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
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

                <button type="submit" className="btn btn-primary w-100">
                  Log In
                </button>
              </form>

              <p className="text-center mt-3 text-muted">
                Don't have an account? <a href="/">Sign Up</a>
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div
            className="col-md-6 d-none d-md-block"
            style={{
              backgroundImage:
                "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTI86l2WiqfVma_IXs9UBzOg39Wqg_i1VUOernCPG8VPb8cjw78hShuqxV3uaG0thLAgE&amp;usqp=CAU')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
