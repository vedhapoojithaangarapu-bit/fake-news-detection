import { Link } from 'react-router-dom';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">FakeDetect AI</div>
          <p className="footer-desc">
            Analyze news articles using Natural Language Processing to identify potentially
            misleading information.
          </p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="/about">About</Link>
          <Link to="/detect">Check News</Link>
          <a href="mailto:contact@fakedetect.ai">Contact</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <small>© {year} FakeDetect AI. Built for educational purposes.</small>
      </div>
    </footer>
  );
}
