import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    tenantId: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here (e.g., call API)
    console.log("Login form submitted:", formData);

    setSubmitting(true);
    setSubmitError(null);
    setSuccessMessage(null);

    try {
      var result = await login(
        formData.username,
        formData.password,
        formData.tenantId
      );
      console.log("Login result:", result);

      localStorage.setItem("authToken", result.token);
      localStorage.setItem("tenant", result.tenant);
      localStorage.setItem("userId", result.userId);
      localStorage.setItem("firstName", result.firstName);
      localStorage.setItem("lastName", result.lastName);
      localStorage.setItem("email", result.email);
      localStorage.setItem("expires", result.expires);

      //window.location.href = "/";
      setSuccessMessage("Client logged in successfully!");
      setTimeout(() => {
        navigate("/");
      }, 500); // Give time for state updates before navigating
    } catch (err) {
      setSubmitError("Failed to save client.");
    }
  };

  return (
    <div
      style={{
        maxWidth: "400px",
        height: "100%",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
      }}
    >
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="username"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="password"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Password:
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label
            htmlFor="tenantId"
            style={{ display: "block", marginBottom: "5px" }}
          >
            Tenant ID:
          </label>
          <input
            type="text"
            id="tenantId"
            name="tenantId"
            value={formData.tenantId}
            onChange={handleChange}
            style={{ width: "100%", padding: "8px", boxSizing: "border-box" }}
            required
          />
        </div>
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#a13392",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
