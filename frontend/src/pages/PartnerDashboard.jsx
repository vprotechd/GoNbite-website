
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Store,
  Bike,
  Clock3,
  CheckCircle2,
  XCircle,
  LogOut,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const API = (
  import.meta.env.VITE_API_URL || "http://localhost:5000"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

export default function PartnerDashboard() {
  const navigate = useNavigate();

  const [partner, setPartner] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPartner() {
    const token = sessionStorage.getItem("gonbitePartnerToken");

    if (!token) {
      navigate("/partner/login", { replace: true });
      return;
    }

    setLoading(true);
    setError("");

    try {
      // This endpoint must verify the signed partner token on the backend.
      const response = await fetch(`${API}/api/partners/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json().catch(() => ({}));

      if (response.status === 401 || response.status === 403) {
        sessionStorage.removeItem("gonbitePartnerToken");
        navigate("/partner/login", { replace: true });
        return;
      }

      if (!response.ok) {
        throw new Error(data.message || "Unable to load your partner account.");
      }

      // Accept either { partner: {...} } or a direct partner object.
      const details = data.partner || data;

      if (!details || !details.status) {
        throw new Error("The server returned incomplete partner information.");
      }

      setPartner(details);
    } catch (err) {
      setError(err.message || "Unable to connect to the server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPartner();
  }, []);

  function handleLogout() {
    sessionStorage.removeItem("gonbitePartnerToken");
    sessionStorage.removeItem("gonbitePartnerLoginChallengeId");
    navigate("/partner/login", { replace: true });
  }

  const status = partner?.status?.toLowerCase();

  const statusInfo = {
    pending: {
      title: "Application Under Review",
      description:
        "Your email is verified. Our team will review your application before activating your partner account.",
      icon: <Clock3 size={34} />,
      className: "pending",
    },
    approved: {
      title: "Application Approved",
      description:
        "Congratulations! Your GoNbite partner application has been approved.",
      icon: <CheckCircle2 size={34} />,
      className: "approved",
    },
    rejected: {
      title: "Application Not Approved",
      description:
        "Your application was not approved. Please contact GoNbite support for further information.",
      icon: <XCircle size={34} />,
      className: "rejected",
    },
  };

  const currentStatus = statusInfo[status] || {
    title: "Status Unavailable",
    description: "Please contact GoNbite support for assistance.",
    icon: <ShieldCheck size={34} />,
    className: "pending",
  };

  if (loading) {
    return (
      <main className="partner-dashboard-page">
        <section className="partner-dashboard-card partner-dashboard-loading">
          <RefreshCw className="partner-dashboard-spin" size={28} />
          <p>Loading your partner account...</p>
        </section>
        <DashboardStyles />
      </main>
    );
  }

  if (error && !partner) {
    return (
      <main className="partner-dashboard-page">
        <section className="partner-dashboard-card">
          <h1>Unable to load dashboard</h1>
          <p className="partner-dashboard-error">{error}</p>
          <button className="partner-dashboard-primary" onClick={loadPartner}>
            <RefreshCw size={17} /> Try Again
          </button>
          <button className="partner-dashboard-secondary" onClick={handleLogout}>
            Return to Login
          </button>
        </section>
        <DashboardStyles />
      </main>
    );
  }

  return (
    <main className="partner-dashboard-page">
      <header className="partner-dashboard-header">
        <Link to="/" className="partner-dashboard-brand">
          Go<span>Nbite</span>
          <small>PARTNER PORTAL</small>
        </Link>

        <button
          className="partner-dashboard-logout"
          onClick={handleLogout}
        >
          <LogOut size={17} /> Logout
        </button>
      </header>

      <section className="partner-dashboard-content">
        <div className="partner-dashboard-welcome">
          <span className="partner-dashboard-eyebrow">
            PARTNER DASHBOARD
          </span>
          <h1>Welcome, {partner.name || "Partner"}!</h1>
          <p>Manage your GoNbite partnership and application status.</p>
        </div>

        <article
          className={`partner-dashboard-status ${currentStatus.className}`}
        >
          <div className="partner-dashboard-status-icon">
            {currentStatus.icon}
          </div>

          <div>
            <span className="partner-dashboard-status-label">
              APPLICATION STATUS
            </span>
            <h2>{currentStatus.title}</h2>
            <p>{currentStatus.description}</p>
          </div>
        </article>

        <div className="partner-dashboard-grid">
          <article className="partner-dashboard-card">
            <div className="partner-dashboard-card-icon">
              {partner.type === "restaurant" ? (
                <Store size={24} />
              ) : (
                <Bike size={24} />
              )}
            </div>

            <h3>Partner Information</h3>

            <div className="partner-dashboard-detail">
              <span>Partner type</span>
              <strong>
                {partner.type === "restaurant"
                  ? "Restaurant Partner"
                  : "Delivery Partner"}
              </strong>
            </div>

            <div className="partner-dashboard-detail">
              <span>Full name</span>
              <strong>{partner.name || "—"}</strong>
            </div>

            <div className="partner-dashboard-detail">
              <span>Partner ID</span>
              <strong>{partner.partnerId || "Not assigned yet"}</strong>
            </div>

            {partner.restaurant && (
              <div className="partner-dashboard-detail">
                <span>Restaurant</span>
                <strong>{partner.restaurant}</strong>
              </div>
            )}

            {partner.city && (
              <div className="partner-dashboard-detail">
                <span>City</span>
                <strong>{partner.city}</strong>
              </div>
            )}
          </article>

          <article className="partner-dashboard-card">
            <div className="partner-dashboard-card-icon">
              <ShieldCheck size={24} />
            </div>

            <h3>Account Details</h3>

            <div className="partner-dashboard-detail">
              <span>Registered email</span>
              <strong className="partner-dashboard-email">
                {partner.email || "—"}
              </strong>
            </div>

            <div className="partner-dashboard-detail">
              <span>Mobile number</span>
              <strong>{partner.phone || "—"}</strong>
            </div>

            <div className="partner-dashboard-detail">
              <span>Email verification</span>
              <strong className="partner-dashboard-verified">
                {partner.emailVerified ? "Verified" : "Not verified"}
              </strong>
            </div>

            <div className="partner-dashboard-detail">
              <span>Application submitted</span>
              <strong>
                {partner.createdAt
                  ? new Date(partner.createdAt).toLocaleDateString()
                  : "—"}
              </strong>
            </div>
          </article>
        </div>

        {status === "approved" && (
          <article className="partner-dashboard-approved-note">
            <CheckCircle2 size={21} />
            <div>
              <strong>Your partner application is approved.</strong>
              <p>
                Keep your account details up to date. Additional order
                management and delivery features can be added as the
                GoNbite partner operations system is implemented.
              </p>
            </div>
          </article>
        )}

        {status === "pending" && (
          <article className="partner-dashboard-pending-note">
            <Clock3 size={21} />
            <div>
              <strong>What happens next?</strong>
              <p>
                GoNbite will review your application. You can log in again
                later to check whether your status has changed.
              </p>
              <button
                className="partner-dashboard-refresh"
                onClick={loadPartner}
              >
                <RefreshCw size={16} /> Refresh application status
              </button>
            </div>
          </article>
        )}
      </section>

      <DashboardStyles />
    </main>
  );
}

function DashboardStyles() {
  return (
    <style>{`
      .partner-dashboard-page {
        min-height: 80vh;
        background: #fffaf5;
        color: #242424;
        padding: 0 20px 55px;
      }
      .partner-dashboard-header {
        max-width: 1100px;
        margin: 0 auto;
        min-height: 78px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #f0e4da;
      }
      .partner-dashboard-brand {
        color: #242424;
        font-size: 25px;
        font-weight: 850;
        text-decoration: none;
      }
      .partner-dashboard-brand span {
        color: #e87524;
      }
      .partner-dashboard-brand small {
        display: block;
        margin-top: 3px;
        color: #777;
        font-size: 10px;
        letter-spacing: 2px;
      }
      .partner-dashboard-logout,
      .partner-dashboard-primary,
      .partner-dashboard-secondary,
      .partner-dashboard-refresh {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        border-radius: 9px;
        padding: 11px 15px;
        font: inherit;
        font-size: 14px;
        font-weight: 650;
        cursor: pointer;
      }
      .partner-dashboard-logout,
      .partner-dashboard-secondary {
        background: white;
        border: 1px solid #ddd;
        color: #444;
      }
      .partner-dashboard-content {
        max-width: 1100px;
        margin: 35px auto 0;
      }
      .partner-dashboard-eyebrow,
      .partner-dashboard-status-label {
        color: #e87524;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 1.5px;
      }
      .partner-dashboard-welcome h1 {
        margin: 10px 0;
        font-size: clamp(28px, 4vw, 38px);
      }
      .partner-dashboard-welcome p {
        color: #666;
        line-height: 1.6;
      }
      .partner-dashboard-status {
        display: flex;
        align-items: flex-start;
        gap: 18px;
        margin: 28px 0;
        padding: 24px;
        border: 1px solid #f0e4da;
        border-radius: 16px;
        background: white;
      }
      .partner-dashboard-status-icon {
        flex-shrink: 0;
      }
      .partner-dashboard-status h2 {
        margin: 8px 0;
        font-size: 23px;
      }
      .partner-dashboard-status p {
        margin-bottom: 0;
        color: #666;
        line-height: 1.7;
      }
      .partner-dashboard-status.pending .partner-dashboard-status-icon {
        color: #c57a17;
      }
      .partner-dashboard-status.approved .partner-dashboard-status-icon {
        color: #198754;
      }
      .partner-dashboard-status.rejected .partner-dashboard-status-icon {
        color: #c0392b;
      }
      .partner-dashboard-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
      }
      .partner-dashboard-card {
        min-width: 0;
        padding: 25px;
        background: white;
        border: 1px solid #f0e4da;
        border-radius: 16px;
      }
      .partner-dashboard-card-icon {
        color: #e87524;
      }
      .partner-dashboard-card h3 {
        margin: 15px 0 20px;
        font-size: 20px;
      }
      .partner-dashboard-detail {
        display: flex;
        flex-direction: column;
        gap: 6px;
        padding: 13px 0;
        border-bottom: 1px solid #f2eee9;
      }
      .partner-dashboard-detail:last-child {
        border-bottom: none;
      }
      .partner-dashboard-detail span {
        color: #777;
        font-size: 13px;
      }
      .partner-dashboard-detail strong {
        overflow-wrap: anywhere;
        font-size: 14px;
      }
      .partner-dashboard-email {
        overflow-wrap: anywhere;
      }
      .partner-dashboard-verified {
        color: #198754;
      }
      .partner-dashboard-approved-note,
      .partner-dashboard-pending-note {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-top: 22px;
        padding: 20px;
        border-radius: 12px;
        background: white;
        border: 1px solid #f0e4da;
        line-height: 1.7;
      }
      .partner-dashboard-approved-note > svg {
        flex-shrink: 0;
        color: #198754;
      }
      .partner-dashboard-pending-note > svg {
        flex-shrink: 0;
        color: #c57a17;
      }
      .partner-dashboard-approved-note p,
      .partner-dashboard-pending-note p {
        margin: 6px 0 0;
        color: #666;
      }
      .partner-dashboard-refresh,
      .partner-dashboard-primary {
        margin-top: 14px;
        background: #e87524;
        color: white;
        border: none;
      }
      .partner-dashboard-error {
        color: #b42318;
        line-height: 1.6;
      }
      .partner-dashboard-loading {
        margin: 60px auto;
        max-width: 460px;
        text-align: center;
      }
      .partner-dashboard-loading svg {
        color: #e87524;
      }
      .partner-dashboard-spin {
        animation: partner-dashboard-rotate 1s linear infinite;
      }
      @keyframes partner-dashboard-rotate {
        to { transform: rotate(360deg); }
      }
      @media (max-width: 700px) {
        .partner-dashboard-page {
          padding: 0 13px 35px;
        }
        .partner-dashboard-grid {
          grid-template-columns: 1fr;
        }
        .partner-dashboard-status {
          padding: 19px;
        }
        .partner-dashboard-card {
          padding: 20px;
        }
      }
    `}</style>
  );
}
