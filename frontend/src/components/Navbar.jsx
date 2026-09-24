import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowRight, LogIn, LogOut, LayoutDashboard, UserPlus } from "lucide-react";
// import logo from "../assets/images/food logo2-Photoroom.png";
import logo from "../assets/images/food logo11.jpeg";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Why GoNbite", path: "/why-choose-us" },
  { name: "How It Works", path: "/how-it-works" },
  { name: "Blogs", path: "/blogs" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => { logout(); closeMenu(); navigate("/"); };

  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo" onClick={closeMenu}><img src={logo} alt="GoNbite" /></Link>
        <nav className="navbar-links">
          {navLinks.map(link => <Link key={link.path} to={link.path} className={location.pathname === link.path ? "navbar-link active" : "navbar-link"}>{link.name}</Link>)}
        </nav>

        <div className="navbar-actions">
          {isAuthenticated ? (
            <>
              {user?.role === "admin" && <Link to="/admin/dashboard" className="navbar-auth-btn"><LayoutDashboard size={16}/> Dashboard</Link>}
              <button type="button" className="navbar-auth-btn logout" onClick={handleLogout}><LogOut size={16}/> Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-auth-btn"><LogIn size={16}/> Login</Link>
              <Link to="/register" className="navbar-auth-btn register"><UserPlus size={16}/> Register</Link>
            </>
          )}
          <Link to="/download" className="navbar-order-btn">Download Now <ArrowRight size={17}/></Link>
        </div>

        <button type="button" className="navbar-mobile-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation" aria-expanded={menuOpen}>{menuOpen ? <X size={24}/> : <Menu size={24}/>}</button>
      </div>

      <div className={`navbar-mobile-menu ${menuOpen ? "open" : ""}`}>
        <nav>{navLinks.map(link => <Link key={link.path} to={link.path} onClick={closeMenu} className={location.pathname === link.path ? "mobile-nav-link active" : "mobile-nav-link"}>{link.name}</Link>)}</nav>
        {isAuthenticated ? (
          <>
            {user?.role === "admin" && <Link to="/admin/dashboard" className="mobile-order-btn" onClick={closeMenu}><LayoutDashboard size={17}/> Dashboard</Link>}
            <button className="mobile-order-btn" onClick={handleLogout}><LogOut size={17}/> Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="mobile-order-btn" onClick={closeMenu}><LogIn size={17}/> Login</Link>
            <Link to="/register" className="mobile-order-btn" onClick={closeMenu}><UserPlus size={17}/> Create Account</Link>
          </>
        )}
        <Link to="/download" className="mobile-order-btn" onClick={closeMenu}>Download Now <ArrowRight size={17}/></Link>
      </div>
    </header>
  );
}
export default Navbar;
