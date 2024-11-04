import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

// Check if the root element exists
const rootElement = document.getElementById('root');
if (!rootElement) {
  console.error('Root element not found. Ensure your HTML file has a <div id="root"></div> element.');
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Measuring performance (optional)
reportWebVitals(console.log); // Log results for performance monitoring
