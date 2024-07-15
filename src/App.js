import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) {
      setError('Please select a file to upload.');
      return;
    }
    
    const formData = new FormData();
    formData.append('textFile', selectedFile);

    try {
      const response = await axios.post('http://localhost:8080/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setStatistics(response.data);
      setError(null);
    } catch (err) {
      setError('Error uploading file.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Text File Statistics</h1>
        <form onSubmit={handleSubmit}>
          <input type="file" onChange={handleFileChange} />
          <button type="submit">Upload</button>
        </form>
        {error && <div className="error">{error}</div>}
        {statistics && (
          <div className="statistics">
            <h2>Statistics</h2>
            <p><strong>Word Count:</strong> {statistics.wordCount}</p>
            <p><strong>Letter Count:</strong> {statistics.letterCount}</p>
            <p><strong>Symbol Count:</strong> {statistics.symbolCount}</p>
            <p><strong>Top Words:</strong> {statistics.topWords.join(', ')}</p>
            <p><strong>Top Letters:</strong> {statistics.topLetters.join(', ')}</p>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
