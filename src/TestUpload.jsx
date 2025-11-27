import React, { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "./firebaseConfig";

function TestUpload() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadUrl, setUploadUrl] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }

    setUploading(true);
    try {
      // Create a Firebase reference
      const fileRef = ref(storage, `uploads/${file.name}`);

      // Upload file
      await uploadBytes(fileRef, file);

      // Get the download URL
      const url = await getDownloadURL(fileRef);
      setUploadUrl(url);
      console.log("✅ File uploaded successfully:", url);

      // Save upload info in localStorage
      const history = JSON.parse(localStorage.getItem("uploadHistory")) || [];
      history.push({ name: file.name, url, date: new Date().toISOString() });
      localStorage.setItem("uploadHistory", JSON.stringify(history));

      alert("✅ Upload successful!");
    } catch (error) {
      console.error("❌ Upload error:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h3>Firebase Upload Test</h3>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>

      {uploadUrl && (
        <p>
          File uploaded!{" "}
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer">
            View file
          </a>
        </p>
      )}
    </div>
  );
}

export default TestUpload;
