import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from "./App.jsx";
import Admin from './Admin';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/Admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
