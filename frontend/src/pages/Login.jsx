import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountShell from "../components/AccountShell";
import { API, useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);

  const { setSession } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  const submit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email.trim(),
          password: form.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      // Save login session
      setSession(data);

      // Redirect based on account role
      if (data.user?.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.message || "Unable to login.");
    } finally {
      setLoading(false);
    }
  };

  const resendVerification = async () => {
    setError("");
    setSuccess("");

    const email = form.email.trim();

    if (!email) {
      setError("Please enter your email address first.");
      return;
    }

    setResending(true);

    try {
      const response = await fetch(
        `${API}/auth/resend-verification`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Unable to resend verification email."
        );
      }

      setSuccess(
        data.message ||
          "A new verification email has been sent."
      );
    } catch (err) {
      setError(
        err.message ||
          "Unable to resend verification email."
      );
    } finally {
      setResending(false);
    }
  };

  return (
    <AccountShell
      kicker="Welcome back"
      title="Sign in to GoNbite"
    >
      <p>
        Sign in with your GoNbite account. Your account type
        will be detected automatically.
      </p>

      <form
        className="form-grid"
        onSubmit={submit}
      >
        {/* Error */}
        {error && (
          <div
            className="form-error"
            role="alert"
          >
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div
            className="form-success"
            role="status"
          >
            {success}
          </div>
        )}

        {/* Email */}
        <div className="form-field">
          <label htmlFor="login-email">
            Email address
          </label>

          <input
            id="login-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        {/* Password */}
        <div className="form-field">
          <label htmlFor="login-password">
            Password
          </label>

          <input
            id="login-password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            placeholder="Enter your password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        {/* Login */}
        <button
          type="submit"
          className="form-submit"
          disabled={loading || resending}
        >
          {loading
            ? "Signing in…"
            : "Sign in"}
        </button>

        {/* Resend verification */}
        <div className="form-link">
          <button
            type="button"
            className="resend-verification-btn"
            onClick={resendVerification}
            disabled={resending || loading}
          >
            {resending
              ? "Sending verification email…"
              : "Didn't receive the verification email? Resend"}
          </button>
        </div>

        {/* Register */}
        <div className="form-link">
          New to GoNbite?{" "}
          <Link to="/register">
            Create an account
          </Link>
        </div>
      </form>
    </AccountShell>
  );
}