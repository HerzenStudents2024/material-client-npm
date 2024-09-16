// @ts-nocheck

import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Provider } from "react-redux";
import store from "./store/store"; // Подключение вашего Redux store

// import i18n (needs to be bundled ;))
import './i18n.ts';
import App from './App.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)