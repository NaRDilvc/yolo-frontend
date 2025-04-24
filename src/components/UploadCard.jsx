import React, { useState } from "react";

const UploadCard = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // Change this to switch between dev/prod dynamically if needed
  const API_URL = "https://yolo-api-free.azurewebsites.net/classify/";

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setResult({ error: "Upload failed. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="image/*"
          onChange={handleChange}
          className="file-input"
        />
        <button type="submit" disabled={loading} className="upload-btn">
          {loading ? "Classifying..." : "Upload & Classify"}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Prediction Result:</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default UploadCard;
