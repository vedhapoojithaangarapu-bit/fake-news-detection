import { Link } from 'react-router-dom';
import FeatureCard from '../components/FeatureCard.jsx';
import { useApp } from '../App.jsx';

export default function Landing() {
  const { isLoggedIn } = useApp();
  const primaryTo = isLoggedIn ? '/detect' : '/signup';

  return (
    <div>
      {/* Hero */}
      <section className="hero container">
        <div className="hero-text">
          <span className="eyebrow">AI · NLP · MACHINE LEARNING</span>
          <h1>Detect Fake News with AI</h1>
          <p className="lead">
            Analyze news articles using Natural Language Processing and machine learning to
            identify potentially misleading information.
          </p>
          <div className="hero-actions">
            <Link to={isLoggedIn ? '/detect' : '/signin'} className="btn btn-primary btn-lg">
              Check News
            </Link>
            <Link to="/about" className="btn btn-secondary btn-lg">
              Learn More
            </Link>
          </div>
          <div className="hero-mini">
            <span>✓ No backend needed for demo</span>
            <span>✓ Results in seconds</span>
          </div>
        </div>

        <div className="hero-visual" aria-hidden="true">
          <div className="hero-graphic">
            <div className="graphic-card gc-main">
              <div className="gc-dots">
                <i></i>
                <i></i>
                <i></i>
              </div>
              <div className="gc-lines">
                <span style={{ width: '82%' }}></span>
                <span style={{ width: '64%' }}></span>
                <span style={{ width: '74%' }}></span>
                <span style={{ width: '52%' }}></span>
              </div>
              <div className="gc-tags">
                <span className="tag tag-blue">NLP ✓</span>
                <span className="tag tag-green">REAL 92%</span>
                <span className="tag tag-red">FAKE 87%</span>
              </div>
            </div>
            <div className="graphic-card gc-float-1">
              <strong>Confidence</strong>
              <div className="mini-bar">
                <div style={{ width: '87%' }}></div>
              </div>
              <small>87% · Likely Fake</small>
            </div>
            <div className="graphic-card gc-float-2">
              <strong>✓ Tokens · 1,204</strong>
              <small>Preprocessed & analyzed</small>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section container" aria-labelledby="features-title">
        <h2 id="features-title" className="section-title">
          Powerful, simple analysis
        </h2>
        <p className="section-sub">Everything you need to quickly sanity-check a news article.</p>
        <div className="grid-3">
          <FeatureCard
            icon="🧠"
            title="NLP Powered"
            text="Analyze text using Natural Language Processing."
          />
          <FeatureCard
            icon="⚡"
            title="Fast Detection"
            text="Get a prediction within seconds."
          />
          <FeatureCard
            icon="📊"
            title="Confidence Score"
            text="Understand how confident the model is about its prediction."
          />
        </div>
      </section>

      {/* How it works */}
      <section className="section section-alt" aria-labelledby="how-title">
        <div className="container">
          <h2 id="how-title" className="section-title">
            How It Works
          </h2>
          <div className="steps">
            <div className="card step">
              <span className="step-num">1</span>
              <h3>Enter News</h3>
              <p>Enter headline, content, and source.</p>
            </div>
            <span className="step-arrow" aria-hidden="true">
              →
            </span>
            <div className="card step">
              <span className="step-num">2</span>
              <h3>Analyze</h3>
              <p>NLP processes the news content.</p>
            </div>
            <span className="step-arrow" aria-hidden="true">
              →
            </span>
            <div className="card step">
              <span className="step-num">3</span>
              <h3>Get Result</h3>
              <p>View the prediction and confidence score.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="container cta-band" aria-labelledby="cta-title">
        <h2 id="cta-title">Ready to check a news article?</h2>
        <Link to={primaryTo} className="btn btn-primary btn-lg">
          Check News
        </Link>
      </section>
    </div>
  );
}
