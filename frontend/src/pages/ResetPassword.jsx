import React, { useMemo, useState } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import AccountShell from "../components/AccountShell";
import { API } from "../context/AuthContext";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!token) {
      setError("This password reset link is missing or invalid.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to reset your password.");
      }

      setSuccess(data.message || "Password reset successfully.");
      setPassword("");
      setConfirmPassword("");

      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.message || "Unable to reset your password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AccountShell kicker="Account recovery" title="Create a new password">
      <p>Choose a new password for your GoNbite account. The reset link is valid for 1 hour.</p>

      <form className="form-grid" onSubmit={submit}>
        {error && <div className="form-error" role="alert">{error}</div>}
        {success && <div className="form-success" role="status">{success}</div>}

        <div className="form-field">
          <label htmlFor="reset-password">New password</label>
          <input
            id="reset-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Enter new password"
            value={password}
            onChange={(e) => { setPassword(e.target.value); setError(""); }}
          />
        </div>

        <div className="form-field">
          <label htmlFor="reset-confirm-password">Confirm password</label>
          <input
            id="reset-confirm-password"
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setError(""); }}
          />
        </div>

        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? "Updating password…" : "Reset password"}
        </button>

        <div className="form-link">
          <Link to="/login">Back to login</Link>
        </div>
      </form>
    </AccountShell>
  );
}
