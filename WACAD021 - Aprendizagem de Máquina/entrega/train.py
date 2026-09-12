import os
import urllib.request

import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.pipeline import Pipeline

URL = "https://raw.githubusercontent.com/alan-barzilay/NLPortugues/master/Semana%2003/data/b2w-10k.csv"

if not os.path.exists("b2w-10k.csv"):
  urllib.request.urlretrieve(URL, "b2w-10k.csv")

df = pd.read_csv("b2w-10k.csv")

df = df[["review_text", "overall_rating"]].dropna()
df = df[df["overall_rating"] != 3]
df["label"] = (df["overall_rating"] >= 4).astype(int)

X_train, X_test, y_train, y_test = train_test_split(
  df["review_text"], df["label"], test_size=0.2, random_state=42, stratify=df["label"]
)

pipeline = Pipeline(
  [
    ("vectorizer", TfidfVectorizer(min_df=2, ngram_range=(1, 2))),
    ("classifier", LogisticRegression(max_iter=1000)),
  ]
)

pipeline.fit(X_train, y_train)

os.makedirs("models", exist_ok=True)
joblib.dump(pipeline, "models/pipeline.joblib")

carregado = joblib.load("models/pipeline.joblib")

os.makedirs("app", exist_ok=True)
with open("app/__init__.py", "w", encoding="utf-8"):
  pass

app_main = """import os
from contextlib import asynccontextmanager

import joblib
from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel

MODEL_PATH = os.getenv("MODEL_PATH", "models/pipeline.joblib")


@asynccontextmanager
async def lifespan(app: FastAPI):
  app.state.pipeline = joblib.load(MODEL_PATH)
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
"""

with open("app/main.py", "w", encoding="utf-8") as file:
  file.write(app_main)

requirements_content = """fastapi==0.141.1
uvicorn[standard]==0.52.4
scikit-learn==1.9.0
joblib==1.6.0
pandas==3.0.5
requests==2.34.2
"""

with open("requirements.txt", "w", encoding="utf-8") as file:
  file.write(requirements_content)

dockerfile_content = """FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
# 0.0.0.0 para aceitar conexões de fora do container
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
"""

with open("Dockerfile", "w", encoding="utf-8") as file:
  file.write(dockerfile_content)
