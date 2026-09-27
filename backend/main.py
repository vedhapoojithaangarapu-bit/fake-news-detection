"""FastAPI app for Fake News Detection using NLP.

Endpoints:
    GET  /        -> welcome message
    GET  /health  -> health check
    POST /predict -> {headline, content, source?} -> {prediction, confidence, headline, source}

Run:
    uvicorn main:app --reload
Docs:
    http://localhost:8000/docs
"""

import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel, field_validator

from model import predict_news

load_dotenv()

# CORS: allow the Vite React frontend. Change via .env FRONTEND_URL for deployment.
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")
ALLOW_ORIGINS = [o.strip() for o in FRONTEND_URL.split(",") if o.strip()] or [
    "http://localhost:5173"
]

app = FastAPI(title="Fake News Detection API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOW_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class NewsRequest(BaseModel):
    headline: str
    content: str
    source: str | None = None

    @field_validator("headline")
    @classmethod
    def headline_must_not_be_empty(cls, v: str) -> str:
        if v is None or not str(v).strip():
            raise ValueError("Headline must not be empty.")
        return str(v).strip()

    @field_validator("content")
    @classmethod
    def content_must_not_be_empty(cls, v: str) -> str:
        if v is None or not str(v).strip():
            raise ValueError("Content must not be empty.")
        return str(v).strip()


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return clean JSON errors instead of tracebacks for invalid input."""
    messages = []
    for err in exc.errors():
        field = ".".join(str(x) for x in err.get("loc", []) if x != "body")
        messages.append(f"{field}: {err.get('msg', 'Invalid value')}" if field else err.get("msg"))
    return JSONResponse(status_code=422, content={"detail": "; ".join(messages) or "Invalid request body."})


@app.get("/")
def root():
    return {"message": "Fake News Detection API"}


@app.get("/health")
def health():
    return {"status": "healthy"}


@app.post("/predict")
def predict(data: NewsRequest):
    """Combine headline + content and return prediction + confidence."""
    combined = f"{data.headline} {data.content}"
    try:
        result = predict_news(combined)
    except FileNotFoundError as exc:
        # Model files missing -> tell user to train first (503, not a traceback).
        raise HTTPException(status_code=503, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except RuntimeError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    except Exception:
        raise HTTPException(status_code=500, detail="Prediction failed due to an internal error.")

    return {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "headline": data.headline,
        "source": data.source,
    }
