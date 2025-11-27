import { useState } from "react";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected");
      return;
    }

    const formData = new FormData();
    formData.append("file", file); 
    try {
      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData, // Send the file directly as the request body
      });

      const result = await response.json();
      console.log("File upload response:", result);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUpload;
