import './index.css';
import React, { useState } from 'react';

export default function App() {
  const initialMemeUrl =
    'https://api.memegen.link/images/buzz/memes/are_awesome.png';
  const [template, setTemplate] = useState('buzz');
  const [memeImageUrl, setMemeImageUrl] = useState(initialMemeUrl);
  const [topText, setTopText] = useState('memes');
  const [bottomText, setBottomText] = useState('are awesome');
  const downloadMeme = () => {
    const link = document.createElement('a');
    link.href = memeImageUrl;
    link.download = 'meme.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevents the default form submission behavior (page reload)

    // Generate the meme image URL
    const newMemeUrl = `https://api.memegen.link/images/${template}/${encodeURIComponent(
      topText || '_',
    )}/${encodeURIComponent(bottomText || '_')}.png`;

    // Update the meme image URL state
    setMemeImageUrl(newMemeUrl);
  };
  return (
    <div>
      <div>
        <h1>RANDOM MEME GENERATOR</h1>
      </div>
      <div
        style={{
          display: 'flex', // Defines flex container
          justifyContent: 'center', // Centers horizontally
          alignItems: 'center', // Centers vertically
          height: '500px', // Full viewport height
          backgroundColor: '#f0f0f0', // Light background color
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
          display: 'flex', // Defines flex container
          height: '500px', // Full viewport height
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
