
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// Dynamically set theme-color for mobile browsers
const THEME_COLOR = '#e85b3b';
function setThemeColor(color) {
  let metaTag = document.querySelector('meta[name="theme-color"]');
  if (!metaTag) {
    metaTag = document.createElement('meta');
    metaTag.name = 'theme-color';
    document.head.appendChild(metaTag);
  }
  metaTag.setAttribute('content', color);
}
setThemeColor(THEME_COLOR);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
