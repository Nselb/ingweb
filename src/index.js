import React from 'react';
import ReactDOM from 'react-dom/client';
import Rutas from './routes/Routes';
import '../src/css/normalize.css'
import '../src/css/styles.css'


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Rutas />
  </React.StrictMode>
);

