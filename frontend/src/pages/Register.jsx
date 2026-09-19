import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountShell from "../components/AccountShell";
import { API } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear messages while typing
    if (error) setError("");
    if (success) setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    // Trim values
    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;
    const confirmPassword = form.confirmPassword;

    // Basic validation
    if (!name) {
      setError("Please enter your full name.");
      return;
    }

    if (name.length < 2) {
      setError("Name must contain at least 2 characters.");
      return;
    }

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      let data = {};

      try {
        data = await response.json();
      } catch {
        data = {};
      }

      if (!response.ok) {
        throw new Error(
          data.message || "Registration failed. Please try again."
        );
      }

      setSuccess(
        data.message ||
          "Registration successful! Please check your email to verify your account."
      );

      // Clear form after successful registration
      setForm({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      // Redirect to login
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      setError(
        err.message ||
          "Unable to connect to the server. Please try again later."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountShell
      kicker="Join GoNbite"
      title="Create your account"
    >
      <p>
        Register with your email. We will send a verification link before
        your first login.
      </p>

      <form className="form-grid" onSubmit={submit} noValidate>
        {/* Error Message */}
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="form-success" role="status">
            {success}
          </div>
        )}

        {/* Full Name */}
        <div className="form-field">
          <label htmlFor="register-name">Full name</label>

          <input
            id="register-name"
            name="name"
            type="text"
            placeholder="Enter your full name"
            required
            autoComplete="name"
            value={form.name}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Email */}
        <div className="form-field">
          <label htmlFor="register-email">Email address</label>

          <input
            id="register-email"
            name="email"
            type="email"
            placeholder="Enter your email address"
            required
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        {/* Password */}
        <div className="form-field">
          <label htmlFor="register-password">Password</label>

          <input
            id="register-password"
            name="password"
            type="password"
            placeholder="Create a password"
            minLength={8}
            required
            autoComplete="new-password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />

          <small>
            Password must contain at least 8 characters.
          </small>
        </div>

        {/* Confirm Password */}
        <div className="form-field">
          <label htmlFor="register-confirm-password">
            Confirm password
          </label>

          <input
            id="register-confirm-password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            minLength={8}
            required
            autoComplete="new-password"
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
        </div>
        

        {/* Submit */}
        <button
          type="submit"
          className="form-submit"
          disabled={loading}
        >
          {loading ? "Creating account…" : "Create account"}
        </button>

        {/* Login Link */}
        <div className="form-link">
          Already registered?{" "}
          <Link to="/login">Sign in</Link>
        </div>
      </form>
    </AccountShell>
  );
}