import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App/app';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './pages/NotFoundPage/not-found-page';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
       <App />
  </BrowserRouter>
)
