import { useNavigate } from 'react-router-dom';
import NewsForm from '../components/NewsForm.jsx';
import { useApp } from '../App.jsx';
import { dummyPredict } from '../utils/dummyPredict.js';

export default function DetectNews() {
  const navigate = useNavigate();
  const { saveAnalysis } = useApp();

  const handleAnalyze = (formData) => {
    // Dummy prediction for now (no backend / no real NLP model yet)
    const { prediction, confidence } = dummyPredict(formData);
    saveAnalysis({ ...formData, prediction, confidence, at: new Date().toISOString() });
    navigate('/result');
  };

  return (
    <div className="container page narrow">
      <header className="page-head center">
        <h1>Check a News Article</h1>
        <p className="lead-sm">Enter the details below to analyze the news using NLP.</p>
      </header>
      <NewsForm onAnalyze={handleAnalyze} />

      <div className="sample-box">
        <p>
          <strong>Try it:</strong> paste any headline + a few sentences. Words like
          “shocking miracle cure” push the dummy model toward FAKE; words like “study,
          official report” push it toward REAL.
        </p>
      </div>
    </div>
  );
}
