import './index.css';
import React, { useState } from 'react';

export default function App() {
  const initialMemeUrl =
    'https://api.memegen.link/images/buzz/memes/are_awesome.png';
  const [template, setTemplate] = useState('buzz');
  const [memeImageUrl, setMemeImageUrl] = useState(initialMemeUrl);
  const [topText, setTopText] = useState('memes');
  const [bottomText, setBottomText] = useState('are awesome');
  const formatText = (text) =>
    encodeURIComponent(text.replace(/\s+/g, '_')) || '_';
  const handleSubmit = (event) => {
    event.preventDefault();
    const formattedTopText = formatText(topText);
    const formattedBottomText = formatText(bottomText);
    const newMemeUrl = `https://api.memegen.link/images/${template}/${formattedTopText}/${formattedBottomText}.png`;
    setMemeImageUrl(newMemeUrl);
  };
  const downloadMeme = async () => {
    try {
      const response = await fetch(memeImageUrl, { mode: 'cors' });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = 'meme.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the meme:', error);
      alert('Failed to download the meme. Please try again.');
    }
  };
  return (
    <div>
      <div>
        <h1>RANDOM MEME GENERATOR</h1>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '500px',
          backgroundColor: '#f0f0f0',
          width: '500px',
          margin: '40px',
        }}
      >
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '50px',
            alignItems: 'flex-start',
            fontSize: '22px',
          }}
          onSubmit={handleSubmit}
        >
          {/* Top Text Input */}
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <label htmlFor="top-text">Top text</label>
            <input
              id="top-text"
              value={topText}
              onChange={(event) => setTopText(event.target.value)}
            />
          </div>

          {/* Bottom Text Input */}
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <label htmlFor="bottom-text">Bottom text</label>
            <input
              id="bottom-text"
              value={bottomText}
              onChange={(event) => setBottomText(event.target.value)}
            />
          </div>
          {/* Meme Template Selector */}
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '100%' }}
          >
            <label htmlFor="meme-template">Meme template</label>
            <input
              id="meme-template"
              value={template}
              onChange={(event) => setTemplate(event.target.value)}
            />
          </div>
          <div
            style={{ display: 'flex', flexDirection: 'column', width: '80%' }}
          >
            <button data-test-id="generate-meme">Generate Meme</button>
          </div>
        </form>
      </div>
      <div
        style={{
          display: 'flex',
          height: '500px',
          width: '500px',
          margin: '40px',
        }}
      >
        <img data-test-id="meme-image" src={memeImageUrl} alt="Meme" />
      </div>
      <div>
        <button type="button" onClick={downloadMeme}>
          Download
        </button>
      </div>
    </div>
  );
}
