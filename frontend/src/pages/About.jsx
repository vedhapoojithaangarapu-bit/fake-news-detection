export default function About() {
  return (
    <div className="container page">
      <header className="page-head center">
        <p className="eyebrow">ABOUT</p>
        <h1>About FakeDetect AI</h1>
        <p className="lead-sm">
          A simple, beginner-friendly demo of how Natural Language Processing can help flag
          potentially misleading news.
        </p>
      </header>

      <div className="grid-2">
        <article className="card">
          <h2>What is Fake News?</h2>
          <p>
            Fake news refers to false or misleading information presented as news. It can spread
            quickly online, shape opinions, and cause real-world harm — which is why fast,
            automated first checks are useful.
          </p>
        </article>
        <article className="card">
          <h2>What is NLP?</h2>
          <p>
            Natural Language Processing (NLP) allows computers to process and analyze human
            language. It powers tokenization, cleaning, feature extraction, and classification
            of text like news articles.
          </p>
        </article>
      </div>

      <section className="card pipeline" aria-labelledby="pipeline-title">
        <h2 id="pipeline-title">How Our System Works</h2>
        <ol className="pipeline-steps">
          <li>
            <strong>News Input</strong>
            <span>Headline + content + source</span>
          </li>
          <li>
            <strong>Text Preprocessing</strong>
            <span>Cleaning, tokenizing</span>
          </li>
          <li>
            <strong>Feature Extraction</strong>
            <span>TF-IDF / embeddings</span>
          </li>
          <li>
            <strong>NLP / ML Model</strong>
            <span>Classifier</span>
          </li>
          <li>
            <strong>Prediction</strong>
            <span>Real / Fake + confidence</span>
          </li>
        </ol>
        <p className="muted small">
          Note: this frontend currently uses dummy prediction data. The real NLP model will be
          connected later via a backend API.
        </p>
      </section>
    </div>
  );
}
