import React from 'react';
import ImageUploader from './components/ImageUploader';
import './App.css';

function App() {
  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <a href="/">ArtIQ </a>
        <div>
          <a href="/home">Home</a>
          <a href="/about">About</a>
        </div>
      </nav>

      {/* Hero section */}
      <header className="hero">
        <h1 className="title">Instant Insights for Inspired Art</h1>
        <p className="subtitle">AI-Powered Art Classification — Fast, Simple, Smart</p>
      </header>

      {/* Main content */}
      <main className="main-content">
        <ImageUploader />
        {/* Placeholder for results */}
        <div className="results">          
        </div>
      </main>
    </div>
  );
}

export default App;
