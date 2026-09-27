export default function ResultCard({ prediction, confidence, headline, source }) {
  const isFake = prediction === 'FAKE';

  return (
    <section
      className={`card result-card ${isFake ? 'is-fake' : 'is-real'}`}
      aria-live="polite"
      aria-label={`Prediction: ${isFake ? 'Likely Fake News' : 'Likely Real News'}`}
    >
      <div className="result-badge-row">
        <span className={`result-pill ${isFake ? 'pill-fake' : 'pill-real'}`}>
          <span aria-hidden="true">{isFake ? '🔴' : '🟢'}</span>
          &nbsp;{isFake ? 'Likely Fake News' : 'Likely Real News'}
        </span>
        <span className="result-prediction-label">
          Prediction: <strong>{prediction}</strong>
        </span>
      </div>

      <div className="result-icon-large" aria-hidden="true">
        {isFake ? (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" fill="#FEF2F2" stroke="#FECACA" strokeWidth="2" />
            <path d="M20 20l16 16M36 20L20 36" stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
            <circle cx="28" cy="28" r="26" fill="#ECFDF5" stroke="#A7F3D0" strokeWidth="2" />
            <path
              d="M19 28.5l6.5 6.5L37 23"
              stroke="#059669"
              strokeWidth="3.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </div>

      <h3 className="result-title">Prediction</h3>
      <p className={`result-verdict ${isFake ? 'verdict-fake' : 'verdict-real'}`}>
        {isFake ? '🔴 Likely Fake News' : '🟢 Likely Real News'}
      </p>

      <div className="confidence-block">
        <div className="confidence-head">
          <span>Confidence Score</span>
          <strong>{confidence}%</strong>
        </div>
        <div
          className="progress"
          role="progressbar"
          aria-valuenow={confidence}
          aria-valuemin="0"
          aria-valuemax="100"
          aria-label={`Model confidence ${confidence} percent`}
        >
          <div
            className={`progress-fill ${isFake ? 'fill-fake' : 'fill-real'}`}
            style={{ width: `${confidence}%` }}
          />
        </div>
      </div>

      <dl className="result-meta">
        <div>
          <dt>News Headline</dt>
          <dd>{headline || '—'}</dd>
        </div>
        <div>
          <dt>News Source</dt>
          <dd>
            {source ? (
              <span className="mono">{source}</span>
            ) : (
              'Not provided'
            )}
          </dd>
        </div>
      </dl>

      <p className="disclaimer">
        This prediction is generated using an NLP-based machine learning model. It should be
        treated as an automated prediction, not as a definitive fact-check.
      </p>
    </section>
  );
}
