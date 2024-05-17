import React, { useState } from 'react';

const ImageUploader = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    // Build form data
    const formData = new FormData();
    formData.append('file', selectedFile);

    // Send upload request (replace with your API route)
    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    // Handle upload success or error
    console.log(data);
  };

  return (
    <div className='min-h-screen flex justify-center items-center'>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default ImageUploader;
