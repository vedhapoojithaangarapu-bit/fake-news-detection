import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../App.jsx';

export default function SignIn() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState('');

  const validate = () => {
    const e = {};
    if (!email.trim()) e.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = 'Enter a valid email address.';
    if (!password) e.password = 'Password is required.';
    return e;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    setGeneralError('');
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      setGeneralError('Please fix the errors below.');
      return;
    }
    // Dummy auth: navigate to dashboard without backend
    login({ email: email.trim() });
    navigate('/dashboard', { replace: true });
  };

  return (
    <section className="container auth-wrap">
      <div className="card auth-card">
        <h1>Welcome Back</h1>
        <p className="muted">Sign in to continue detecting fake news.</p>

        {generalError && (
          <p className="alert alert-error" role="alert">
            {generalError}
          </p>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="form-group">
            <label htmlFor="signin-email">Email</label>
            <input
              id="signin-email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signin-email-error' : undefined}
            />
            {errors.email && (
              <p className="field-error" id="signin-email-error" role="alert">
                {errors.email}
              </p>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="signin-password">Password</label>
            <div className="pw-wrap">
              <input
                id="signin-password"
                type={showPw ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={Boolean(errors.password)}
                aria-describedby={errors.password ? 'signin-password-error' : undefined}
              />
              <button
                type="button"
                className="pw-toggle"
                onClick={() => setShowPw((v) => !v)}
                aria-label={showPw ? 'Hide password' : 'Show password'}
              >
                {showPw ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="field-error" id="signin-password-error" role="alert">
                {errors.password}
              </p>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg btn-full">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </section>
  );
}
