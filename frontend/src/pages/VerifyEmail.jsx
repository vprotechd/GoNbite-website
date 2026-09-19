import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import AccountShell from "../components/AccountShell";
import { API } from "../context/AuthContext";

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const token = searchParams.get("token");

    if (!token) {
      setStatus("error");
      setMessage("Verification link is invalid or missing.");
      return;
    }

    const verifyEmail = async () => {
      try {
        const response = await fetch(`${API}/auth/verify-email`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Email verification failed."
          );
        }

        setStatus("success");
        setMessage(
          data.message || "Your email has been verified successfully."
        );
      } catch (error) {
        console.error("Email verification error:", error);

        setStatus("error");
        setMessage(
          error.message ||
            "Unable to verify your email. Please try again."
        );
      }
    };

    verifyEmail();
  }, [searchParams]);

  return (
    <AccountShell
      kicker="GoNbite Account"
      title={
        status === "loading"
          ? "Verifying your email"
          : status === "success"
          ? "Email verified!"
          : "Verification failed"
      }
    >
      {status === "loading" && (
        <>
          <p>
            Please wait while we verify your GoNbite account.
          </p>

          <div className="form-success">
            Verifying your email…
          </div>
        </>
      )}

      {status === "success" && (
        <>
          <div className="form-success" role="status">
            {message}
          </div>

          <p>
            Your email has been successfully verified. You can
            now sign in to your GoNbite account.
          </p>

          <div className="form-link">
            <Link to="/login">Continue to Sign in</Link>
          </div>
        </>
      )}

      {status === "error" && (
        <>
          <div className="form-error" role="alert">
            {message}
          </div>

          <p>
            The verification link may have expired or already
            been used.
          </p>

          <div className="form-link">
            <Link to="/login">Go to Sign in</Link>
          </div>
        </>
      )}
    </AccountShell>
  );
}