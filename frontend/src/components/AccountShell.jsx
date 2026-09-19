import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/food logo2-Photoroom.png";
import "./Account.css";

export default function AccountShell({ kicker, title, children, admin=false }) {
  return <div className="account-page">
    <div className="account-wrap">
      <section className="account-brand">
        <Link to="/"><img src={logo} alt="GoNbite"/></Link>
        <h1>{admin ? <>GoNbite <span>Control</span>.</> : <>Good food.<br/><span>Good account.</span></>}</h1>
        <p>{admin ? "A secure workspace for managing GoNbite content and publishing useful food and local dining stories." : "Create one secure account for a smoother GoNbite experience and stay connected with what is happening on the platform."}</p>
        <div className="account-points">
          <div className="account-point"><i/> Secure account access</div>
          <div className="account-point"><i/> Email verification</div>
          <div className="account-point"><i/> Built for GoNbite</div>
        </div>
      </section>
      <section className="account-form">
        <div className="account-kicker">{kicker}</div>
        <h2>{title}</h2>
        {children}
      </section>
    </div>
  </div>
}
