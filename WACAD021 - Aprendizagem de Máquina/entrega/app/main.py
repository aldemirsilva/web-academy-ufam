import os
from contextlib import asynccontextmanager

import joblib
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

MODEL_PATH = os.getenv("MODEL_PATH", "models/pipeline.joblib")


@asynccontextmanager
async def lifespan(app: FastAPI):
  app.state.pipeline = joblib.load(MODEL_PATH)  # carrega UMA vez, na inicialização
  yield
  app.state.pipeline = None


app = FastAPI(title="Sentiment API", version="1.0.0", lifespan=lifespan)


class ReviewRequest(BaseModel):
  text: str


class PredictionResponse(BaseModel):
  label: str
  confidence: float


@app.get("/health")
def health():
  return {"status": "ok"}


@app.post("/predict", response_model=PredictionResponse)
def predict(req: ReviewRequest, request: Request):
  pipeline = request.app.state.pipeline
  if pipeline is None:
    raise HTTPException(status_code=503, detail="Modelo indisponível")
  pred = int(pipeline.predict([req.text])[0])
  proba = pipeline.predict_proba([req.text])[0]
  label = "positivo" if pred == 1 else "negativo"
  return PredictionResponse(label=label, confidence=float(max(proba)))
