"""Load the trained model and make predictions."""

import os

import joblib

from preprocessing import clean_text

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "tfidf_vectorizer.pkl")

_model = None
_vectorizer = None


def load_model():
    """Load model + TF-IDF vectorizer (cached after first call).

    Raises FileNotFoundError with a clear message if files are missing.
    """
    global _model, _vectorizer
    if _model is not None and _vectorizer is not None:
        return _model, _vectorizer

    if not os.path.exists(MODEL_PATH) or not os.path.exists(VECTORIZER_PATH):
        raise FileNotFoundError(
            "Model files not found. Run 'python train_model.py' first to generate "
            "models/fake_news_model.pkl and models/tfidf_vectorizer.pkl."
        )

    _model = joblib.load(MODEL_PATH)
    _vectorizer = joblib.load(VECTORIZER_PATH)
    return _model, _vectorizer


def predict_news(text) -> dict:
    """Predict FAKE or REAL for combined headline + content text.

    Returns {"prediction": "FAKE"|"REAL", "confidence": float}.
    Confidence is rounded to 2 decimals.
    """
    if text is None or not isinstance(text, str) or not text.strip():
        raise ValueError("Input text must be a non-empty string.")

    model, vectorizer = load_model()

    cleaned = clean_text(text)
    if not cleaned:
        raise ValueError("Text is empty after preprocessing.")

    try:
        vec = vectorizer.transform([cleaned])
        pred = model.predict(vec)[0]
        prediction = str(pred).upper()
        if prediction not in ("FAKE", "REAL"):
            prediction = "FAKE" if prediction == "1" else "REAL"

        # Confidence from predicted class probability
        if hasattr(model, "predict_proba"):
            proba = model.predict_proba(vec)[0]
            confidence = float(proba.max() * 100)
        else:
            confidence = 75.0
    except ValueError:
        raise
    except Exception as exc:
        raise RuntimeError(f"Prediction failed: {exc}") from exc

    return {"prediction": prediction, "confidence": round(confidence, 2)}
