import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import "./assets/scss/main.scss";
import App from './App';
import reportWebVitals from './reportWebVitals';
import "./i18n/i18n"
import { ThemeProvider } from './contexts/Theme/Theme.context';


ReactDOM.render(
  <React.StrictMode>
    <Suspense fallback={<>Loading...</>}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Suspense>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
