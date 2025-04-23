import React, { useState } from "react";

const UploadCard = () => {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFile(e.target.files[0]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await fetch("http://yolo-classifier-app.eastus.azurecontainer.io/classify/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error("Upload failed:", err);
      setResult({ error: "Upload failed." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-card">
      <form onSubmit={handleSubmit}>
        <input type="file" accept="image/*" onChange={handleChange} />
        <button type="submit" disabled={loading}>
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
