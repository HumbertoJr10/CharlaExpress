import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import { Auth0Provider } from '@auth0/auth0-react';
import { AUTH0_DOMAIN, AUTH0_CLIENT_ID } from '../config';

const domain: string = AUTH0_DOMAIN;
const clientId: string = AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <BrowserRouter>
      <Auth0Provider
        domain={domain}
        clientId={clientId}
        cacheLocation='localstorage'
        redirectUri={window.location.origin}
      >
        <App />
      </Auth0Provider>
      </BrowserRouter>
    </React.StrictMode>
  </Provider>
)
