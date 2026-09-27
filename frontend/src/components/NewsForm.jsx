import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner.jsx';

export default function NewsForm({ initial = { headline: '', content: '', source: '' }, onAnalyze }) {
  const [headline, setHeadline] = useState(initial.headline);
  const [content, setContent] = useState(initial.content);
  const [source, setSource] = useState(initial.source);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!headline.trim()) e.headline = 'Please enter the news headline.';
    else if (headline.trim().length < 10) e.headline = 'Headline should be at least 10 characters.';
    if (!content.trim()) e.content = 'Please paste the news article content.';
    else if (content.trim().length < 50) e.content = 'Content should be at least 50 characters for analysis.';
    if (source.trim()) {
      try {
        // Allow plain domains too; only validate if it looks like a URL
        if (source.includes('.') || source.startsWith('http')) {
          const url = source.startsWith('http') ? source : `https://${source}`;
          new URL(url);
        }
      } catch {
        e.source = 'Please enter a valid URL or leave this field empty.';
      }
    }
    return e;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setLoading(true);
    // Small simulated NLP processing delay
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    onAnalyze({ headline: headline.trim(), content: content.trim(), source: source.trim() });
  };

  return (
    <form className="card form-card" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="headline">News Headline</label>
        <input
          id="headline"
          name="headline"
          type="text"
          placeholder="Enter the news headline"
          value={headline}
          onChange={(e) => setHeadline(e.target.value)}
          aria-invalid={Boolean(errors.headline)}
          aria-describedby={errors.headline ? 'headline-error' : undefined}
        />
        {errors.headline && (
          <p className="field-error" id="headline-error" role="alert">
            {errors.headline}
          </p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="content">News Content</label>
        <textarea
          id="content"
          name="content"
          rows="7"
          placeholder="Paste the complete news article here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          aria-invalid={Boolean(errors.content)}
          aria-describedby={errors.content ? 'content-error' : undefined}
        />
        {errors.content && (
          <p className="field-error" id="content-error" role="alert">
            {errors.content}
          </p>
        )}
        <p className="field-hint">{content.trim().length} characters</p>
      </div>

      <div className="form-group">
        <label htmlFor="source">
          News Source / URL <span className="optional">(optional)</span>
        </label>
        <input
          id="source"
          name="source"
          type="url"
          inputMode="url"
          placeholder="https://example.com/news"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          aria-invalid={Boolean(errors.source)}
          aria-describedby={errors.source ? 'source-error' : undefined}
        />
        {errors.source && (
          <p className="field-error" id="source-error" role="alert">
            {errors.source}
          </p>
        )}
      </div>

      <button type="submit" className="btn btn-primary btn-lg btn-full" disabled={loading}>
        {loading ? (
          <span className="btn-loading">
            <LoadingSpinner size={20} /> Analyzing with NLP...
          </span>
        ) : (
          'Analyze News'
        )}
      </button>
    </form>
  );
}
