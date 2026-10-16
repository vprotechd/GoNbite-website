
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, LoaderCircle } from "lucide-react";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export default function PartnerVerifyLogin() {
  
  const location = useLocation();
  const navigate = useNavigate();

  const challengeId =
    location.state?.loginChallengeId ||
    sessionStorage.getItem("gonbitePartnerLoginChallengeId");

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;

    const timer = setTimeout(() => {
      setSeconds((value) => value - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds]);

  async function postJson(path, body) {
    const response = await fetch(`${API}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "The request could not be completed.");
    }

    return data;
  }

  async function handleVerify(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!challengeId) {
      setError("Your login session has expired. Please request a new OTP.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the six-digit login code.");
      return;
    }

    setLoading(true);

    try {
      const data = await postJson("/api/partners/verify-login", {
        loginChallengeId: challengeId,
        otp,
      });

      if (!data.token || !data.partner) {
        throw new Error(
          "The server response is missing the partner login token or account details."
        );
      }

      // Store only the token returned after successful OTP verification.
      sessionStorage.setItem("gonbitePartnerToken", data.token);
      sessionStorage.removeItem("gonbitePartnerLoginChallengeId");

      navigate("/partner/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    if (!challengeId) {
      setError("Please return to login and request a new code.");
      return;
    }

    setResending(true);

    try {
      const data = await postJson("/api/partners/resend-login-otp", {
        loginChallengeId: challengeId,
      });

      setMessage(data.message || "A new login code has been sent.");
      setSeconds(60);
      setOtp("");
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  }

  if (!challengeId) {
    return (
      <main className="partner-login-verify-page">
        <section className="partner-login-verify-card">
          <h1>Login session expired</h1>
          <p>Please request a new verification code.</p>
          <Link to="/partner/login">Return to Partner Login</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="partner-login-verify-page">
      <section className="partner-login-verify-card">
        <Link to="/partner/login" className="partner-login-verify-back">
          <ArrowLeft size={17} /> Back to login
        </Link>

        <div className="partner-login-verify-icon">
          <ShieldCheck size={34} />
        </div>

        <h1>Verify your login</h1>
        <p className="partner-login-verify-description">
          Enter the six-digit code sent to the email address associated
          with your approved partner account.
        </p>

        <form onSubmit={handleVerify}>
          <label htmlFor="partner-login-otp">Login verification code</label>
          <input
            id="partner-login-otp"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            placeholder="000000"
            value={otp}
            onChange={(event) =>
              setOtp(event.target.value.replace(/\D/g, "").slice(0, 6))
            }
            maxLength={6}
            required
          />

          {error && <p className="partner-login-verify-error">{error}</p>}
          {message && <p className="partner-login-verify-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="partner-login-verify-spin" size={18} />
                Verifying...
              </>
            ) : (
              "Verify and Login"
            )}
          </button>
        </form>

        <div className="partner-login-resend">
          <span>Didn't receive the code?</span>
          <button
            type="button"
            onClick={handleResend}
            disabled={resending || seconds > 0}
          >
            {resending
              ? "Sending..."
              : seconds > 0
                ? `Resend in ${seconds}s`
                : "Resend OTP"}
          </button>
        </div>
      </section>

      <style>{`
        .partner-login-verify-page {
          min-height: 75vh;
          padding: 55px 16px;
          background: #fffaf5;
          color: #242424;
        }
        .partner-login-verify-card {
          max-width: 460px;
          margin: 0 auto;
          padding: 32px;
          background: white;
          border: 1px solid #f0e4da;
          border-radius: 18px;
          box-shadow: 0 8px 30px #00000008;
        }
        .partner-login-verify-back {
          display: inline-flex;
          gap: 8px;
          align-items: center;
          color: #666;
          text-decoration: none;
          font-size: 14px;
        }
        .partner-login-verify-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 64px;
          height: 64px;
          margin-top: 26px;
          border-radius: 16px;
          background: #fff0e4;
          color: #e87524;
        }
        .partner-login-verify-card h1 {
          margin: 22px 0 10px;
          font-size: 30px;
        }
        .partner-login-verify-description {
          color: #666;
          line-height: 1.7;
        }
        .partner-login-verify-card form {
          display: grid;
          gap: 12px;
          margin-top: 25px;
        }
        .partner-login-verify-card label {
          font-weight: 650;
          font-size: 14px;
        }
        .partner-login-verify-card input {
          box-sizing: border-box;
          width: 100%;
          padding: 14px;
          border: 1px solid #ddd;
          border-radius: 9px;
          font: inherit;
          font-size: 22px;
          letter-spacing: 8px;
          text-align: center;
          outline: none;
        }
        .partner-login-verify-card input:focus {
          border-color: #e87524;
          box-shadow: 0 0 0 3px #e875241c;
        }
        .partner-login-verify-card form > button {
          padding: 14px;
          border: none;
          border-radius: 9px;
          background: #e87524;
          color: white;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 8px;
        }
        .partner-login-verify-card button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }
        .partner-login-verify-error,
        .partner-login-verify-message {
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.5;
        }
        .partner-login-verify-error {
          background: #fff0f0;
          color: #b42318;
        }
        .partner-login-verify-message {
          background: #eaf8ef;
          color: #187744;
        }
        .partner-login-resend {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px;
          color: #666;
          font-size: 14px;
        }
        .partner-login-resend button {
          border: none;
          background: transparent;
          color: #e87524;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }
        .partner-login-verify-spin {
          animation: partner-login-verify-rotate 1s linear infinite;
        }
        @keyframes partner-login-verify-rotate {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 520px) {
          .partner-login-verify-page { padding: 28px 12px; }
          .partner-login-verify-card { padding: 23px 18px; }
        }
      `}</style>
    </main>
  );
}
