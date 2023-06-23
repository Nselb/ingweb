import React from 'react';
import ReactDOM from 'react-dom/client';
import Rutas from './routes/Routes';
import '../src/css/normalize.css'
import '../src/css/styles.css'
import { GoogleOAuthProvider } from '@react-oauth/google';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <GoogleOAuthProvider clientId="556447942245-i1r089jcqd2f7gji2u3ocu6pf8de2j0r.apps.googleusercontent.com">
    <React.StrictMode>
      <Rutas />
    </React.StrictMode>
  </GoogleOAuthProvider>
);

