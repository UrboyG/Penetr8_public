//This is the path routing page
import React from 'react'
import ReactDOM from 'react-dom/client'
import Authen from './Authen.jsx'
import { BrowserRouter } from 'react-router-dom';
//import Home from './pages/desktop/home.jsx'
import './index.css'
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
