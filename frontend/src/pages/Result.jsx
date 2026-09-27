import { Link, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard.jsx';
import { useApp } from '../App.jsx';

export default function Result() {
  const { analysis } = useApp();
  const navigate = useNavigate();

  if (!analysis) {
    return (
      <div className="container page narrow center">
        <div className="card">
          <h1>Analysis Result</h1>
          <p className="muted">No analysis found yet. Please analyze a news article first.</p>
          <Link to="/detect" className="btn btn-primary">
            Check News
          </Link>
        </div>
      </div>
    );
  }

  const { prediction, confidence, headline, source } = analysis;

  return (
    <div className="container page narrow">
      <header className="page-head center">
        <h1>Analysis Result</h1>
        <p className="lead-sm">Here is what our NLP demo model found.</p>
      </header>

      <ResultCard
        prediction={prediction}
        confidence={confidence}
        headline={headline}
        source={source}
      />

      <div className="result-actions">
        <button className="btn btn-primary btn-lg" onClick={() => navigate('/detect')}>
          Check Another News
        </button>
        <Link to="/dashboard" className="btn btn-secondary btn-lg">
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
