import React, { useState } from 'react';

export default function ImageUploader() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [prompt, setPrompt] = useState(""); // ✅ Added prompt state

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:8000/predict/", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error(`Server error: ${response.status}`);
        }

        const data = await response.json();
        console.log("📦 Raw backend response:", JSON.stringify(data, null, 2));

        setResult(data);
        setError("");
      } catch (err) {
        setError("Prediction error: " + err.message);
        setResult(null);
      }
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    handleImageUpload({ target: { files: event.dataTransfer.files } });
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const formatConfidence = (value) => {
    if (typeof value === "string") {
      const num = parseFloat(value.replace("%", "").trim());
      return isNaN(num) ? "N/A" : num.toFixed(2);
    }
    if (typeof value === "number") {
      return value.toFixed(2);
    }
    return "N/A";
  };

  return (
    <div
      className="upload-box border border-dashed border-gray-500 p-6 rounded-md bg-white bg-opacity-10 text-center text-white"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <input
        type="file"
        accept="image/png, image/jpeg"
        onChange={handleImageUpload}
        className="file-input hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer block">
        {image ? (
          <img
            src={image}
            alt="Uploaded Preview"
            className="uploaded-image max-w-xs mx-auto mb-4 rounded shadow-lg"
          />
        ) : (
          <>
            <div className="text-4xl mb-2">📤</div>
            <p className="font-semibold">Drag and drop your artwork</p>
            <p className="text-sm text-gray-300">or click to browse (PNG, JPG, JPEG)</p>
          </>
        )}
      </label>

      {error && <p className="text-red-400 mt-4">{error}</p>}

      {result && (
        <div className="result-box mt-6 text-left bg-white bg-opacity-10 p-4 rounded-md shadow-inner">
          <p><strong>Prediction:</strong> {result.prediction || "N/A"}</p>
          <p><strong>Confidence:</strong> {formatConfidence(result.confidence)}%</p>

          <p className="mt-2 font-medium text-center">Top 3 Predictions:</p>
          <ul className="list-disc mt-2 space-y-1 text-center">
            {result.top_3?.map((item, idx) => (
              <ul key={idx}>
                {item.label || "Unknown"}: {formatConfidence(item.confidence)}%
              </ul>
            )) || <li>N/A</li>}
          </ul>

        
        </div>
      )}
    </div>
  );
}

/*
          <div className="mt-6">
            <p className="font-semibold mb-1 text-center">Change the image to:</p>
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g., modern, cubism, surrealism..."
              className="w-full p-2 rounded bg-white text-black placeholder-gray-500"
            />
          </div> */