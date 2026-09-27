import { Link } from 'react-router-dom';
import { useApp } from '../App.jsx';

export default function Dashboard() {
  const { user } = useApp();
  const firstName = user?.name ? user.name.split(' ')[0] : null;

  return (
    <div className="container page">
      <header className="page-head">
        <p className="eyebrow">DASHBOARD</p>
        <h1>Welcome{firstName ? `, ${firstName}` : ''} to FakeDetect AI</h1>
        <p className="lead-sm">
          Analyze news articles and check whether they are likely to be real or fake.
        </p>
      </header>

      <section className="card cta-card">
        <div>
          <h2>Start a New Analysis</h2>
          <p className="muted">
            Paste a headline and article content — our NLP demo model returns a prediction with
            a confidence score.
          </p>
        </div>
        <Link to="/detect" className="btn btn-primary btn-lg">
          Check News
        </Link>
      </section>

      <section className="grid-3" aria-label="Highlights">
        <article className="card mini-card">
          <span className="mini-icon" aria-hidden="true">
            🧠
          </span>
          <h3>NLP Based</h3>
          <p>Text preprocessing and language features.</p>
        </article>
        <article className="card mini-card">
          <span className="mini-icon" aria-hidden="true">
            ⚡
          </span>
          <h3>Quick Analysis</h3>
          <p>Results in seconds, right in your browser.</p>
        </article>
        <article className="card mini-card">
          <span className="mini-icon" aria-hidden="true">
            📊
          </span>
          <h3>Confidence Score</h3>
          <p>See how sure the model is, every time.</p>
        </article>
      </section>
    </div>
  );
}
