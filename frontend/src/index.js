import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { ToastProvider } from './Components/Toast/Toast';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle />
    <ToastProvider>
      <GlobalProvider>
        <App />
      </GlobalProvider>
    </ToastProvider>
  </React.StrictMode>
);
