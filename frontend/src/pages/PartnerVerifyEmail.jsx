
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, MailCheck, LoaderCircle } from "lucide-react";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export default function PartnerVerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();

  const applicationId =
    location.state?.applicationId ||
    sessionStorage.getItem("gonbitePartnerApplicationId");

  const email =
    location.state?.email ||
    sessionStorage.getItem("gonbitePartnerEmail") ||
    "";

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (seconds <= 0) return;
    const timer = setTimeout(() => setSeconds((value) => value - 1), 1000);
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

    if (!applicationId) {
      setError("Application ID not found. Please register again.");
      return;
    }

    if (!/^\d{6}$/.test(otp)) {
      setError("Enter the six-digit verification code.");
      return;
    }

    setLoading(true);

    try {
      await postJson("/api/partners/verify-registration", {
        applicationId,
        otp,
      });

      sessionStorage.removeItem("gonbitePartnerApplicationId");
      sessionStorage.removeItem("gonbitePartnerEmail");
      sessionStorage.removeItem("gonbitePartnerType");

      navigate("/partner/login", {
        replace: true,
        state: { verified: true, email },
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    setError("");
    setMessage("");

    if (!applicationId) {
      setError("Application ID not found. Please register again.");
      return;
    }

    setResending(true);

    try {
      const data = await postJson(
        "/api/partners/resend-registration-otp",
        { applicationId }
      );

      setMessage(data.message || "A new verification code has been sent.");
      setSeconds(60);
      setOtp("");
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  }

  if (!applicationId) {
    return (
      <main className="partner-verify-page">
        <section className="partner-verify-card">
          <h1>Application not found</h1>
          <p>Please start your partner registration again.</p>
          <Link to="/partner-with-us">Back to Partner With Us</Link>
        </section>
      </main>
    );
  }

  return (
    <main className="partner-verify-page">
      <section className="partner-verify-card">
        <Link to="/partner-with-us" className="partner-verify-back">
          <ArrowLeft size={17} /> Back
        </Link>

        <div className="partner-verify-icon">
          <MailCheck size={34} />
        </div>

        <h1>Verify your email</h1>
        <p className="partner-verify-description">
          Enter the six-digit code sent to your registered email address.
        </p>

        {email && <p className="partner-verify-email">{email}</p>}

        <form onSubmit={handleVerify}>
          <label htmlFor="partner-otp">Verification code</label>
          <input
            id="partner-otp"
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

          {error && <p className="partner-verify-error">{error}</p>}
          {message && <p className="partner-verify-message">{message}</p>}

          <button type="submit" disabled={loading}>
            {loading ? (
              <>
                <LoaderCircle className="partner-verify-spin" size={18} />
                Verifying...
              </>
            ) : (
              "Verify Email"
            )}
          </button>
        </form>

        <div className="partner-resend">
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

        <p className="partner-verify-footer">
          After verification, your application will await admin approval.
        </p>
      </section>

      <style>{`
        .partner-verify-page {
          min-height: 75vh;
          padding: 55px 16px;
          background: #fffaf5;
          color: #242424;
        }
        .partner-verify-card {
          max-width: 460px;
          margin: 0 auto;
          padding: 32px;
          background: white;
          border: 1px solid #f0e4da;
          border-radius: 18px;
          box-shadow: 0 8px 30px #00000008;
        }
        .partner-verify-back {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #666;
          text-decoration: none;
          font-size: 14px;
        }
        .partner-verify-icon {
          width: 64px;
          height: 64px;
          margin-top: 26px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fff0e4;
          color: #e87524;
        }
        .partner-verify-card h1 {
          margin: 22px 0 10px;
          font-size: 30px;
        }
        .partner-verify-description,
        .partner-verify-footer {
          color: #666;
          line-height: 1.7;
        }
        .partner-verify-email {
          overflow-wrap: anywhere;
          font-weight: 700;
          color: #444;
        }
        .partner-verify-card form {
          display: grid;
          gap: 12px;
          margin-top: 25px;
        }
        .partner-verify-card label {
          font-weight: 650;
          font-size: 14px;
        }
        .partner-verify-card input {
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
        .partner-verify-card input:focus {
          border-color: #e87524;
          box-shadow: 0 0 0 3px #e875241c;
        }
        .partner-verify-card form > button {
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
        .partner-verify-card button:disabled {
          opacity: .6;
          cursor: not-allowed;
        }
        .partner-verify-error,
        .partner-verify-message {
          padding: 10px;
          border-radius: 8px;
          font-size: 14px;
          line-height: 1.5;
        }
        .partner-verify-error {
          background: #fff0f0;
          color: #b42318;
        }
        .partner-verify-message {
          background: #eaf8ef;
          color: #187744;
        }
        .partner-resend {
          margin-top: 22px;
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          color: #666;
        }
        .partner-resend button {
          border: none;
          background: transparent;
          color: #e87524;
          font: inherit;
          font-weight: 700;
          cursor: pointer;
        }
        .partner-verify-footer {
          margin-top: 24px;
          text-align: center;
          font-size: 13px;
        }
        .partner-verify-spin {
          animation: partner-verify-rotation 1s linear infinite;
        }
        @keyframes partner-verify-rotation {
          to { transform: rotate(360deg); }
        }
        @media (max-width: 520px) {
          .partner-verify-page { padding: 28px 12px; }
          .partner-verify-card { padding: 23px 18px; }
        }
      `}</style>
    </main>
  );
}
