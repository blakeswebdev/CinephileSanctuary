import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {library} from "@fortawesome/fontawesome-svg-core"
import {faBars} from "@fortawesome/free-solid-svg-icons"
import { BrowserRouter } from 'react-router-dom';

library.add(faBars)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <App />
    
  </React.StrictMode>
);

reportWebVitals();
