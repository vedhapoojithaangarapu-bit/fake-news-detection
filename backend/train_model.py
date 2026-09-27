"""Training script for the fake news detector.

Pipeline:
1. Load data/fake_news.csv
2. Check for missing values
3. Combine headline + article content
4. Clean text with preprocessing.clean_text
5. Train/test split (fixed random_state for reproducibility)
6. TF-IDF feature extraction
7. Logistic Regression classifier
8. Print accuracy
9. Save model + vectorizer with joblib to models/

Run:
    python train_model.py
"""

import os

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
from sklearn.model_selection import train_test_split

from preprocessing import clean_text

# Fixed seed so results are reproducible.
RANDOM_STATE = 42

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "data", "fake_news.csv")
MODEL_PATH = os.path.join(BASE_DIR, "models", "fake_news_model.pkl")
VECTORIZER_PATH = os.path.join(BASE_DIR, "models", "tfidf_vectorizer.pkl")


def ensure_nltk_stopwords():
    """Try to make the NLTK stopwords corpus available (optional)."""
    try:
        from nltk.corpus import stopwords  # noqa: F401

        stopwords.words("english")
    except Exception:
        try:
            import nltk

            nltk.download("stopwords", quiet=True)
        except Exception:
            # Fallback list in preprocessing.py will be used.
            pass


def main():
    ensure_nltk_stopwords()

    # 1. Load dataset (a larger CSV with the same columns can replace this file later).
    if not os.path.exists(DATA_PATH):
        raise FileNotFoundError(f"Dataset not found: {DATA_PATH}")
    df = pd.read_csv(DATA_PATH)
    print(f"Loaded {len(df)} rows from data/fake_news.csv")

    # Basic schema check
    for col in ("title", "text", "label"):
        if col not in df.columns:
            raise ValueError(f"Dataset must contain column: {col}")

    # 2. Check for missing values
    print("Missing values per column:")
    print(df.isnull().sum())
    df = df.dropna(subset=["title", "text", "label"])

    # Keep only FAKE / REAL labels (uppercase, stripped)
    df["label"] = df["label"].astype(str).str.strip().str.upper()
    df = df[df["label"].isin(["FAKE", "REAL"])]
    if len(df) == 0:
        raise ValueError("No valid rows with label FAKE/REAL found.")

    # 3 + 4. Combine headline + content, then clean
    df["combined"] = df["title"].astype(str) + " " + df["text"].astype(str)
    df["cleaned"] = df["combined"].apply(clean_text)
    # Drop rows that became empty after cleaning
    df = df[df["cleaned"].str.strip() != ""]
    if len(df) == 0:
        raise ValueError("All rows became empty after cleaning.")

    X = df["cleaned"]
    y = df["label"]

    # 5. Train/test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=RANDOM_STATE, stratify=y
    )

    # 6. TF-IDF feature extraction
    vectorizer = TfidfVectorizer(max_features=5000, ngram_range=(1, 2))
    X_train_vec = vectorizer.fit_transform(X_train)
    X_test_vec = vectorizer.transform(X_test)

    # 7. Train Logistic Regression classifier
    model = LogisticRegression(max_iter=1000, random_state=RANDOM_STATE)
    model.fit(X_train_vec, y_train)

    # 8. Accuracy
    y_pred = model.predict(X_test_vec)
    acc = accuracy_score(y_test, y_pred)
    print(f"Model accuracy: {acc * 100:.2f}% ({len(X_test)} test samples)")

    # 9 + 10. Save model and vectorizer
    os.makedirs(os.path.dirname(MODEL_PATH), exist_ok=True)
    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    print(f"Saved model -> {MODEL_PATH}")
    print(f"Saved vectorizer -> {VECTORIZER_PATH}")


if __name__ == "__main__":
    main()
