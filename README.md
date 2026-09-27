# 📰 Fake News Detection using NLP

A simple web application that uses **Natural Language Processing (NLP)** and **Machine Learning** to analyze news articles and predict whether they are likely to be **Real or Fake**.

## 🚀 Features

* 📝 Enter a news headline
* 📄 Enter news article content
* 🔗 Enter the news source/URL
* 🤖 NLP-based text analysis
* ✅ Predict **REAL** or **FAKE**
* 📊 Display prediction confidence
* 🔐 Simple Sign In and Sign Up pages
* 📱 Responsive web interface

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* JavaScript
* HTML
* CSS
* React Router

### Backend

* Python
* FastAPI
* Scikit-learn
* NLTK
* Pandas
* NumPy
* Joblib

### Machine Learning

* Text Preprocessing
* TF-IDF Vectorization
* Logistic Regression

## 🏗️ Project Structure

```text
fake-news-detection/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── main.py
│   ├── model.py
│   ├── preprocessing.py
│   ├── train_model.py
│   ├── requirements.txt
│   │
│   ├── data/
│   │   └── fake_news.csv
│   │
│   └── models/
│       ├── fake_news_model.pkl
│       └── tfidf_vectorizer.pkl
│
└── README.md
```

🔄 How It Works
User enters news
       ↓
Headline + Content + Source
       ↓
Text Preprocessing
       ↓
TF-IDF Vectorization
       ↓
Logistic Regression Model
       ↓
REAL / FAKE Prediction
       ↓
Confidence Score
