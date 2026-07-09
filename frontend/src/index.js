import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import { GlobalStyle } from './styles/GlobalStyle';
import { GlobalProvider } from './context/globalContext';
import { ToastProvider } from './Components/Toast/Toast';
import { ThemeContextProvider } from './context/themeContext';
import { AuthProvider } from './context/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeContextProvider>
      <GlobalStyle />
      <ToastProvider>
        <AuthProvider>
          <GlobalProvider>
            <App />
          </GlobalProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeContextProvider>
  </React.StrictMode>
);
