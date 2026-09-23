import React, { useState } from "react";
import { Link } from "react-router-dom";
import AccountShell from "../components/AccountShell";
import { API } from "../context/AuthContext";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to process your request.");
      }

      setSuccess(
        data.message ||
          "If an account exists, a password reset link has been sent to your email."
      );
    } catch (err) {
      setError(err.message || "Unable to process your request.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountShell kicker="Account recovery" title="Forgot your password?">
      <p>Enter your registered email and we will send you a secure password reset link.</p>

      <form className="form-grid" onSubmit={submit}>
        {error && <div className="form-error" role="alert">{error}</div>}
        {success && <div className="form-success" role="status">{success}</div>}

        <div className="form-field">
          <label htmlFor="forgot-email">Email address</label>
          <input
            id="forgot-email"
            type="email"
            required
            autoComplete="email"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
              setSuccess("");
            }}
          />
        </div>

        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? "Sending reset link…" : "Send reset link"}
        </button>

        <div className="form-link">
          Remember your password? <Link to="/login">Back to login</Link>
        </div>
      </form>
    </AccountShell>
  );
}
