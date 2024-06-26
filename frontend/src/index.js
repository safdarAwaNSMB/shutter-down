import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import './config/golbal';
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { store } from './redux/configureStore'
import { Provider } from 'react-redux'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <GoogleOAuthProvider clientId="741358745316-do7ti8acvtjeup17o2rav9buivethbfj.apps.googleusercontent.com">
        {' '}
        <App />
      </GoogleOAuthProvider>
    </BrowserRouter>
  </Provider>
  ,
  document.getElementById('root')
);
