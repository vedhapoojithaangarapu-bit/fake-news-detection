import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useApp } from '../App.jsx';

export default function Navbar() {
  const { isLoggedIn, logout } = useApp();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const close = () => setOpen(false);

  const handleLogout = () => {
    logout();
    close();
    navigate('/');
  };

  const linkClass = ({ isActive }) => (isActive ? 'nav-link active' : 'nav-link');

  return (
    <header className="navbar-wrap">
      <nav className="navbar container" aria-label="Main navigation">
        <Link to={isLoggedIn ? '/dashboard' : '/'} className="brand" onClick={close}>
          <span className="brand-icon" aria-hidden="true">
            <svg width="26" height="26" viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="8" fill="#2563eb" />
              <path d="M9 10h14v3H9zM9 15h14v2H9zM9 19h9v2H9z" fill="white" />
              <circle cx="22" cy="22" r="5" fill="white" />
              <path
                d="M20.5 22l1.2 1.2 2-2.2"
                stroke="#2563eb"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="brand-text">FakeDetect AI</span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <div className={`nav-links ${open ? 'open' : ''}`}>
          {!isLoggedIn ? (
            <>
              <NavLink to="/" className={linkClass} onClick={close} end>
                Home
              </NavLink>
              <NavLink to="/about" className={linkClass} onClick={close}>
                About
              </NavLink>
              <NavLink to="/signin" className={linkClass} onClick={close}>
                Sign In
              </NavLink>
              <Link to="/signup" className="btn btn-primary btn-sm nav-cta" onClick={close}>
                Get Started
              </Link>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={linkClass} onClick={close}>
                Dashboard
              </NavLink>
              <NavLink to="/detect" className={linkClass} onClick={close}>
                Check News
              </NavLink>
              <NavLink to="/about" className={linkClass} onClick={close}>
                About
              </NavLink>
              <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
