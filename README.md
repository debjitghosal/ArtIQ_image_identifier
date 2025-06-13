**# ArtIQ_image_identifier**Below is a polished **README.md** tailored for your Style Classifier project, highlighting the technical flow and deployment, ideal for showcasing on GitHub or your portfolio.

---

````markdown
# 🎨 Style Classifier & Docker Deployment

A full-stack image classification application that detects art styles—“ghbhli” movie-inspired, 50 artist styles, and pixel art—using FastAI and ResNet-50, with Docker deployment and a React frontend for real-time inference.

---

## 📚 Project Overview

- **Model Training**
  - Built with FastAI and a ResNet-50 backbone.
  - Classifies 3 categories: movie-inspired “ghbhli” art styles, 50 artist styles, and pixel art.
  - Utilizes transfer learning, data augmentation (flip, normalization), and fine-tuning (3 frozen epochs + 13 unfrozen epochs).
  - Exported model as `style_classifier.pkl`.

- **Prediction Utility**
  - Python wrapper for inference using FastAI’s exported model.
  - Outputs predicted class, confidence score, and top-3 predictions with probabilities.

---

## 🛠️ Architecture & Tech Stack

| Component         | Technology                           |
|------------------|--------------------------------------|
| Model Training   | Python, FastAI, ResNet-50, data augmentation |
| Deployment       | Docker, Flask (or FastAPI) as model inference API |
| Frontend         | React.js frontend sending images for classification |
| Containerization | Dockerfile wrapping model loading & API server |

---

## 🚀 Getting Started

### Prerequisites
- Docker
- (For local dev) Python 3.8+, FastAI, Flask/FastAPI, React.js dependencies

### Usage

1. **Training (optional)**  
   ```bash
   cd training/
   python train.py
````

* Fine-tunes ResNet-50 and outputs `style_classifier.pkl`.

2. **Build Docker Container**

   ```bash
   docker build -t style-classifier .
   ```

3. **Run Inference API**

   ```bash
   docker run -p 5000:5000 style-classifier
   ```

   * Exposes `POST /predict` endpoint for image classification.

4. **React Frontend Integration**

   * Frontend sends images to the `/predict` endpoint.
   * Displays predicted style and confidence.

---

## 🧪 Model Inference Example

```python
from fastai.vision.all import load_learner, PILImage

learn_inf = load_learner('style_classifier.pkl')
img = PILImage.create('path/to/test_image.jpg')
pred, idx, probs = learn_inf.predict(img)

print(f"Predicted style: {pred} ({probs[idx]:.2%})")
```

---

## 📈 Highlights & Learnings

* Applied transfer learning and fine-tuning best practices to maximize classification accuracy.
* Streamlined model deployment via Docker, promoting portability and scalability.
* Integrated backend API and frontend to enable real-time inference.
* Demonstrated core SDE abilities: system design, API development, containerization, and full-stack integration.

---

## 👩‍💻 Next Steps

* Add logging and monitoring for inference performance.
* Enhance model with more classes or refined art styles.
* Deploy to Kubernetes or cloud platform for production-readiness.

---

## 📝 License

Distributed under the MIT License. See `LICENSE` for details.

```

---

Feel free to adjust folder paths, command names, or API framework details (e.g. Flask vs FastAPI). You can also enrich it with visuals like screenshots or evaluation metrics if available.
```
