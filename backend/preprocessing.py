"""NLP preprocessing for fake news detection.

Simple, beginner-friendly text cleaning:
- lowercase
- remove URLs, HTML tags, punctuation
- remove extra spaces
- remove stopwords
- stemming (PorterStemmer, no extra downloads needed)
"""

import re
import string

# --- Stopwords: try NLTK, fall back to a small built-in list so the
# --- project runs immediately without downloads. ---
try:
    from nltk.corpus import stopwords as nltk_stopwords
    from nltk.stem import PorterStemmer

    try:
        STOPWORDS = set(nltk_stopwords.words("english"))
    except LookupError:
        # Corpus not downloaded yet -> use fallback (train_model.py tries to download it).
        raise ImportError("nltk stopwords corpus not downloaded")
    _stemmer = PorterStemmer()

    def _stem(word: str) -> str:
        return _stemmer.stem(word)

except Exception:
    # Small built-in stopword list (common English words).
    STOPWORDS = {
        "a", "an", "the", "and", "or", "but", "if", "while", "with", "of",
        "at", "by", "for", "to", "in", "on", "is", "are", "was", "were",
        "be", "been", "being", "has", "have", "had", "do", "does", "did",
        "will", "would", "can", "could", "should", "may", "might", "must",
        "this", "that", "these", "those", "it", "its", "as", "from", "he",
        "she", "they", "we", "you", "i", "not", "no", "so", "than", "too",
        "very", "just", "about", "into", "over", "after", "before",
    }

    try:
        from nltk.stem import PorterStemmer

        _fallback_stemmer = PorterStemmer()

        def _stem(word: str) -> str:
            try:
                return _fallback_stemmer.stem(word)
            except Exception:
                return word

    except Exception:

        def _stem(word: str) -> str:  # type: ignore
            return word


URL_PATTERN = re.compile(r"https?://\S+|www\.\S+")
HTML_PATTERN = re.compile(r"<.*?>")


def clean_text(text) -> str:
    """Clean raw news text for the ML model.

    Returns an empty string for empty/invalid input (handled safely).
    """
    if text is None or not isinstance(text, str):
        return ""

    # Lowercase
    text = text.lower()
    # Remove URLs
    text = URL_PATTERN.sub(" ", text)
    # Remove HTML tags
    text = HTML_PATTERN.sub(" ", text)
    # Remove punctuation (keep only letters/numbers/spaces)
    text = text.translate(str.maketrans(string.punctuation, " " * len(string.punctuation)))
    # Keep only a-z and spaces (drop stray digits/symbols for simplicity)
    text = re.sub(r"[^a-z\s]", " ", text)
    # Remove extra spaces
    text = re.sub(r"\s+", " ", text).strip()

    if not text:
        return ""

    # Remove stopwords + stemming
    words = text.split()
    cleaned = [_stem(w) for w in words if w not in STOPWORDS]
    return " ".join(cleaned)
