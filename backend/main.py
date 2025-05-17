from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastai.learner import load_learner
from fastai.vision.core import PILImage
import shutil
import uuid
from pathlib import Path

app = FastAPI()

# CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace "*" with your React app's URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_path = Path("style_classifier.pkl")
learn_inf = load_learner(model_path)

@app.post("/predict/")
async def predict_style(file: UploadFile = File(...)):
    temp_file = f"temp_{uuid.uuid4().hex}.jpg"
    
    with open(temp_file, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    img = PILImage.create(temp_file)
    pred_class, pred_idx, probs = learn_inf.predict(img)

    # Clean up
    Path(temp_file).unlink()

    return {
        "prediction": str(pred_class),
        "confidence": f"{probs[pred_idx]:.2%}",
        "top_3": [
            {"label": str(label), "confidence": f"{prob:.2%}"}
            for label, prob in sorted(zip(learn_inf.dls.vocab, map(float, probs)), key=lambda x: x[1], reverse=True)[:3]
        ]
    }
